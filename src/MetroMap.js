import React from 'react';
import PropTypes from 'prop-types';
import MetroStation from './MetroStation';
import MetroData from './data.json';
import './style.css';

class MetroMap extends React.Component {
  constructor(props) {
    super(props);
    this.lineColorMap = {
      BR: 'brown', R: 'red', RA: 'pink', G: 'green', GA: '#99E64D', O: 'orange', BL: 'blue'
    };
    this.radius = 10;
    this.aspectRatio = 8 / 9;
    this.metroData = MetroData;
    this.hoveredId = -1;
    this.state = { overlay: '' };
    this.updateScale();
  }

  updateScale() {
    this.scale = this.props.width / this.aspectRatio < this.props.height ?
      this.props.width / 800 :
      this.props.height / 900;
  }

  createOverlay(id) {
    if (!this.props.showOverlay) return;
    this.hoveredId = id;
    const station = this.metroData.stations[id];
    const scaledStationData = {
      name: { en: station.name.en, zh: station.name.zh },
      center: { x: station.center.x * this.scale, y: station.center.y * this.scale },
      lines: station.lines
    };
    const result = this.props.renderOverlay(scaledStationData);
    const isPromise = typeof result.then === 'function';
    const position = {
      left: this.metroData.stations[id].center.x * this.scale + 10,
      top: this.metroData.stations[id].center.y * this.scale - 10
    };
    if (isPromise) {
      this.setState({ overlay: (<div className='overlay' style={position}><div className='loader'/></div>) });
      result.then((overlayContent) => {
        if (this.hoveredId === id) {
          this.setState({ overlay: (<div className='overlay' style={position}>{overlayContent}</div>) });
        }
      });
    } else {
      this.setState({ overlay: (<div style={position}>{result}</div>) });
    }
  }

  removeOverlay() {
    if (!this.props.showOverlay) return;
    this.hoveredId = -1;
    this.setState({ overlay: '' });
  }

  render() {
    this.updateScale();
    const svgStyle = {
      width: this.props.width,
      height: this.props.height,
      zIndex: -1,
      position: 'absolute',
      background: this.props.bgColor
    };
    // Stations Rendering
    const stations = this.metroData.stations.map((station, i) => (
      <MetroStation key={i} cx={station.center.x * this.scale} cy={station.center.y * this.scale}
        r={this.radius * this.scale}
        strokeWidth={3 * this.scale}
        fill={this.props.bgColor}
        lineColors={station.lines.map(line => this.lineColorMap[line])}
        onMouseOver={() => this.createOverlay(i)} onMouseLeave={() => this.removeOverlay()} />));

    // Connections Rendering
    const connections = this.metroData.connections.map((connection, i) => (
      <path key={i}
        stroke={this.lineColorMap[connection.line]}
        d={connection.path.reduce((acc, cmd) => {
          const coordinates = cmd.coordinates.map(x => x * this.scale).join(',');
          return `${acc} ${cmd.command}${coordinates}`;
        }, '')} />));

    // Station Names Rendering
    let stationNames;
    if (this.props.showText) {
      stationNames = this.metroData.stations.map((station, i) => (
        <text key={i} x={station.name.pos.x * this.scale} y={station.name.pos.y * this.scale}
          style={this.props.textStyle}
          alignmentBaseline='middle' textAnchor={station.name.pos.anchor}>{station.name.zh}</text>));
    }

    // Customized Data Rendering
    let userData;
    if (this.props.showUserData) {
      const scaledStations = this.metroData.stations.map(station => ({
        name: { en: station.name.en, zh: station.name.zh },
        center: { x: station.center.x * this.scale, y: station.center.y * this.scale },
        lines: station.lines
      }));
      if (typeof this.props.renderUserData === 'function') {
        userData = (
          <g>{scaledStations.map((station, i) => (
            this.props.renderUserData(station, i, this.scale)
          ))}</g>
        );
      } else if (Array.isArray(this.props.renderUserData)) {
        userData = this.props.renderUserData.map((fn, i) => (
          <g key={i}>{scaledStations.map((station, j) => fn(station, j, this.scale))}</g>
        ));
      }
    }
    return (
      <div style={{ position: 'relative' }}>
        <svg style={svgStyle}>
          <g fill={this.props.bgColor} strokeWidth={4 * this.scale}>{connections}</g>
          <g>{stations}</g>
          {userData}
          <g fontSize={8 * this.scale}>{stationNames}</g>
        </svg>
        <div>{this.state.overlay}</div>
      </div>
    );
  }
}

MetroMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  bgColor: PropTypes.string,
  textStyle: PropTypes.object,
  showText: PropTypes.bool,
  showOverlay: PropTypes.bool,
  showUserData: PropTypes.bool,
  renderOverlay: PropTypes.func,
  renderUserData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ])
};

MetroMap.defaultProps = {
  width: 800,
  height: 900,
  bgColor: 'white',
  textStyle: {
    fill: 'black'
  },
  showText: true,
  showOverlay: true,
  showUserData: true,
  renderOverlay: () => '',
  renderUserData: () => ''
};

export default MetroMap;
