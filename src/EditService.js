import React, { Component } from "react";
import logo from "./logo.svg";
export default class EditService extends Component {
  state = {
    time: [
      {
        slot: "0-2",
        Cameras: [],
      },
      {
        slot: "2-4",
        Cameras: [],
      },
      {
        slot: "4-6",
        Cameras: [],
      },
      {
        slot: "6-8",
        Cameras: [],
      },
      {
        slot: "8-10",
        Cameras: [],
      },
      {
        slot: "10-12",
        Cameras: [],
      },
      {
        slot: "12-14",
        Cameras: [],
      },
      {
        slot: "14-16",
        Cameras: [],
      },
      {
        slot: "16-18",
        Cameras: [],
      },
      {
        slot: "18-20",
        Cameras: [],
      },
      {
        slot: "20-22",
        Cameras: [],
      },
      {
        slot: "22-24",
        Cameras: [],
      },
    ],
    StaticTime: [],
    api: {
      "0-2": ["Camera1", "Camera2"],
      "2-4": ["Camera1", "Camera2"],
      "4-6": ["Camera1", "Camera2"],
      "6-8": ["Camera1", "Camera2"],
      "8-10": ["Camera1", "Camera2"],
      "10-12": ["Camera1", "Camera2"],
      "12-14": ["Camera1", "Camera2"],
      "14-16": [],
      "16-18": [],
      "18-20": ["Camera1"],
      "20-22": ["Camera1"],
      "22-24": ["Camera1", "Camera2"],
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
  cameraMouseDown = (time_item, time_index, camera_item, camera_index) => {
    let _editedSlot = [...this.state.editedSlot];
    let _time = [...this.state.time];
    let _time_slot = _time[time_index].Cameras;
    if (_time_slot.includes(camera_item)) {
      console.log("FOUND");
      _time_slot = _time_slot.filter((item) => item != camera_item);
      _time[time_index].Cameras = _time_slot;

      //   let obj = {
      //     slot: time_item.slot,
      //     Cameras: [],
      //   };
      //   obj.Cameras.push(camera_item);
      //   console.log(obj);
      //   _editedSlot.push(obj);
    } else {
      //   _time[time_index].Cameras.push(camera_item);
    }
    console.log(_editedSlot);
    if (_editedSlot.length) {
      this.parentLoop(_editedSlot, (slot) => {
        console.log(time_item.slot);
        console.log(slot.slot + "===" + time_item.slot);
        if (slot.slot === time_item.slot) {
          if (!slot.Cameras.includes(camera_item)) {
            slot.Cameras.push(camera_item);
          }
          // console.log("IF");

          //   _editedSlot.push(obj);
        } else {
          let obj = {
            slot: time_item.slot,
            Cameras: [],
          };
          obj.Cameras.push(camera_item);
          _editedSlot.push(obj);
          console.log("ELSE");
        }
      });
    } else {
      let obj = {
        slot: time_item.slot,
        Cameras: [],
      };
      obj.Cameras.push(camera_item);
      _editedSlot.push(obj);
      console.log("ELSE");
    }

    this.setState(
      { time: _time, mouseState: true, editedSlot: _editedSlot },
      () => console.log(this.state)
    );
  };
  onLoad = () => {
    console.log("onLoad");
    let _time = [...this.state.time];
    let Cameras = [];
    for (let [key, value] of Object.entries(this.state.api)) {
      Cameras.push(...value);
      this.parentLoop(_time, (time_ele) => {
        if (time_ele.slot === key) {
          time_ele.Cameras.push(...value);
        }
      });
    }
    Cameras = [...new Set(Cameras)];
    this.setState({ Cameras, time: _time });
  };
  componentDidMount() {
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
                  {this.state.time.map((item, time_index) => (
                    <div
                      key={item.slot}
                      className={
                        item.Cameras.includes(camera_item)
                          ? "child active"
                          : "child"
                      }
                      // style={{
                      //   backgroundColor: item.disabledService.includes(
                      //     service_item.Service_id
                      //   )
                      //     ? "gray"
                      //     : "",
                      // }}
                      onMouseDown={() => {
                        this.cameraMouseDown(
                          item,
                          time_index,
                          camera_item,
                          camera_index
                        );
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          this.cameraMouseDown(
                            item,
                            time_index,
                            camera_item,
                            camera_index
                          );
                        }
                      }}
                      onMouseUp={() => this.setState({ mouseState: false })}
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
