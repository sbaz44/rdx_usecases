import React, { Component } from "react";
import limits from "./limits.json";
import usecases from "./data/services.json";
const useCasesAndDS = usecases["data"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];

//check whether value is present inside object of array of object
const arrayIncludesInObj = (arr, key, valueToCheck) => {
  return arr.some((value) => console.log(value));
};

const hasParent = (arr) => arr.some((vendor) => vendor["Name"] === "Magenic");

const getUseCases = (array) => array.filter((item) => item.type === "Usecase");

class Add extends Component {
  state = {
    data: useCasesAndDS,
    scheduleChecked: [],
    unscheduleChecked: [],
    Deepstream: 0,
    selectedDS: [],
  };

  handleGlobalScheduleDisable = () => {
    //to disable all schedule checkbox after it meets its limit eg: "Usecase": 3 so scheduleChecked.length should not be greater than 3

    console.log("Checking use case limit")
    let scheduleChecked = [...this.state.scheduleChecked];
    let data = [...this.state.data];

    if (scheduleChecked.length === usecaseLimit) {
      console.log("Usecase limit reached");
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Usecase") {
          if (
            !scheduleChecked.some(
              (item) => item === data[i].service_name
            )
          ) {
            // data[i].disableUnscheduleCheckbox = true;
            data[i].disableScheduleCheckbox = true;
          }
          // for (let j = 0; j < data[i].Parent_container_id.length; j++) {
          //   if (
          //     !this.state.selectedDS.some(
          //       (item) => item === data[i].Parent_container_id[j]
          //     )
          //   ) {
          //     data[i].disableUnscheduleCheckbox = true;
          //     data[i].disableScheduleCheckbox = true;
          //   }
          // }
        }
      }
      this.setState({ data });
    }

  }

  handleScheduleCheck = (index) => {
    // reusable function to check Schedule

    let data = [...this.state.data];
    data[index].scheduleChecked = true;
    let selected = data[index].service_name;
    let arr = [...this.state.scheduleChecked];
    arr.push(selected)
    this.setState({ data, scheduleChecked: arr }, () => this.handleGlobalScheduleDisable());
  };

  handleScheduleUncheck = (index) => {
    // reusable function to uncheck Schedule

    let data = [...this.state.data];
    data[index].scheduleChecked = false;
    let selected = data[index].service_name;
    let arr = [...this.state.scheduleChecked];
    let result = arr.filter(item => item !== selected);

    this.setState({ data, scheduleChecked: result }, () => this.toggleSchduleUsecase());
  };

  toggleSchduleUsecase = () => {
    //to toggle usecase if user checks and uncheck schedule

    if (this.state.scheduleChecked.length <= usecaseLimit) {
      let data = [...this.state.data];
      console.log("Usecase limit not reached");
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Usecase" && data[i].Parent_container_id.length <= deepStreamLimit) {
          console.log(data[i])
        }
      }
    }
    // this.setState({ data });
  }




  disableUsecaseDSLimitReached = () => {
    // disable use case if deepstream limit reached
    console.log(this.state.selectedDS.length + "===" + deepStreamLimit);
    if (this.state.selectedDS.length === deepStreamLimit) {
      let data = [...this.state.data];
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Usecase") {
          for (let j = 0; j < data[i].Parent_container_id.length; j++) {
            if (
              !this.state.selectedDS.some(
                (item) => item === data[i].Parent_container_id[j]
              )
            ) {
              data[i].disableUnscheduleCheckbox = true;
              data[i].disableScheduleCheckbox = true;
            }
          }
        }
      }
      this.setState({ data });
    }
    else {
      console.log("disableUsecaseDSLimitReached")
    }
  };

  onScheduleClickHandle = (e, item, index) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedDS];
    const isChecked = this.state.scheduleChecked.some(
      (itemm) =>
        itemm === item.service_name

    )
    //if else condition to check and uncheck scheduled usecase
    if (isChecked) {
      //if checked
      this.handleScheduleUncheck(index)
    }
    else {
      // if unchecked
      if (!this.state.selectedDS.length) {
        console.log("IF");
        this.setState({ selectedDS: parentContainerArr }, () => {
          this.disableUsecaseDSLimitReached();
          this.handleScheduleCheck(index);
        });
      } else {
        console.log("ELSE");
        for (let i = 0; i < parentContainerArr.length; i++) {
          if (!selectedDS.some((item) => item === parentContainerArr[i])) {
            selectedDS.push(parentContainerArr[i]);
          }
        }
        this.setState({ selectedDS }, () => {
          this.disableUsecaseDSLimitReached();
          this.handleScheduleCheck(index);
        });
      }
    }

    // if (deepStreamLimit >= this.state.Deepstream) {
    //   this.setState({ Deepstream: this.state.Deepstream + 1 });
    //   // let result = this.state.data.filter(x => x.name == 'Mark' && x.address == 'England');
    //   let result = [];
    //   for (let i = 0; i < this.state.data.length; i++) {
    //     arrayIncludesInObj(parentContainerArr);
    //   }
    // } else {
    //   alert("DS limit reached");
    // }
  };

  onLoad = () => {
    //Disable the service if it does not match the DeepStreamLimit
    let data = [...this.state.data];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === "Usecase") {
        if (data[i].Parent_container_id.length > deepStreamLimit) {
          data[i].disableUnscheduleCheckbox = true;
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
                      value="unscheduled"
                      checked={item.unScheduleChecked}
                      disabled={item.disableUnscheduleCheckbox}
                    // onChange={onUnscheduledClicked}
                    // checked={unScheduleChecked}
                    // disabled={unScheduleDisable}
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
