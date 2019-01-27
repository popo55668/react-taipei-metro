import React from 'react';
import ReactDOM from 'react-dom';
import MetroContainer from './MetroContainer';

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.overlayText = 'The station is ';
    this.textColor = 'black';
    this.state = { width: window.innerWidth, height: window.innerHeight };
  }

  renderOverlay(station) {
    // Return a Promise if you fetch data with asynchronous methods.
    return new Promise((resolve) => {
      setTimeout(() => resolve((<span>{this.overlayText + station.name.en}</span>)), 500);
    });
    // Or simply return a jsx.
    // return (<span>{userData.name.en}</span>);
  }

  // Customized rendering
  renderCustomizedContent(station, i, scale) {
    return (<text key={i} x={station.center.x} y={station.center.y}
        fontSize={10 * scale} fill={this.textColor}
        alignmentBaseline='middle' textAnchor='middle'>{station.name.en.length}</text>);
  }

  render() {
    return (<MetroContainer
      width={800}
      height={900}
      showStationName={true}
      showOverlay={true}
      renderOverlay={station => this.renderOverlay(station)}
      renderUserData={(station, i, scale) => this.renderCustomizedContent(station, i, scale)} />);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    });
  }
}

ReactDOM.render(
  <Window />,
  document.getElementById('root')
);
