# react-taipei-metro
Extensible React Component for Taipei Metro Map.

See the demo [here](https://popo55668.github.io/react-taipei-metro).
## Install
``` js
npm install react-taipei-metro
```

### Example
``` js
import React from 'react';
import ReactDOM from 'react-dom';
import MetroMap from 'react-taipei-metro';

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight };
  }

  // Customized overlay when mouse hovers over the station.
  renderOverlay(station) {
    // Return a Promise if you fetch data with asynchronous methods.
    return new Promise((resolve) => {
      setTimeout(() => resolve((<span>{station.name.en}</span>)), 500);
    });
    // Or simply return a jsx.
    // return (<span>{userData.foo.bar}</span>);
  }

  // You can also render customized svg elements for each station.
  renderCustomizedContent(station, i, scale) {
    return (<text key={i} x={station.center.x} y={station.center.y}
        fontSize={10 * scale} fill={this.textColor}
        alignmentBaseline='middle' textAnchor='middle'>{station.name.en.length}</text>);
  }

  // See Props for more details.
  render() {
    return (<MetroMap
      width={800} height={900}
      showStationName={true} showOverlay={true}
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
```

# Props

# Build
``` js
npm run build
```
