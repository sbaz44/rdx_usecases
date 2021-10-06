import React, { Component } from "react";
import limits from "./limits.json";
import logo from "./logo.svg";
import servicess from "./services.json";
const Services = servicess["Services"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];
export default class UpdateCamera extends Component {
  state = {
    data: [
      {
        slot: "0-2",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "2-4",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "4-6",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "6-8",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "8-10",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "10-12",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "12-14",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "14-16",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "16-18",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "18-20",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "20-22",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "22-24",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
    ],
    apiData: {
      "0-2": {
        global: {
          Cameras: ["1", "2"],
          Usecases: ["LOITV1"],
          Dependent: [],
          AI: ["person"],
        },
        local: {
          2: {
            Usecases: ["LOITV1"],
            Dependent: [],
            AI: ["person"],
          },
          1: {
            Usecases: ["LOITV1"],
            Dependent: [],
            AI: ["person"],
          },
        },
      },
      "2-4": {
        global: {
          Cameras: ["1"],
          Usecases: ["LOITV1", "TRESV1"],
          Dependent: [],
          AI: ["person"],
        },
        local: {
          1: {
            Usecases: ["LOITV1", "TRESV1"],
            Dependent: [],
            AI: ["person"],
          },
        },
      },
      "4-6": {
        global: {
          Cameras: ["1", "2"],
          Usecases: ["TRESV1", "LOITV1ANA", "LOITV1"],
          Dependent: ["LOITV1"],
          AI: ["person"],
        },
        local: {
          2: {
            Usecases: ["LOITV1"],
            Dependent: [],
            AI: ["person"],
          },
          1: {
            Usecases: ["LOITV1ANA", "TRESV1"],
            Dependent: ["LOITV1"],
            AI: ["person"],
          },
        },
      },
      "6-8": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "8-10": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "10-12": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "12-14": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "14-16": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "16-18": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "18-20": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "20-22": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      "22-24": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
    },
    mouseState: false,
    isCamerPresent: false,
    Service: Services,
    selectedTimeSlot: [],
  };

  onLoad = () => {
    let _data = [...this.state.data];
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let keys = Object.keys(this.state.apiData);
    let cameraLength = 0;
    let idee = this.props.match.params.idee;
    for (let i = 0; i < keys.length; i++) {
      if (this.state.apiData[keys[i]].global.Cameras.length) {
        cameraLength += 1;
        // console.log(this.state.apiData[keys[i]].global.Cameras);
        if (this.state.apiData[keys[i]].global.Cameras.includes(idee)) {
          _selectedTimeSlot.push(keys[i]);
          console.log(this.state.apiData[keys[i]].local[idee]);
          Array.prototype.push.apply(
            _data[i].Usecases,
            this.state.apiData[keys[i]].local[idee].Usecases
          );

          Array.prototype.push.apply(
            _data[i].Dependent,
            this.state.apiData[keys[i]].local[idee].Dependent
          );
          Array.prototype.push.apply(
            _data[i].AI,
            this.state.apiData[keys[i]].local[idee].AI
          );

          Array.prototype.push.apply(
            _data[i].staticUC,
            this.state.apiData[keys[i]].global.Usecases
          );
          Array.prototype.push.apply(
            _data[i].staticAI,
            this.state.apiData[keys[i]].global.AI
          );
          Array.prototype.push.apply(
            _data[i].staticDependent,
            this.state.apiData[keys[i]].global.Dependent
          );
        }
      }
    }
    // console.log(_selectedTimeSlot);
    console.log(_data);
    this.setState({ selectedTimeSlot: _selectedTimeSlot, data: _data });
  };
  componentDidMount() {
    console.log(this.props.match.params.idee);
    this.onLoad();
  }
  render() {
    return (
      <div className="addCamera">
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
                  key={item.slot + "1020"}
                  className={
                    this.state.selectedTimeSlot.includes(item.slot)
                      ? "child active"
                      : "child"
                  }
                  onMouseDown={() => {
                    // this.timeslotMouseDown(item.slot);
                  }}
                  onMouseEnter={() => {
                    if (this.state.mouseState) {
                      //   this.timeslotMouseDown(item.slot);
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
            {this.state.Service.map((service_item, service_index) => (
              <div className="flex" key={service_item.Service_id}>
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
                      key={item.slot + "2"}
                      className={
                        item.Usecases.includes(service_item.Service_id)
                          ? "child active"
                          : "child"
                      }
                      style={{
                        backgroundColor: item.disabledService.includes(
                          service_item.Service_id
                        )
                          ? "gray"
                          : "",
                      }}
                      onMouseDown={() => {
                        if (
                          !item.disabledService.includes(
                            service_item.Service_id
                          )
                        ) {
                          if (this.state.isCamerPresent) {
                            this.usecaseMouseDown2(
                              item,
                              service_index,
                              service_item,
                              index
                            );
                          } else {
                            this.usecaseMouseDown(
                              item,
                              service_index,
                              service_item,
                              index
                            );
                          }
                        }
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          if (
                            !item.disabledService.includes(
                              service_item.Service_id
                            )
                          ) {
                            if (this.state.isCamerPresent) {
                              this.usecaseMouseDown2(
                                item,
                                service_index,
                                service_item,
                                index
                              );
                            } else {
                              this.usecaseMouseDown(
                                item,
                                service_index,
                                service_item,
                                index
                              );
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
