import React from 'react';
import PropTypes from 'prop-types';

class MetroStation extends React.Component {
  render() {
    const { cx, cy, r } = this.props;
    const style = {
      stroke: this.props.lineColors[0],
      strokeWidth: this.props.strokeWidth,
      fill: this.props.fill
    };
    if (this.props.lineColors.length === 1) {
      return (<circle style={style}
        cx={cx} cy={cy} r={r}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}></circle>);
    }

    if (this.props.lineColors.length === 2) {
      // Currently, we only support stations intersected by 2 lines.
      style.strokeOpacity = 0;
      style.fillOpacity = 0;
      const pathStyle = { strokeWidth: this.props.strokeWidth, fill: this.props.fill };
      const d1 = `M ${cx - r},${cy} a ${r},${r} 0 1, 0 ${r * 2}, 0`;
      const d2 = `M ${cx - r},${cy} a ${r},${r} 0 1, 1 ${r * 2}, 0`;
      return (
        <g>
          <path d={d1} style={pathStyle} stroke={this.props.lineColors[0]}></path>
          <path d={d2} style={pathStyle} stroke={this.props.lineColors[1]}></path>
          <circle style={style}
            cx={cx} cy={cy} r={r}
            onMouseOver={this.props.onMouseOver}
            onMouseLeave={this.props.onMouseLeave}>
          </circle>
        </g>
      );
    }

    return ('');
  }
}

MetroStation.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  r: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  lineColors: PropTypes.array,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default MetroStation;
