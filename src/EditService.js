import React, { Component } from "react";
import logo from "./logo.svg";
import servicess from "./services.json";
const Services = servicess["Services"];
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
    Cameras: [],
    mouseState: false,
    editedSlot: [],
  };
  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  toggleAI = (camera_item, camera_index, api_key, api_index) => {
    console.log(this.state);
    console.log("toggleAI()");
    console.log(camera_item, camera_index, api_key, api_index);
    let _service_name = this.props.match.params.service;
    let _apiData = { ...this.state.apiData };
    // let ucArr = _apiData[api_key].local[camera_item].Usecases;
    let aiArr = [..._apiData[api_key].local[camera_item].AI];
    let dArr = [..._apiData[api_key].local[camera_item].Dependent];
    console.log(aiArr);
    this.parentLoop(Services, (ser_ele) => {
      if (ser_ele.Service_id === _service_name) {
        // console.log(ser_ele);.
        this.parentLoop(ser_ele.Parent_container_id.AI, (ai_ele) => {
          if (aiArr.includes(ai_ele)) {
            let aiIndex = aiArr.indexOf(ai_ele);
            console.log(aiIndex);
            aiArr.splice(aiIndex, 1);
          }
        });
        if (ser_ele.Category === "Analytics") {
          console.log("Analytics");
          this.parentLoop(ser_ele.Parent_container_id.Usecase, (ai_ele) => {
            if (dArr.includes(ai_ele)) {
              let dIndex = dArr.indexOf(ai_ele);
              console.log(dIndex);
              dArr.splice(dIndex, 1);
              console.log(dArr);
            }
          });
        }
      }
    });
    _apiData[api_key].local[camera_item].AI = [...aiArr];
    _apiData[api_key].local[camera_item].Dependent = [...dArr];

    this.setState({ apiData: _apiData }, () => console.log(this.state));
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
    let ucArr = _apiData[api_key].local[camera_item].Usecases;

    if (ucArr.includes(_service_name)) {
      // unchecked
      let indexx = ucArr.indexOf(_service_name);
      ucArr.splice(indexx, 1);
      _apiData[api_key].local[camera_item].Usecases = [...ucArr];
    } else {
      console.log("ELSE");
    }

    this.setState({ apiData: _apiData }, () =>
      this.toggleAI(camera_item, camera_index, api_key, api_index)
    );
    // let _editedSlot = [...this.state.editedSlot];
    // let _time = [...this.state.time];
    // let _time_slot = _time[time_index].Cameras;
    // if (_time_slot.includes(camera_item)) {
    //   console.log("FOUND");
    //   _time_slot = _time_slot.filter((item) => item != camera_item);
    //   _time[time_index].Cameras = _time_slot;
    //   //   let obj = {
    //   //     slot: time_item.slot,
    //   //     Cameras: [],
    //   //   };
    //   //   obj.Cameras.push(camera_item);
    //   //   console.log(obj);
    //   //   _editedSlot.push(obj);
    // } else {
    //   //   _time[time_index].Cameras.push(camera_item);
    // }
    // console.log(_editedSlot);
    // if (_editedSlot.length) {
    //   this.parentLoop(_editedSlot, (slot) => {
    //     console.log(time_item.slot);
    //     console.log(slot.slot + "===" + time_item.slot);
    //     if (slot.slot === time_item.slot) {
    //       if (!slot.Cameras.includes(camera_item)) {
    //         slot.Cameras.push(camera_item);
    //       }
    //       // console.log("IF");
    //       //   _editedSlot.push(obj);
    //     } else {
    //       let obj = {
    //         slot: time_item.slot,
    //         Cameras: [],
    //       };
    //       obj.Cameras.push(camera_item);
    //       _editedSlot.push(obj);
    //       console.log("ELSE");
    //     }
    //   });
    // } else {
    //   let obj = {
    //     slot: time_item.slot,
    //     Cameras: [],
    //   };
    //   obj.Cameras.push(camera_item);
    //   _editedSlot.push(obj);
    //   console.log("ELSE");
    // }
    // this.setState(
    //   { time: _time, mouseState: true, editedSlot: _editedSlot },
    //   () => console.log(this.state)
    // );
  };
  onLoad = () => {
    console.log("onLoad");
    let _time = [...this.state.time];
    let _apiData = { ...this.state.apiData };
    let _service_name = this.props.match.params.service;
    let Cameras = [];
    for (let [key, value] of Object.entries(this.state.apiData)) {
      // console.log(key, value);
      Cameras.push(...value.global.Cameras);

      this.parentLoop(value.global.Cameras, (cam_ele) => {
        // console.log(value.local[cam_ele].AI);
        value.local[cam_ele].AI.length = 0;
        this.parentLoop(Services, (ser_ele) => {
          this.parentLoop(value.local[cam_ele].Usecases, (uc_ele) => {
            if (ser_ele.Service_id === uc_ele) {
              // console.log(ser_ele);
              // value.local[cam_ele].AI.push(...ser_ele.Parent_container_id.AI);
              Array.prototype.push.apply(
                value.local[cam_ele].AI,
                ser_ele.Parent_container_id.AI
              );
            }
          });
        });
      });

      // this.parentLoop(_time, (time_ele) => {
      //   if (time_ele.slot === key) {
      //     if (Object.keys(value.local).length) {
      //       this.parentLoop(value.global.Cameras, (cam_ele) => {
      //         console.log(value.local[cam_ele]);
      //         // value.local[cam_ele].AI.length = 0;
      //         _time
      //       });
      //     }
      //     // time_ele.local = { ...value.local };
      //     // time_ele.cameras = [...value.global.Cameras];
      //   }
      // });
    }
    Cameras = [...new Set(Cameras)];
    console.log(_apiData);
    this.setState({ Cameras, time: _time });
  };
  componentDidMount() {
    this.onLoad();
  }

  renderClassName = (camera_item, camera_index, api_key, api_index) => {
    let _service_name = this.props.match.params.service;
    let _apiData = { ...this.state.apiData };
    if (_apiData[api_key].local[camera_item]) {
      if (
        _apiData[api_key].local[camera_item].Usecases.includes(_service_name)
      ) {
        return "child active";
      } else {
        return "child";
      }
    }

    return "child";
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
                      // style={{
                      //   backgroundColor: item.disabledService.includes(
                      //     service_item.Service_id
                      //   )
                      //     ? "gray"
                      //     : "",
                      // }}
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
            let staticTime = [...this.state.StaticTime];
            console.log(staticTime);
            let arr = [];
            this.parentLoop(staticTime, (static_time_ele) => {
              this.parentLoop(this.state.time, (time_ele) => {
                if (static_time_ele.slot === time_ele.slot) {
                  console.log(
                    static_time_ele.Cameras.length +
                      "!==" +
                      time_ele.Cameras.length
                  );
                  if (
                    static_time_ele.Cameras.length !== time_ele.Cameras.length
                  ) {
                    arr.push(time_ele);
                  }
                }
              });
            });
            console.log(arr);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}
