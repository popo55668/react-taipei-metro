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
}

ReactDOM.render(
  <Window />,
  document.getElementById('root')
);
```

# Props
| Name           | Description                                                 | Type                                                                 | Required | Default           |
|----------------|-------------------------------------------------------------|----------------------------------------------------------------------|----------|-------------------|
| width          | Width of component(px)                                      |                                number                                |     x    | 800               |
| height         | Height of component (px)                                    |                                number                                |     x    | 900               |
| bgColor        | Background color of component                               |                                string                                |     x    | white             |
| textStyle      | Style of svg text element                                   |                                object                                |     x    | { fill: 'black' } |
| showText       | Whether to show station name                                |                                 bool                                 |     x    | true              |
| showOverlay    | Whether to show station overlay                             |                                 bool                                 |     x    | true              |
| showUserData   | Whether to show user data                                   |                                 bool                                 |     x    | true              |
| renderOverlay  | Function for rendering overlay when mouse hovers a station  |                    func: station => Promise or JSX                   |     x    | -                 |
| renderUserData | Function(s) for rendering user  content for each station    | func: (station, i, scale) => JSX or array<func: (station, i, scale)> |     x    | -                 |

### Function arguments
- station
```js
{
  name: { en: 'Yuanshan', zh: '圓山' },
  center: { x: 365, y: 373 },
  lines: ['R']
}
```
- i: station index
- scale: ``` min(props.width / 800, props.height / 900) ```

# Build
``` js
npm run build
```
