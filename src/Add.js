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
    Deepstream: 0,
    selectedDS: [],
  };

  handleScheduleCheck = (index) => {
    let data = [...this.state.data];
    data[index].scheduleChecked = true;
    this.setState({ data });
  };
  disableUsecase = () => {
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
  };

  onScheduleClickHandle = (e, item, index) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedDS];

    if (!this.state.selectedDS.length) {
      console.log("IF");
      this.setState({ selectedDS: parentContainerArr }, () => {
        this.disableUsecase();
        this.handleScheduleCheck(index);
      });
    } else {
      console.log("ELSE");

      for (let i = 0; i < parentContainerArr.length; i++) {
        if (!selectedDS.some((item) => item === parentContainerArr[i])) {
          console.log("not found");
          selectedDS.push(parentContainerArr[i]);
        }
      }
      console.log(selectedDS);
      this.setState({ selectedDS }, () => {
        this.handleScheduleCheck(index);
        this.disableUsecase();
      });
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
