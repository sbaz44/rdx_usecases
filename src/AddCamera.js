import React, { Component } from "react";
import logo from "./logo.svg";
import limits from "./limits.json";
import servicess from "./services.json";
const Services = servicess["Services"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];
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
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "2-4",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "4-6",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "6-8",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "8-10",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "10-12",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "12-14",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "14-16",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "16-18",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "18-20",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "20-22",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
      {
        slot: "22-0",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledSlot: [],
        Dependent: [],
      },
    ],
    activeUsecases: [],
    activeDS: [],
  };

  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  timeslotMouseDown = (i) => {
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    let _activeUsecases = [...this.state.activeUsecases];

    if (_selectedTimeSlot.includes(i)) {
      var index = _selectedTimeSlot.indexOf(i);
      _selectedTimeSlot.splice(index, 1);
      this.parentLoop(_data, (ele) => {
        if (ele.slot === i) {
          ele.isDisabled = true;
          ele.Usecases = [];
        }
      });
    } else {
      _selectedTimeSlot.push(i);
      this.parentLoop(_data, (ele) => {
        if (ele.slot === i) {
          ele.isDisabled = false;
        }
      });
    }

    this.setState({
      selectedTimeSlot: _selectedTimeSlot,
      data: _data,
      mouseState: true,
    });
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
  resetTime = () => {
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    for (let ele of _data) {
      ele.isDisabled = false;
    }
    this.setState({ data: _data });
  };
  handleCase = (item, service_item) => {
    // console.log(item, service_item);
    // let _data = [...this.state.data];
    // this.parentLoop(_data, (ele) => {
    //   if (ele.slot === item.slot) {
    //     if (ele.Usecases.includes(service_item.Service_id)) {
    //       var index = ele.Usecases.indexOf(service_item.Service_id);
    //       ele.Usecases.splice(index, 1);
    //     } else ele.Usecases.push(service_item.Service_id);
    //   }
    // });
    // this.setState({ data: _data });
  };

  isUsecasePresent = (_data) => {};
  usecaseMouseDown = (item, index, service_item) => {
    let _activeUsecases = [...this.state.activeUsecases];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];

    if (usecaseLimit === this.state.activeUsecases.length) {
      console.log("Usecase limit reached");
    }
    // else if (
    //   deepStreamLimit === this.state.activeDS.length &&
    //   _activeDS.includes(service_item.)
    // ) {
    //   console.log("Deepstream limit reached");
    // }
    else {
      console.log("within DS and UC limit");
      if (service_item.Category === "Analytics") {
        console.log("Type is analytics");
      } else {
        console.log("Type is usecase");
        if (_activeUsecases.includes(service_item.Service_id)) {
          console.log("ELSE IF");
          this.parentLoop(_data, (ele) => {
            if (ele.slot === item.slot) {
              if (ele.Usecases.includes(service_item.Service_id)) {
                var index = ele.Usecases.indexOf(service_item.Service_id);
                ele.Usecases.splice(index, 1);
              } else ele.Usecases.push(service_item.Service_id);
            }
          });
          let isUCPresent = 0;
          this.parentLoop(_data, (ele) => {
            if (ele.Usecases.includes(service_item.Service_id)) {
              isUCPresent += 1;
            }
            if (!isUCPresent) {
              var index = _activeUsecases.indexOf(service_item.Service_id);
              _activeUsecases.splice(index, 1);
              isUCPresent = 1;
            }
          });
        } else {
          // _activeDS.push(service_item.Service_id);
          Array.prototype.push.apply(
            _activeDS,
            service_item.Parent_container_id.AI
          );
          _activeDS = [...new Set(_activeDS)];
          _activeUsecases.push(service_item.Service_id);
          this.parentLoop(_data, (ele) => {
            if (ele.slot === item.slot) {
              if (ele.Usecases.includes(service_item.Service_id)) {
                var index = ele.Usecases.indexOf(service_item.Service_id);
                ele.Usecases.splice(index, 1);
              } else ele.Usecases.push(service_item.Service_id);
            }
          });
        }
      }
    }

    this.setState(
      {
        mouseState: true,
        data: _data,
        activeUsecases: _activeUsecases,
        activeDS: _activeDS,
      },
      () => console.log(this.state)
    );
  };
  componentDidMount() {}
  render() {
    return (
      <div className="addCamera">
        {/* {console.log(this.state)} */}
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
              {this.state.data.map((item) => (
                <div
                  key={item}
                  className={
                    this.state.selectedTimeSlot.includes(item.slot)
                      ? "child active"
                      : "child"
                  }
                  onMouseDown={() => {
                    this.timeslotMouseDown(item.slot);
                  }}
                  onMouseEnter={() => {
                    if (this.state.mouseState) {
                      this.timeslotMouseDown(item.slot);
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
                        if (!item.isDisabled)
                          this.usecaseMouseDown(item, index, service_item);
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          if (!item.isDisabled)
                            this.usecaseMouseDown(item, index, service_item);
                        }
                      }}
                      onMouseUp={() => this.setState({ mouseState: false })}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
