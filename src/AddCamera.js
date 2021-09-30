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
    selectedTimeSlot: ["0-2", "2-4", "4-6", "6-8"],
    data: [
      {
        slot: "0-2",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "2-4",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "4-6",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "6-8",
        Usecases: [],
        AI: [],
        isDisabled: false,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "8-10",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "10-12",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "12-14",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "14-16",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "16-18",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "18-20",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "20-22",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "22-0",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
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

  isDSPresentInState = (data_item, service_item) => {
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    console.log("isDSPresentInState");

    if (service_item.Parent_container_id.AI.length === 1) {
      console.log("selectedDS length is  1: " + service_item.Service_id);
      if (_activeDS.includes(service_item.Parent_container_id.AI[0])) {
        if (_activeDS.length === deepStreamLimit) {
          return true;
        } else return false;
      }
    } else {
      console.log(
        "selectedDS length is greater than 1: " + service_item.Service_id
      );

      if (_activeDS.length === 0) {
        return false;
      }

      if (service_item.Parent_container_id.AI.length === deepStreamLimit) {
        console.log("selected DS length === deepStreamLimit");
        return true;
      } else {
        let result = [];
        this.parentLoop(_activeDS, (ele) => {
          this.parentLoop(service_item.Parent_container_id.AI, (ele2) => {
            if (ele === ele2) result.push(true);
            else result.push(false);
          });
        });
        if (result.includes(true)) {
          const intersection = _activeDS.filter(
            (value) => !service_item.Parent_container_id.AI.includes(value)
          );
          console.log(intersection);
          let add = _activeDS.length + intersection.length;
          console.log(deepStreamLimit + "<" + add);
          if (deepStreamLimit < add) return true;
          else return false;
        }
      }
    }
    // this.parentLoop(_Service, (ele) => {
    //   let result = [];
    //   if (ele.Parent_container_id.AI.length <= deepStreamLimit) {
    //     this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
    //       this.parentLoop(_activeDS, (ele3) => {
    //         if (ele3 === ele2) result.push(true);
    //         else result.push(false);
    //       });
    //     });
    //     console.log(result);
    //   }
    // });
  };

  _DSLimitReached = (data_item, service_item) => {
    console.log("DISABLING USING DS");
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];

    this.parentLoop(_Service, (ele) => {
      let result = [];
      if (ele.Parent_container_id.AI.length <= deepStreamLimit) {
        this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
          this.parentLoop(_activeDS, (ele3) => {
            if (ele3 === ele2) result.push(true);
            else result.push(false);
          });
        });

        if (!result.includes(true)) {
          this.parentLoop(_data, (data_ele) => {
            data_ele.disabledService.push(ele.Service_id);
          });
        } else {
          const intersection = ele.Parent_container_id.AI.filter(
            (value) => !_activeDS.includes(value)
          );
          // let arr = [..._activeDS];
          // console.log(arr);
          // console.log(intersection);
          // Array.prototype.push.apply(arr, intersection);
          // arr = [...new Set(arr)];
          // console.log(arr);
          let add = _activeDS.length + intersection.length;
          if (deepStreamLimit < add) {
            console.log("disabled DS: " + ele.Service_id);
            this.parentLoop(_data, (data_ele) => {
              data_ele.disabledService.push(ele.Service_id);
            });
          }
        }
      }
    });
  };

  _UCLimitReached = () => {
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _activeUsecases = [...this.state.activeUsecases];
    let _data = [...this.state.data];
    this.parentLoop(_Service, (ele) => {
      console.log(_activeUsecases.includes(ele.Service_id));
      if (!_activeUsecases.includes(ele.Service_id)) {
        this.parentLoop(_data, (data_ele) => {
          data_ele.disabledService.push(ele.Service_id);
        });
      }
    });
  };

  _unchecked = () => {
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _activeUsecases = [...this.state.activeUsecases];
    if (!_activeDS.length) {
      console.log("DEFAULT STATE");
      this.parentLoop(_Service, (item) => {
        if (item.Parent_container_id.AI.length > deepStreamLimit) {
          this.parentLoop(_data, (ele) => {
            ele.disabledService.push(item.Service_id);
          });
        } else {
          this.parentLoop(_data, (ele) => {
            ele.disabledService = [];
          });
        }
      });
    } else {
      console.log("_unchecked ELSE");

      let arr = [];

      this.parentLoop(_activeUsecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            arr = [...new Set(arr)];
          }
        });
      });
      console.log(arr);
      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = _Service.filter(
          (item) => item.Parent_container_id.AI.length <= deepStreamLimit
        );
        console.log(filterData);
      } else {
        console.log("ARR === 1");
        this.parentLoop(_Service, (element) => {
          if (element.Parent_container_id.AI.length <= deepStreamLimit) {
            if (element.Parent_container_id.AI.length === 1) {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id.AI, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });

              console.log(result);
              if (result.includes(true)) {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                console.log(intersection);
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  console.log(element.Service_id);
                } else {
                  console.log(element.Service_id);
                }
              } else {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                console.log(intersection);
                let add = _activeDS.length + intersection.length;
                console.log(add);
                if (deepStreamLimit < add) {
                  console.log(element.Service_id);
                } else {
                  console.log(element.Service_id);
                }
              }
              // if (result.includes(true)) {
              //   this.resultIntersection(element, "schedule", arr, (obj) => {
              //     element = { ...obj };
              //   });
              // } else {
              //   this.resultIntersection(element, "schedule", arr, (obj) => {
              //     element = { ...obj };
              //   });
              // }
            } else {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id.AI, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });

              console.log(result);
              if (result.includes(true)) {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                console.log(intersection);
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  console.log(element.Service_id);
                } else {
                  console.log(element.Service_id);
                }
              } else {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                console.log(intersection);
                let add = _activeDS.length + intersection.length;
                console.log(add);
                if (deepStreamLimit < add) {
                  console.log(element.Service_id);
                } else {
                  console.log(element.Service_id);
                }
              }
            }
          }
        });
      }
    }
  };
  DisableServices = (data_item, service_item) => {
    console.log(this.state);

    if (usecaseLimit === this.state.activeUsecases.length) {
      console.log("Usecase limit reached");
      this._UCLimitReached();
    } else if (this.isDSPresentInState(data_item, service_item)) {
      console.log("DS limit reached");
      this._DSLimitReached(data_item, service_item);
    } else {
      console.log("DisableServices ELSE");
      this._unchecked();
    }

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
    console.log(service_item.Service_id);
    let _activeUsecases = [...this.state.activeUsecases];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];

    // if (usecaseLimit === this.state.activeUsecases.length) {
    //   console.log("Usecase limit reached");
    // }
    // // else if (
    // //   deepStreamLimit === this.state.activeDS.length &&
    // //   _activeDS.includes(service_item.)
    // // ) {
    // //   console.log("Deepstream limit reached");
    // // }
    // else {
    // console.log("within DS and UC limit");
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
          //removing UC condition
          if (ele.Usecases.includes(service_item.Service_id)) {
            isUCPresent += 1;
          }
          // console.log(isUCPresent);
          // if (!isUCPresent) {
          //   var index = _activeUsecases.indexOf(service_item.Service_id);
          //   _activeUsecases.splice(index, 1);
          //   isUCPresent = 1;
          // }
        });
        //removing UC
        if (isUCPresent === 0) {
          console.log("removing: " + service_item.Service_id);
          var index = _activeUsecases.indexOf(service_item.Service_id);
          _activeUsecases.splice(index, 1);
          isUCPresent = 1;
        }

        //removing DS
        let arr = [];
        // _activeDS = [...arr];

        this.parentLoop(_activeUsecases, (ele) => {
          this.parentLoop(_Service, (ele2) => {
            if (ele2.Service_id === ele) {
              Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
              arr = [...new Set(arr)];
            }
          });
        });
        _activeDS = [...arr];
      } else {
        console.log("ELSE");
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

    this.setState(
      {
        mouseState: true,
        data: _data,
        activeUsecases: _activeUsecases,
        activeDS: _activeDS,
      },
      () => this.DisableServices(item, service_item)
    );
  };
  onLoad = () => {
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    this.parentLoop(_Service, (item) => {
      if (item.Parent_container_id.AI.length > deepStreamLimit) {
        this.parentLoop(_data, (ele) => {
          ele.disabledService.push(item.Service_id);
        });
      }
    });
    this.setState({ data: _data }, () => console.log(this.state));
  };
  componentDidMount() {
    this.onLoad();
  }
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
                <pre>
                  {JSON.stringify(service_item.Parent_container_id.AI, null, 4)}
                </pre>
                <div
                  className="dummy"
                  onMouseLeave={() => this.setState({ mouseState: false })}
                  onMouseEnter={() => this.setState({ mouseState: false })}
                >
                  {this.state.data.map((item, index) => (
                    <div
                      key={item.slot}
                      className={
                        item.Usecases.includes(service_item.Service_id)
                          ? "child active"
                          : "child"
                      }
                      style={{
                        backgroundColor: item.isDisabled
                          ? "gray"
                          : item.disabledService.includes(
                              service_item.Service_id
                            )
                          ? "gray"
                          : "",
                      }}
                      onMouseDown={() => {
                        if (!item.isDisabled) {
                          if (
                            !item.disabledService.includes(
                              service_item.Service_id
                            )
                          ) {
                            this.usecaseMouseDown(item, index, service_item);
                          }
                        }
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          if (!item.isDisabled) {
                            if (
                              !item.disabledService.includes(
                                service_item.Service_id
                              )
                            ) {
                              this.usecaseMouseDown(item, index, service_item);
                            }
                          }
                        }
                      }}
                      onMouseUp={() => this.setState({ mouseState: false })}
                      // onMouseLeave={() => this.setState({ mouseState: false })}
                    />
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
