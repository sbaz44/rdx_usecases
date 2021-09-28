import React, { Component } from "react";
import logo from "./logo.svg";
import servicess from "./services.json";
const Services = servicess["Services"];
export default class AddCamera extends Component {
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
    arr: [],
    Service: Services,
  };

  mouseDown = (i) => {
    console.log("mouseDown");
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
  componentDidMount() {
    console.log(this.state.Service);
  }
  render() {
    return (
      <div className="addCamera">
        {console.log(this.state.arr)}
        <div className="header">
          <img src={logo} className="logo" />
        </div>
        <div className="container">
          <div className="timeline-header">
            <p className="h">Time (24 Hrs)</p>
            <div className="timeline">
              <p>0</p>
              <p>2</p>
              <p>4</p>
              <p>6</p>
              <p>8</p>
              <p>10</p>
              <p>12</p>
              <p>14</p>
              <p>16</p>
              <p>18</p>
              <p>20</p>
              <p>22</p>
              <span>24</span>
            </div>
          </div>

          <div className="timeline-header">
            <p className="h">Camera</p>
            <div
              className="timeline"
              onMouseLeave={() => this.setState({ mouseState: false })}
            >
              {this.state.time.map((item) => (
                <div
                  key={item}
                  className={
                    this.state.arr.includes(item) ? "child active" : "child"
                  }
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
          </div>
          <div className="data-container">
            <div className="flex">
              <h1>Usecases</h1>
              <div className="dummy" />
            </div>
            {this.state.Service.map((item) => (
              <div className="flex">
                <h4 className="name">{item.Service_name}</h4>
                <div
                  className="dummy"
                  onMouseLeave={() => this.setState({ mouseState: false })}
                >
                  {this.state.time.map((item) => (
                    <div
                      key={item}
                      className={
                        this.state.arr.includes(item) ? "child active" : "child"
                      }
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
              </div>
            ))}
            {/* <div className="usecase-name">
              <h1>Usecases</h1>
              {this.state.Service.map((item) => (
                <p className="name">{item.Service_name}</p>
              ))}
            </div>
                    <div className="usecase-timeline">
                        
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
