import React, { Component } from "react";
import limits from "./limits.json";
import usecases from "./data/services.json";
const useCasesAndDS = usecases["data"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];

class Add extends Component {
  state = {
    data: useCasesAndDS,
    scheduleChecked: [],
    unscheduleChecked: [],
    Deepstream: 0,
    selectedDS: [],
  };

  handleGlobalScheduleDisable = () => {
    console.log("handleGlobalScheduleDisable");
    //to disable all schedule checkbox after it meets its limit eg: "Usecase": 3 so scheduleChecked.length should not be greater than 3

    console.log("Checking use case limit");
    let scheduleChecked = [...this.state.scheduleChecked];
    let data = [...this.state.data];

    if (scheduleChecked.length === usecaseLimit) {
      console.log("Usecase limit reached");
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Usecase") {
          if (!scheduleChecked.some((item) => item === data[i].service_name)) {
            // data[i].disableUnscheduleCheckbox = true;
            data[i].disableScheduleCheckbox = true;
          }
        }
      }
      this.setState({ data });
    } else if (this.state.selectedDS.length === deepStreamLimit) {
      console.log("Deepstream limit reached");
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Usecase") {
          for (let j = 0; j < data[i].Parent_container_id.length; j++) {
            if (
              !this.state.selectedDS.includes(data[i].Parent_container_id[j])
            ) {
              data[i].disableScheduleCheckbox = true;
              // data[i].disableUnscheduleCheckbox = true;
            }
          }
        }
      }
      this.setState({ data });
    } else {
      console.log("handleGlobalScheduleDisable ELSE");
      //disable schedule if any DS is not found in Parent_container_id
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Usecase") {
          if (data[i].Parent_container_id.length <= deepStreamLimit) {
            if (data[i].Parent_container_id.length > 1) {
              console.log("data[i].service_name: " + data[i].service_name);
              let result = [];
              for (let ele of this.state.selectedDS) {
                for (let ele2 of data[i].Parent_container_id) {
                  if (ele === ele2) {
                    result.push(true);
                  } else result.push(false);
                }
                // console.log("ele");
                // console.log(ele);
              }
              if (!result.includes(true)) {
                data[i].disableScheduleCheckbox = true;
                // data[i].disableUnscheduleCheckbox = true;
              }
              console.log(result);
            }
          } else {
            console.log("handleGlobalScheduleDisable ELSE ELSE");
          }
        }
      }
      this.setState({ data });
    }
  };

  handleScheduleCheck = (index) => {
    // reusable function to check Schedule

    let data = [...this.state.data];
    data[index].scheduleChecked = true;
    let selected = data[index].service_name;
    let arr = [...this.state.scheduleChecked];
    arr.push(selected);
    this.setState({ data, scheduleChecked: arr }, () =>
      this.handleGlobalScheduleDisable()
    );
  };

  handleScheduleUncheck = (index, item) => {
    //TODO remove selectedDS
    // reusable function to uncheck Schedule

    let data = [...this.state.data];
    data[index].scheduleChecked = false;
    let selected = data[index].service_name;
    let arr = [...this.state.scheduleChecked];
    let result = arr.filter((item) => item !== selected);
    console.log(this.state.selectedDS);
    // let filteredRes = item.Parent_container_id.filter(
    //   (val) => !this.state.selectedDS.includes(val)
    // );
    // for (let ele of item.Parent_container_id) {
    //   filteredRes = this.state.selectedDS.filter((item) => item !== ele);
    //   // for (let ele2 of this.state.selectedDS) {

    //   //   filteredRes = ele.filter((item) => item);
    //   // }
    //   // console.log(item.Parent_container_id);
    //   // let res
    // }

    this.setState({ data, scheduleChecked: result }, () =>
      this.toggleSchduleUsecase()
    );
  };

  toggleSchduleUsecase = () => {
    let data = [...this.state.data];
    let scheduleChecked = [...this.state.scheduleChecked];

    //to toggle usecase if user uncheck schedule
    console.log(this.state.scheduleChecked.length + "<=" + usecaseLimit);
    if (this.state.scheduleChecked.length === 0) {
      console.log("DEFAULT STATE");
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].type === "Usecase" &&
          data[i].Parent_container_id.length <= deepStreamLimit
        ) {
          data[i].disableScheduleCheckbox = false;
          // data[i].disableUnscheduleCheckbox = false;
        }
      }
      this.setState({ selectedDS: [] });
    } else {
      console.log("toggleSchduleUsecase ELSE");
      let arr = [];
      for (let ele of scheduleChecked) {
        for (let ele2 of data) {
          if (ele2.service_name === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id);
            arr = [...new Set(arr)];
          }
        }
      }

      if (arr.length > 1) {
        console.log("ARR > 1");
        for (let ele of data) {
          if (
            ele.type === "Usecase" &&
            ele.Parent_container_id.length <= deepStreamLimit
          ) {
            let result = [];
            for (let ele2 of this.state.selectedDS) {
              for (let ele3 of ele.Parent_container_id) {
                if (ele.Parent_container_id.length > 1) {
                  console.log("UNCHECK IF");
                  // console.log(ele2 + "===" + ele3);
                  if (ele2 === ele3) {
                    result.push(true);
                  } else result.push(false);
                  console.log("service_name: " + ele.service_name);

                  console.log("result: " + result);
                  if (result.includes(true)) {
                    console.log("object");
                    ele.disableScheduleCheckbox = false;
                    // data[i].disableUnscheduleCheckbox = true;
                  }
                } else {
                  console.log("UNCHECK ELSE");

                  if (ele.Parent_container_id[0] === ele2) {
                    if (this.state.scheduleChecked.length <= usecaseLimit) {
                      ele.disableScheduleCheckbox = false;
                    }
                  }
                }
              }
            }
            console.log("result: " + result);
          }
        }
      } else {
        console.log("ARR === 1");

        for (let ele of data) {
          if (
            ele.type === "Usecase" &&
            ele.Parent_container_id.length <= deepStreamLimit
          ) {
            if (ele.Parent_container_id.length === 1) {
              ele.disableScheduleCheckbox = false;
            } else {
              let result = [];
              for (let ele2 of this.state.selectedDS) {
                for (let ele3 of ele.Parent_container_id) {
                  if (ele2 === ele3) {
                    result.push(true);
                  } else result.push(false);
                }
                // console.log("ele");
                // console.log(ele);
              }
              console.log("result:" + result);
            }
          }
        }
      }
      console.log("arr");
      console.log(arr);

      this.setState({ selectedDS: arr, data });
    }

    // console.log(resilt)
  };

  disableUsecaseDSLimitReached = (indexx) => {
    // disable use case if deepstream limit reached
    // console.log(this.state.selectedDS.length + "===" + deepStreamLimit);
    if (this.state.selectedDS.length === deepStreamLimit) {
      // console.log(this.state.scheduleChecked.length + "===" + usecaseLimit);
      if (this.state.scheduleChecked.length >= usecaseLimit) {
        console.log("disableUsecaseDSLimitReached IF");
        let data = [...this.state.data];
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === "Usecase") {
            for (let j = 0; j < data[i].Parent_container_id.length; j++) {
              if (
                !this.state.selectedDS.some(
                  (item) => item === data[i].Parent_container_id[j]
                )
              ) {
                // data[i].disableUnscheduleCheckbox = true;
                data[i].disableScheduleCheckbox = true;
              }
            }
          }
        }
        this.setState({ data });
      } else {
        console.log("this.handleScheduleCheck(indexx);");
        this.handleScheduleCheck(indexx);
      }
    } else {
      this.handleScheduleCheck(indexx);
      console.log("disableUsecaseDSLimitReached ELSE");
    }
  };

  onScheduleClickHandle = (e, item, index) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedDS];
    const isChecked = this.state.scheduleChecked.some(
      (itemm) => itemm === item.service_name
    );
    //if else condition to check and uncheck scheduled usecase
    if (isChecked) {
      //if checked
      this.handleScheduleUncheck(index, item);
    } else {
      // if unchecked
      if (!this.state.selectedDS.length) {
        console.log("IF");
        this.setState({ selectedDS: parentContainerArr }, () => {
          this.disableUsecaseDSLimitReached(index);
          // this.handleScheduleCheck(index);
        });
      } else {
        console.log("ELSE");
        for (let i = 0; i < parentContainerArr.length; i++) {
          if (!selectedDS.some((item) => item === parentContainerArr[i])) {
            selectedDS.push(parentContainerArr[i]);
          }
        }
        this.setState({ selectedDS }, () => {
          this.disableUsecaseDSLimitReached(index);
          // this.handleScheduleCheck(index);
        });
      }
    }
  };

  onLoad = () => {
    //Disable the service if it does not match the DeepStreamLimit
    let data = [...this.state.data];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "Usecase") {
        if (data[i].Parent_container_id.length > deepStreamLimit) {
          // data[i].disableUnscheduleCheckbox = true;
          data[i].disableScheduleCheckbox = true;
        }
      }
    }
    this.setState({ data });
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <div>
        {console.log(this.state)}
        Add
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {this.state.data.map((item, index) => {
            if (item.type === "Usecase") {
              return (
                <div>
                  {item.service_name}
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      id="scheduled"
                      name="scheduled"
                      value={item.service_name}
                      onChange={(e) =>
                        this.onScheduleClickHandle(e, item, index)
                      }
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
                      name="unscheduled"
                      value={item.service_name}
                      checked={item.unScheduleChecked}
                      disabled={item.disableUnscheduleCheckbox}
                      onChange={(e) =>
                        this.onScheduleClickHandle(e, item, index)
                      }
                    />
                    UnScheduled
                  </label>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default Add;
