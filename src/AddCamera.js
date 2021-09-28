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
    selectedTimeSlot: [],
    data: [
      {
        slot: "0-2",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "2-4",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "4-6",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "6-8",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "8-10",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "10-12",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "12-14",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "14-16",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "16-18",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "18-20",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "20-22",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
      {
        slot: "22-0",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledSlot: [],
      },
    ],
    activeUsecases: [],
  };

  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  mouseDown = (i) => {
    console.log("mouseDown");
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    if (_selectedTimeSlot.includes(i)) {
      var index = _selectedTimeSlot.indexOf(i);
      _selectedTimeSlot.splice(index, 1);
    } else {
      _selectedTimeSlot.push(i);
    }

    this.setState({ selectedTimeSlot: _selectedTimeSlot });
    this.setState({ mouseState: true });
  };
  submitTime = () => {
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    const intersection = _data.filter((element) => {
      if (_selectedTimeSlot.includes(element.slot)) {
        element.isDisabled = false;
      } else element.isDisabled = true;
      return element;
    });
    this.setState({ data: intersection });
  };
  handleCase = (item, service_item) => {
    console.log(item, service_item);
    let _data = [...this.state.data];
    this.parentLoop(_data, (ele) => {
      if (ele.slot === item.slot) {
        if (ele.Usecases.includes(service_item.Service_id)) {
          var index = ele.Usecases.indexOf(service_item.Service_id);
          ele.Usecases.splice(index, 1);
        } else ele.Usecases.push(service_item.Service_id);
      }
    });
    this.setState({ data: _data });
  };
  usecaseMouseDown = (item, index, service_item) => {
    let _activeUsecases = [...this.state.activeUsecases];
    let _data = [...this.state.data];
    //adding selected usecase in state
    if (_activeUsecases.includes(service_item.Service_id)) {
      var index = _activeUsecases.indexOf(service_item.Service_id);
      _activeUsecases.splice(index, 1);
    } else {
      _activeUsecases.push(service_item.Service_id);
    }
    this.setState({ mouseState: true, activeUsecases: _activeUsecases }, () =>
      this.handleCase(item, service_item)
    );
  };
  componentDidMount() {}
  render() {
    return (
      <div className="addCamera">
        {console.log(this.state)}
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
              // onMouseLeave={() => this.setState({ mouseState: false })}
            >
              {this.state.data.map((item) => (
                <div
                  key={item}
                  className={
                    this.state.selectedTimeSlot.includes(item.slot)
                      ? "child active"
                      : "child"
                  }
                  onMouseDown={() => {
                    this.mouseDown(item.slot);
                  }}
                  onMouseEnter={() => {
                    if (this.state.mouseState) {
                      this.mouseDown(item.slot);
                    }
                  }}
                  onMouseUp={() => this.setState({ mouseState: false })}
                ></div>
              ))}
              <button onClick={this.submitTime} className="submit">
                Submit
              </button>
            </div>
          </div>
          <div className="data-container">
            <div className="flex">
              <h1>Usecases</h1>
              <div className="dummy" />
            </div>
            {this.state.Service.map((service_item) => (
              <div className="flex">
                <h4 className="name">{service_item.Service_name}</h4>
                <div
                  className="dummy"
                  // onMouseLeave={() => this.setState({ mouseState: false })}
                >
                  {this.state.data.map((item, index) => (
                    <div
                      key={item.slot}
                      className="child"
                      className={
                        item.Usecases.includes(service_item.Service_id)
                          ? "child active"
                          : "child"
                      }
                      onMouseDown={() => {
                        this.usecaseMouseDown(item, index, service_item);
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          this.usecaseMouseDown(item, index, service_item);
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
