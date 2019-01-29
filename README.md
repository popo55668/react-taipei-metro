# react-taipei-metro
Extensible React Component for SVG Taipei Metro Map.

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

  // Customized your mouse events.
  onMouseEnterStation(station, scale) {
    console.log('Enter station ' + station.name.en);
  }
  
  onMouseLeaveStation(station, scale) {
    console.log('Leave station ' + station.name.en);
  }
  
  onClickStation(station, scale, e) {
    console.log('Station ' + station.name.en + ' clicked.');
  }
  
  // You can also render customized svg elements for each station.
  renderUserData(station, scale) {
    return (<text key={station.id} x={station.center.x} y={station.center.y}
        fontSize={10 * scale} fill={this.textColor}
        dominantBaseline='middle' textAnchor='middle'>{station.name.en.length}</text>);
  }

  // See Props for more details.
  render() {
    return (<MetroMap
      width={800} height={900} // The compoent maintains fixed aspect ratio of 8 / 9.
      showStationName={true} 
      onMouseEnterStation={(station, scale) => this.onMouseEnterStation(station, scale)}
      onMouseLeaveStation={(station, scale) => this.onMouseLeaveStation(station, scale)}
      onClickStation={(station, scale, e) => this.onClickStation(station, scale, e)}
      renderUserData={(station, scale) => this.renderUserData(station, scale)} />);
  }
}

ReactDOM.render(
  <Window />,
  document.getElementById('root')
);
```

# Props
| Name                | Description                                             | Type                                                                   | Default           |
|---------------------|---------------------------------------------------------|------------------------------------------------------------------------|-------------------|
| width               | Width of component(px)                                  | number                                                                 | 800               |
| height              | Height of component(px)                                 | number                                                                 | 900               |
| style               | Style of component                                      | object                                                                 | { }               |
| bgColor             | Background color of component                           | string                                                                 | white             |
| textStyle           | Style of station name text                              | object                                                                 | { fill: 'black' } |
| showStationName     | Whether to show station name                            | bool                                                                   | true              |
| showUserData        | Whether to show user data                               | bool                                                                   | true              |
| onMouseEnterStation | Event listener when mouse enters a station              | func: (station, scale) => { }                                          | -                 |
| onMouseLeaveStation | Event listener when mouse leaves a station              | func: (station, scale) => { }                                          | -                 |
| onClickStation      | Event listener when mouse clicks on a station           | func: (station, scale, e) => { }                                       | -                 |
| renderUseData       | Function(s) for rendering user content for each station | func: (station, scale) => JSX or  array<func: (station, scale) => JSX> | -                 |

### Function arguments
- station
```js
{
  id: 5,
  name: { en: 'Yuanshan', zh: '圓山' },
  center: { x: 365, y: 373 },
  lines: ['R']
}
```
- scale: ``` min(props.width / 800, props.height / 900) ```

# Build
``` js
npm run build
```
