import React, { Component } from "react";
import usecases from "./data/service2.json";
import limits from "./limits.json";
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];

export default class Add2 extends Component {
  state = {
    apiData: {
      detail: {
        DeviceScheduleDetail: {
          ScheduledUC: [
            "LOITV1",
            "TRESSPASSV1",
            "OCCUPANCYANALYSISV1",
            // "QUEUEV1",
            // "MASKHELMETV1",
            "DUMMY2V1",
            "DUMMY1V1",
          ],
          ScheduledDP: ["person", "dp1", "dp2", "fmgh"],
          // ScheduledDP: ["dp1","dp2"],
          // ScheduledDP: ["person", "maskhelmet"],
          UnScheduledUC: ["LOITV1", "TRESSPASSV1"],
          UnScheduledDP: ["person"],
        },
      },
      module_data: [
        {
          Service_id: "string",
          Parent_container_id: ["string"],
        },
      ],
    },
    data: [],
    ScheduledUC: [],
    ScheduledDP: [],
    UnScheduledUC: [],
    UnScheduledDP: [],
  };

  optionLoop = (arr, callback) => {
    for (let element of arr) {
      if (element.type === "Usecase") {
        callback(element);
      }
    }
  };

  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  dsScheduleAvailable = () => {
    let _data = [...this.state.data];
    let _ScheduledUC = [...this.state.ScheduledUC];
    let _ScheduledDP = [...this.state.ScheduledDP];
    if (this.state.ScheduledUC.length >= usecaseLimit) {
      console.log("USE CASE LIMIT REACHED");
      this.parentLoop(_data, (item) => {
        //disable other usecase and DS
        if (!_ScheduledUC.includes(item.Service_id)) {
          item.disableScheduleCheckbox = true;
        }
      });
    } else {
      console.log("USE CASE NOT LIMIT REACHED");
      if (deepStreamLimit === this.state.ScheduledDP.length) {
        console.log("DS LIMIT REACHED V2");
        console.log(
          "ENABLE USECASE WHOSE DS IS SELECTED AND DISABLE OTHER DS USECASE"
        );
        this.parentLoop(_data, (item) => {
          if (item.Parent_container_id.length <= _ScheduledDP.length) {
            let result = [];
            this.parentLoop(_ScheduledDP, (ele) => {
              this.parentLoop(item.Parent_container_id, (ele2) => {
                console.log(ele + " === " + ele2);
                if (ele === ele2) result.push(true);
                else result.push(false);
              });
            });
            if (result.includes(true)) {
              let intersection = item.Parent_container_id.filter(
                (x) => !_ScheduledDP.includes(x)
              );

              console.log("result item");
              console.log(intersection);
              let add = _ScheduledDP.length + intersection.length;
              console.log(add);
              if (deepStreamLimit < add) {
                item.disableScheduleCheckbox = true;
              }
            } else {
              item.disableScheduleCheckbox = true;
            }
            console.log(result);
          } else {
            item.disableScheduleCheckbox = true;
          }
        });
      } else {
        console.log("DS LIMIT NOT REACHED V2");
        this.parentLoop(_data, (item) => {
          if (item.Parent_container_id.length <= deepStreamLimit) {
            let result = [];
            this.parentLoop(item.Parent_container_id, (ele) => {
              this.parentLoop(this.state.ScheduledDP, (ele2) => {
                console.log(ele2 + "===" + ele);
                if (ele2 === ele) result.push(true);
                else result.push(false);
              });
            });
            console.log("result");
            console.log(result);
            if (!result.includes(true)) {
              let intersection = item.Parent_container_id.filter(
                (x) => !_ScheduledDP.includes(x)
              );
              let add = _ScheduledDP.length + intersection.length;

              if (deepStreamLimit < add) {
                item.disableScheduleCheckbox = true;
              }
            } else {
              console.log("True item");
              let intersection = item.Parent_container_id.filter(
                (x) => !_ScheduledDP.includes(x)
              );
              let add = _ScheduledDP.length + intersection.length;

              if (deepStreamLimit < add) {
                item.disableScheduleCheckbox = true;
              }
            }
            // console.log(item);
          } else {
            console.log("GREATER THAN DS");
            item.disableScheduleCheckbox = true;
            item.disableUnscheduleCheckbox = true;
          }
        });
      }
    }
    this.setState({ data: _data });
  };

  onLoad = () => {
    let _ScheduledUC = [
        ...this.state.apiData.detail.DeviceScheduleDetail.ScheduledUC,
      ],
      _ScheduledDP = [
        ...this.state.apiData.detail.DeviceScheduleDetail.ScheduledDP,
      ],
      _UnScheduledUC = [
        ...this.state.apiData.detail.DeviceScheduleDetail.UnScheduledUC,
      ],
      _UnScheduledDP = [
        ...this.state.apiData.detail.DeviceScheduleDetail.UnScheduledDP,
      ],
      _data = [...usecases.Services];
    for (let ele of _data) {
      ele.scheduleChecked = false;
      ele.unScheduleChecked = false;
      ele.disableScheduleCheckbox = false;
      ele.disableUnscheduleCheckbox = false;
    }
    this.setState(
      {
        ScheduledUC: [..._ScheduledUC],
        ScheduledDP: [..._ScheduledDP],
        UnScheduledUC: [..._UnScheduledUC],
        UnScheduledDP: [..._UnScheduledDP],
        data: [..._data],
      },
      () => {
        console.log(_ScheduledDP.length + "<=" + deepStreamLimit);
        if (_ScheduledDP.length < deepStreamLimit) {
          console.log("DS LIMIT NOT REACHED");
          this.dsScheduleAvailable();
        } else {
          console.log("DS LIMIT REACHED");
          this.dsScheduleAvailable();
        }
      }
    );
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <div style={{ margin: "1vw" }}>
        {console.log(this.state)}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {this.state.data.map((item, index) => (
            <div>
              {item.Service_name}
              <br />
              <label>
                <input
                  type="checkbox"
                  id="scheduled"
                  // value={item.service_name}
                  // onChange={(e) => this.onScheduleClickHandle(e, item, index)}
                  checked={item.scheduleChecked}
                  disabled={item.disableScheduleCheckbox}
                />
                Scheduled
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  id="unscheduled"
                  // value={item.service_name}
                  checked={item.unScheduleChecked}
                  disabled={item.disableUnscheduleCheckbox}
                  // onChange={(e) => this.onUnscheduleClickHandle(e, item, index)}
                />
                UnScheduled
              </label>
              <pre>{JSON.stringify(item.Parent_container_id, null, 4)}</pre>
            </div>
          ))}
        </div>
        <p>ScheduledUC</p>
        <pre>{JSON.stringify(this.state.ScheduledUC, null, 4)}</pre>
        <p>ScheduledDP</p>

        <pre>{JSON.stringify(this.state.ScheduledDP, null, 4)}</pre>
        <p>Deepstream limit</p>
        <pre>{JSON.stringify(deepStreamLimit, null, 4)}</pre>
        <p>Usecase limit</p>
        <pre>{JSON.stringify(usecaseLimit, null, 4)}</pre>
      </div>
    );
  }
}
