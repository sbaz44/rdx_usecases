import React, { Component } from "react";

export default class Slider extends Component {
  state = {
    time: [
      "0-2",
      "2-4",
      "4-6",
      "6-8",
      "8-10",
      "10-12",
      "12-14",
      "14-16",
      "16-18",
      "18-20",
      "20-22",
      "22-0",
    ],
    mouseState: false,
  };
  mouseDown = (i) => {
    let _arr = [...this.state.arr];
    if (_arr.includes(i)) {
      var index = _arr.indexOf(i);
      _arr.splice(index, 1);
    } else {
      _arr.push(i);
    }

    this.setState({ arr: _arr });
    this.setState({ mouseState: true });
  };
  render() {
    return (
      <div
        className="slider"
        onMouseLeave={() => this.setState({ mouseState: false })}
      >
        {this.state.time.map((item) => (
          <div
            key={item}
            className={this.state.arr.includes(item) ? "child active" : "child"}
            onMouseDown={() => {
              this.mouseDown(item);
            }}
            onMouseEnter={() => {
              if (this.state.mouseState) {
                this.mouseDown(item);
              }
            }}
            onMouseUp={() => this.setState({ mouseState: false })}
          ></div>
        ))}
      </div>
    );
  }
}
