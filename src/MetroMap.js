import React from 'react';
import PropTypes from 'prop-types';
import MetroStation from './MetroStation';
import MetroData from './data.json';

class MetroMap extends React.Component {
  constructor(props) {
    super(props);
    this.lineColorMap = {
      BR: 'brown', R: 'red', RA: 'pink', G: 'green', GA: '#99E64D', O: 'orange', BL: 'blue'
    };
    this.radius = 10;
    this.aspectRatio = 8 / 9;
    this.metroData = MetroData;
    this.updateScale();
  }

  updateScale() {
    const scale = this.props.width / this.aspectRatio < this.props.height ?
      this.props.width / 800 :
      this.props.height / 900;

    if (this.scale === scale) return;
    this.scale = scale;
    this.scaledStations = this.metroData.stations.map((station, i) => ({
      id: i,
      name: { en: station.name.en, zh: station.name.zh },
      center: { x: station.center.x * this.scale, y: station.center.y * this.scale },
      lines: station.lines
    }));
  }

  render() {
    this.updateScale();
    const svgStyle = Object.assign({
      width: this.props.width,
      height: this.props.height,
      background: this.props.bgColor
    }, this.props.style);

    // Stations Rendering
    const stations = this.metroData.stations.map((station, i) => (
      <MetroStation key={i} cx={station.center.x * this.scale} cy={station.center.y * this.scale}
      r={this.radius * this.scale}
      strokeWidth={3 * this.scale}
      fill={this.props.bgColor}
      lineColors={station.lines.map(line => this.lineColorMap[line])}
      onMouseEnterStation={() => this.props.onMouseEnterStation(this.scaledStations[i], this.scale)}
      onMouseLeaveStation={() => this.props.onMouseLeaveStation(this.scaledStations[i], this.scale)}
      onClickStation={e => this.props.onClickStation(this.scaledStations[i], this.scale, e)} />));

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
    if (this.props.showStationName) {
      stationNames = this.metroData.stations.map((station, i) => (
        <text key={i} x={station.name.pos.x * this.scale} y={station.name.pos.y * this.scale}
          style={this.props.textStyle}
          dominantBaseline='middle' textAnchor={station.name.pos.anchor}>{station.name.zh}</text>));
    }

    // Customized Data Rendering
    let userData;
    if (this.props.showUserData) {
      if (typeof this.props.renderUserData === 'function') {
        userData = (
          <g>
            {this.scaledStations.map(station => this.props.renderUserData(station, this.scale))}
          </g>);
      } else if (Array.isArray(this.props.renderUserData)) {
        userData = this.props.renderUserData.map((fn, i) => (
          <g key={i}>{this.scaledStations.map(station => fn(station, this.scale))}</g>
        ));
      }
    }
    return (
        <svg style={svgStyle}>
          <g fill={this.props.bgColor} strokeWidth={4 * this.scale}>{connections}</g>
          <g>{stations}</g>
          {userData}
          <g fontSize={8 * this.scale}>{stationNames}</g>
        </svg>
    );
  }
}

MetroMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  bgColor: PropTypes.string,
  textStyle: PropTypes.object,
  showStationName: PropTypes.bool,
  showUserData: PropTypes.bool,
  onMouseEnterStation: PropTypes.func,
  onMouseLeaveStation: PropTypes.func,
  onClickStation: PropTypes.func,
  renderUserData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ])
};

MetroMap.defaultProps = {
  width: 800,
  height: 900,
  style: { },
  bgColor: 'white',
  textStyle: {
    fill: 'black'
  },
  showStationName: true,
  showUserData: true,
  onMouseEnterStation: () => {},
  onMouseLeaveStation: () => {},
  onClickStation: () => {},
  renderUserData: () => ''
};

export default MetroMap;
