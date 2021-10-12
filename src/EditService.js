import React, { Component } from "react";
import logo from "./logo.svg";
import servicess from "./services.json";
import limits from "./limits.json";
const Services = servicess["Services"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];
export default class EditService extends Component {
  state = {
    Service: Services,
    time: [
      {
        slot: "0-2",
        local: {},
        cameras: [],
      },
      {
        slot: "2-4",
        cameras: [],
        local: {},
      },
      {
        slot: "4-6",
        cameras: [],
        local: {},
      },
      {
        slot: "6-8",
        cameras: [],
        local: {},
      },
      {
        slot: "8-10",
        cameras: [],
        local: {},
      },
      {
        slot: "10-12",
        cameras: [],
        local: {},
      },
      {
        slot: "12-14",
        cameras: [],
        local: {},
      },
      {
        slot: "14-16",
        cameras: [],
        local: {},
      },
      {
        slot: "16-18",
        cameras: [],
        local: {},
      },
      {
        slot: "18-20",
        cameras: [],
        local: {},
      },
      {
        slot: "20-22",
        cameras: [],
        local: {},
      },
      {
        slot: "22-24",
        cameras: [],
        local: {},
      },
    ],
    StaticTime: [],
    // api: {
    //   "0-2": ["Camera1", "Camera2"],
    //   "2-4": ["Camera1", "Camera2"],
    //   "4-6": ["Camera1", "Camera2"],
    //   "6-8": ["Camera1", "Camera2"],
    //   "8-10": ["Camera1", "Camera2"],
    //   "10-12": ["Camera1", "Camera2"],
    //   "12-14": ["Camera1", "Camera2"],
    //   "14-16": [],
    //   "16-18": [],
    //   "18-20": ["Camera1"],
    //   "20-22": ["Camera1"],
    //   "22-24": ["Camera1", "Camera2"],
    // },
    apiData: {
      "0-2": {
        global: {
          Cameras: ["1", "2"],
          Usecases: ["LOITV1", "TRESV1"],
          Dependent: [],
          AI: ["person"],
        },
        local: {
          2: {
            Usecases: ["TRESV1"],
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
          Usecases: ["LOITV1", "TRESV1", "QUEUEV1"],
          Dependent: [],
          AI: ["person"],
        },
        local: {
          1: {
            Usecases: ["LOITV1", "TRESV1", "QUEUEV1"],
            Dependent: [],
            AI: ["person"],
          },
        },
      },
      "4-6": {
        global: {
          Cameras: ["1", "2"],
          Usecases: ["LOITV1", "TRESV1", "LOITV1ANA"],
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
          Cameras: ["1", "2"],
          Usecases: ["VEHIV1", "LOITV1", "QUEUEV1", "TRESV1"],
          Dependent: [],
          AI: ["vehicle", "person"],
        },
        local: {
          2: {
            Usecases: ["VEHIV1", "LOITV1", "QUEUEV1", "TRESV1"],
            Dependent: [],
            AI: ["vehicle", "person"],
          },
          1: {
            Usecases: ["VEHIV1"],
            Dependent: [],
            AI: ["vehicle"],
          },
        },
      },
      // "6-8": {
      //   global: {
      //     Cameras: ["1", "2"],
      //     Usecases: ["MASKV1", "VEHIV1", "LOITV1"],
      //     Dependent: [],
      //     AI: ["fmgh", "vehicle", "person"],
      //   },
      //   local: {
      //     2: {
      //       Usecases: ["MASKV1", "VEHIV1", "LOITV1"],
      //       Dependent: [],
      //       AI: ["fmgh", "vehicle", "person"],
      //     },
      //     1: {
      //       Usecases: ["MASKV1"],
      //       Dependent: [],
      //       AI: ["fmgh"],
      //     },
      //   },
      // },
      "8-10": {
        global: {
          Cameras: ["1"],
          Usecases: ["DUMMYANAV2"],
          Dependent: ["LOITV1", "VEHIV1"],
          AI: ["person", "vehicle"],
        },
        local: {
          1: {
            Usecases: ["DUMMYANAV2"],
            Dependent: ["LOITV1", "VEHIV1"],
            AI: ["person", "vehicle"],
          },
        },
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
    Cameras: [],
    mouseState: false,
    editedSlot: [],
    selectedAI: [],
    selectedDependent: [],
  };
  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  toggleAI = (camera_item, camera_index, api_key, api_index) => {
    console.log(this.state);
    console.log("toggleAI()");
    // console.log(camera_item, camera_index, api_key, api_index);
    // let _service_name = this.props.match.params.service;
    // let _apiData = { ...this.state.apiData };
    // // let ucArr = _apiData[api_key].local[camera_item].Usecases;
    // let aiArr = [..._apiData[api_key].local[camera_item].AI];
    // let dArr = [..._apiData[api_key].local[camera_item].Dependent];
    // console.log(aiArr);
    // this.parentLoop(Services, (ser_ele) => {
    //   if (ser_ele.Service_id === _service_name) {
    //     // console.log(ser_ele);.
    //     this.parentLoop(ser_ele.Parent_container_id.AI, (ai_ele) => {
    //       if (aiArr.includes(ai_ele)) {
    //         let aiIndex = aiArr.indexOf(ai_ele);
    //         console.log(aiIndex);
    //         aiArr.splice(aiIndex, 1);
    //       }
    //     });
    //     if (ser_ele.Category === "Analytics") {
    //       console.log("Analytics");
    //       this.parentLoop(ser_ele.Parent_container_id.Usecase, (ai_ele) => {
    //         if (dArr.includes(ai_ele)) {
    //           let dIndex = dArr.indexOf(ai_ele);
    //           console.log(dIndex);
    //           dArr.splice(dIndex, 1);
    //           console.log(dArr);
    //         }
    //       });
    //     }
    //   }
    // });
    // _apiData[api_key].local[camera_item].AI = [...aiArr];
    // _apiData[api_key].local[camera_item].Dependent = [...dArr];

    // this.setState({ apiData: _apiData }, () => console.log(this.state));

    //  let AIIndex = aiArr.indexOf(_service_name);
    //  aiArr.splice(AIIndex, 1);
    // if (!ucArr.length) {
    //   console.log("AI IS 0");
    //   _apiData[api_key].local[camera_item].AI.length = 0;
    // } else {
    //   console.log("AI IS Greater than 0");
    //   this.parentLoop(ucArr, (uc_ele) => {
    //     let result = 0;
    //     this.parentLoop(this.state.Service, (ser_ele) => {
    //       if (uc_ele === ser_ele.Service_id) {
    //         if (ser_ele.Parent_container_id.AI.includes(uc_ele)) {
    //           result += 1;
    //         }
    //       }
    //     });
    //     // console.log(result);
    //   });
    // }
  };

  cameraMouseDown = (camera_item, camera_index, api_key, api_index) => {
    let _service_name = this.props.match.params.service;
    let _apiData = { ...this.state.apiData };
    let selectedAI = this.state.selectedAI;
    let globalAI = [..._apiData[api_key].global.AI];

    //to enable/disable slot
    if (globalAI.length > 0) {
      const intersection = selectedAI.filter(
        (element) => !globalAI.includes(element)
      );
      let add = globalAI.length + intersection.length;
      if (deepStreamLimit < add) {
        return;
      }
    } else {
      if (selectedAI.length > deepStreamLimit) {
        return;
      }
    }
    //end
    if (
      _apiData[api_key].local[camera_item]?.Usecases.includes(_service_name)
    ) {
      let ucArr = [..._apiData[api_key].local[camera_item].Usecases];

      // removing UC
      let indexx = ucArr.indexOf(_service_name);
      ucArr.splice(indexx, 1);
      _apiData[api_key].local[camera_item].Usecases = [...ucArr];

      //removing AI
      let aiArr = [..._apiData[api_key].local[camera_item].AI];
      let dArr = [..._apiData[api_key].local[camera_item].Dependent];
      this.parentLoop(Services, (ser_ele) => {
        if (ser_ele.Service_id === _service_name) {
          // console.log(ser_ele);.
          this.parentLoop(ser_ele.Parent_container_id.AI, (ai_ele) => {
            if (aiArr.includes(ai_ele)) {
              let aiIndex = aiArr.indexOf(ai_ele);
              aiArr.splice(aiIndex, 1);
            }
          });
          if (ser_ele.Category === "Analytics") {
            //removing dependent
            console.log("Analytics");
            this.parentLoop(ser_ele.Parent_container_id.Usecase, (ai_ele) => {
              if (dArr.includes(ai_ele)) {
                let dIndex = dArr.indexOf(ai_ele);
                dArr.splice(dIndex, 1);
              }
            });
          }
        }
      });
      _apiData[api_key].local[camera_item].AI = [...aiArr];
      _apiData[api_key].local[camera_item].Dependent = [...dArr];
    } else {
      console.log("ELSE");
      if (_apiData[api_key].local[camera_item]?.Usecases) {
        _apiData[api_key].local[camera_item].Usecases.push(_service_name);
        Array.prototype.push.apply(
          _apiData[api_key].local[camera_item].AI,
          this.state.selectedAI
        );
        Array.prototype.push.apply(
          _apiData[api_key].local[camera_item].Dependent,
          this.state.selectedDependent
        );
      } else {
        let obj = {
          Usecases: [],
          Dependent: [],
          AI: [],
        };
        _apiData[api_key].local[camera_item] = { ...obj };
        _apiData[api_key].local[camera_item].Usecases.push(_service_name);
        Array.prototype.push.apply(
          _apiData[api_key].local[camera_item].AI,
          this.state.selectedAI
        );
        // console.log("object");
      }
    }
    this.setState(
      { apiData: _apiData },
      () => console.log(this.state)
      // this.toggleAI(camera_item, camera_index, api_key, api_index)
    );
  };

  onLoad = () => {
    console.log("onLoad");
    let _apiData = { ...this.state.apiData };
    let _service_name = this.props.match.params.service;
    let Cameras = [];
    for (let [key, value] of Object.entries(this.state.apiData)) {
      Cameras.push(...value.global.Cameras);
      this.parentLoop(value.global.Cameras, (cam_ele) => {
        value.local[cam_ele].AI.length = 0;
        this.parentLoop(Services, (ser_ele) => {
          this.parentLoop(value.local[cam_ele].Usecases, (uc_ele) => {
            if (ser_ele.Service_id === uc_ele) {
              // value.local[cam_ele].AI.push(...ser_ele.Parent_container_id.AI);
              Array.prototype.push.apply(
                value.local[cam_ele].AI,
                ser_ele.Parent_container_id.AI
              );
            }

            if (ser_ele.Service_id === _service_name) {
              this.setState({
                selectedAI: [...ser_ele.Parent_container_id.AI],
                selectedDependent: [...ser_ele.Parent_container_id.Usecase],
              });
            }
          });
        });
      });
    }
    Cameras = [...new Set(Cameras)];

    this.setState({ Cameras, apiData: { ..._apiData } }, this.onLoadDisable);
  };
  componentDidMount() {
    this.onLoad();
  }

  onLoadDisable = () => {
    console.log("onLoadDisable()");
    console.log(this.state);
  };

  renderClassName = (camera_item, camera_index, api_key, api_index) => {
    let _service_name = this.props.match.params.service;
    let _apiData = { ...this.state.apiData };
    if (_apiData[api_key].local[camera_item]) {
      if (_apiData[api_key].local[camera_item].Usecases) {
        if (
          _apiData[api_key].local[camera_item].Usecases.includes(_service_name)
        ) {
          return "child active";
        } else {
          return "child";
        }
      } else {
        console.log("object");
      }
    }

    return "child";
  };

  renderStyle = (camera_item, camera_index, api_key, api_index) => {
    let selectedAI = this.state.selectedAI;
    let _service_name = this.props.match.params.service;

    let _apiData = { ...this.state.apiData };
    let globalAI = [..._apiData[api_key].global.AI];
    if (globalAI.length > 0) {
      const intersection = selectedAI.filter(
        (element) => !globalAI.includes(element)
      );
      let add = globalAI.length + intersection.length;
      if (deepStreamLimit < add) {
        return "gray";
      } else {
        let staticUC = [..._apiData[api_key].global.Usecases];
        Array.prototype.push.apply(
          staticUC,
          _apiData[api_key].global.Dependent
        );
        Array.prototype.push.apply(staticUC, this.state.selectedDependent);

        staticUC.push(_service_name);
        staticUC = [...new Set(staticUC)];

        if (usecaseLimit < staticUC.length) {
          return "gray";
        } else {
          return "";
        }
        // return "";
      }
    } else {
      if (selectedAI.length > deepStreamLimit) {
        return "gray";
      }
      return "";
    }
  };
  render() {
    const { apiData } = this.state;
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
          <div className="data-container">
            <div className="flex">
              <h1>Cameras</h1>
              <div className="dummy" />
            </div>

            {this.state.Cameras.map((camera_item, camera_index) => (
              <div className="flex" key={camera_item}>
                <h4 className="name">{camera_item}</h4>

                <div
                  className="dummy"
                  onMouseLeave={() => this.setState({ mouseState: false })}
                  onMouseEnter={() => this.setState({ mouseState: false })}
                >
                  {Object.keys(apiData).map((api_key, api_index) => (
                    <div
                      key={api_key}
                      className={this.renderClassName(
                        camera_item,
                        camera_index,
                        api_key,
                        api_index
                      )}
                      style={{
                        backgroundColor: this.renderStyle(
                          camera_item,
                          camera_index,
                          api_key,
                          api_index
                        ),
                      }}
                      onMouseDown={() => {
                        this.cameraMouseDown(
                          camera_item,
                          camera_index,
                          api_key,
                          api_index
                        );
                      }}
                      // onMouseEnter={() => {
                      //   if (this.state.mouseState) {
                      //     this.cameraMouseDown(
                      //       item,
                      //       time_index,
                      //       camera_item,
                      //       camera_index
                      //     );
                      //   }
                      // }}
                      // onMouseUp={() => this.setState({ mouseState: false })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            let _apiData = { ...this.state.apiData };
            for (let [key, value] of Object.entries(_apiData)) {
              this.parentLoop(value.global.Cameras, (cam_ele) => {
                console.log(value.local[cam_ele].Usecases);
                if (value.local[cam_ele].Usecases) {
                  if (value.local[cam_ele].Usecases.length > 0) {
                    console.log("FOUND: " + value.local[cam_ele]);
                  } else {
                    console.log(value.local[cam_ele]);
                    console.log(key);
                    _apiData[key].local[cam_ele] = {};
                  }
                }
              });
            }
            console.log(_apiData);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}
