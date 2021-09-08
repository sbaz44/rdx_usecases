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
    selectedUsDS: [],
  };

  //reusable functions

  //function to get USESCASES
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

  resultIntersection = (element, type, arr, callback) => {
    let selectedDS =
      type === "unschedule"
        ? [...this.state.selectedUsDS]
        : [...this.state.selectedDS];
    let intersection = element.Parent_container_id.filter(
      (x) => !selectedDS.includes(x)
    );
    let add = arr.length + intersection.length;
    if (deepStreamLimit < add) {
      console.log("DISABLED: " + element.service_name);
      if (type === "unschedule") element.disableUnscheduleCheckbox = true;
      else element.disableScheduleCheckbox = true;
    } else {
      if (type === "unschedule") element.disableUnscheduleCheckbox = false;
      else element.disableScheduleCheckbox = false;
    }

    callback(element);
  };

  handleGlobalScheduleDisable = () => {
    //to disable all schedule checkbox after it meets its limit eg: "Usecase": 3 so scheduleChecked.length should not be greater than 3

    console.log("Checking use case limit");
    let scheduleChecked = [...this.state.scheduleChecked];
    let data = [...this.state.data];

    if (scheduleChecked.length === usecaseLimit) {
      console.log("Usecase limit reached");

      this.optionLoop(data, (items) => {
        if (!scheduleChecked.some((item) => item === items.service_name)) {
          items.disableScheduleCheckbox = true;
        }
      });

      this.setState({ data });
    } else if (this.state.selectedDS.length === deepStreamLimit) {
      console.log("Deepstream limit reached");

      this.optionLoop(data, (items) => {
        this.parentLoop(items.Parent_container_id, (item2) => {
          if (!this.state.selectedDS.includes(item2)) {
            items.disableScheduleCheckbox = true;
          }
        });
      });

      this.setState({ data });
    } else {
      console.log("handleGlobalScheduleDisable ELSE");

      this.optionLoop(data, (items) => {
        if (this.state.selectedDS.length > 1) {
          //if selectedDS length is greater than 1
          console.log("selectedDS length is greater than 1");
          if (
            items.Parent_container_id.length >= this.state.selectedDS.length
          ) {
            //parent is greater/equal to selectedDS

            let result = [];
            for (let ele of this.state.selectedDS) {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            }
            if (!result.includes(true)) {
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedDS.includes(x)
              );
              if (intersection.length) items.disableScheduleCheckbox = true;
            } else {
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedDS.includes(x)
              );
              let add = this.state.selectedDS.length + intersection.length;

              if (deepStreamLimit < add) {
                items.disableScheduleCheckbox = true;
              }
            }
          } else {
            //parent length is less than selectedDS
          }
        } else {
          // selectedDS length is 1
          if (items.Parent_container_id.length > 1) {
            console.log("selectedDS length is 1: " + items.service_name);
            let result = [];
            for (let ele of this.state.selectedDS) {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            }
            if (!result.includes(true)) {
              if (items.Parent_container_id.length < deepStreamLimit) {
              } else {
                let intersection = items.Parent_container_id.filter(
                  (x) => !this.state.selectedDS.includes(x)
                );
                if (intersection.length) items.disableScheduleCheckbox = true;
              }
            } else {
              console.log(items.service_name);
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedDS.includes(x)
              );
              let add = this.state.selectedDS.length + intersection.length;
              if (deepStreamLimit < add) {
                items.disableScheduleCheckbox = true;
              }
            }
          }
        }
      });
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
    // reusable function to uncheck Schedule
    let data = [...this.state.data];
    data[index].scheduleChecked = false;
    let selected = data[index].service_name;
    let arr = [...this.state.scheduleChecked];
    let result = arr.filter((item) => item !== selected);

    this.setState({ data, scheduleChecked: result }, () =>
      this.toggleSchduleUsecase()
    );
  };

  toggleSchduleUsecase = () => {
    let data = [...this.state.data];
    let scheduleChecked = [...this.state.scheduleChecked];

    //to toggle usecase if user uncheck schedule
    if (this.state.scheduleChecked.length === 0) {
      console.log("DEFAULT STATE");

      this.parentLoop(data, (ele) => {
        if (
          ele.type === "Usecase" &&
          ele.Parent_container_id.length <= deepStreamLimit
        ) {
          ele.disableScheduleCheckbox = false;
        }
      });
      this.setState({ selectedDS: [] });
    } else {
      console.log("toggleSchduleUsecase ELSE");
      let arr = [];

      this.parentLoop(scheduleChecked, (ele) => {
        this.parentLoop(data, (ele2) => {
          if (ele2.service_name === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id);
            arr = [...new Set(arr)];
          }
        });
      });

      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = data.filter(
          (item) =>
            item.type === "Usecase" &&
            item.Parent_container_id.length <= deepStreamLimit
        );

        this.parentLoop(filterData, (element) => {
          let result = [];
          this.parentLoop(arr, (ele) => {
            this.parentLoop(element.Parent_container_id, (ele2) => {
              if (ele === ele2) result.push(true);
              else result.push(false);
            });
          });
          console.log(element.service_name);
          console.log("result: " + result);
          if (result.includes(true)) {
            this.resultIntersection(element, "schedule", arr, (obj) => {
              element = { ...obj };
            });
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(data, (element) => {
          if (
            element.type === "Usecase" &&
            element.Parent_container_id.length <= deepStreamLimit
          ) {
            if (element.Parent_container_id.length === 1) {
              element.disableScheduleCheckbox = false;
            } else {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });

              if (result.includes(true)) {
                this.resultIntersection(element, "schedule", arr, (obj) => {
                  element = { ...obj };
                });
              }
            }
          }
        });
      }
      this.setState({ selectedDS: arr, data });
    }
  };

  disableUsecaseDSLimitReached = (indexx) => {
    // disable use case if deepstream limit reached
    if (this.state.selectedDS.length === deepStreamLimit) {
      if (this.state.scheduleChecked.length >= usecaseLimit) {
        console.log("disableUsecaseDSLimitReached IF");
        let data = [...this.state.data];

        this.optionLoop(data, (items) => {
          this.parentLoop(items.Parent_container_id, (item2) => {
            if (!this.state.selectedDS.some((item) => item === item2)) {
              items.disableScheduleCheckbox = true;
            }
          });
        });
        this.setState({ data });
      } else {
        this.handleScheduleCheck(indexx);
      }
    } else {
      this.handleScheduleCheck(indexx);
      console.log("disableUsecaseDSLimitReached ELSE");
    }
  };

  onScheduleClickHandle = (e, item, index, type) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedDS];
    const isChecked = this.state.scheduleChecked.some(
      (itemm) => itemm === item.service_name
    );
    //if else condition to check and uncheck scheduled usecase
    if (isChecked) {
      //if unchecked
      this.handleScheduleUncheck(index, item);
    } else {
      // if checked
      if (!this.state.selectedDS.length) {
        console.log("IF");
        this.setState({ selectedDS: parentContainerArr }, () => {
          this.disableUsecaseDSLimitReached(index);
        });
      } else {
        console.log("ELSE");
        this.parentLoop(parentContainerArr, (ele) => {
          if (!selectedDS.some((item) => item === ele)) {
            selectedDS.push(ele);
          }
        });

        this.setState({ selectedDS }, () => {
          this.disableUsecaseDSLimitReached(index);
        });
      }
    }
  };

  // UNSCHEDULE FUNCTION

  handleGlobalUnscheduleDisable = () => {
    //to disable all schedule checkbox after it meets its limit eg: "Usecase": 3 so scheduleChecked.length should not be greater than 3

    console.log("Checking use case limit");
    let scheduleChecked = [...this.state.unscheduleChecked];
    let data = [...this.state.data];

    if (scheduleChecked.length === usecaseLimit) {
      console.log("Usecase limit reached");

      this.optionLoop(data, (items) => {
        if (!scheduleChecked.some((item) => item === items.service_name)) {
          items.disableUnscheduleCheckbox = true;
        }
      });

      this.setState({ data });
    } else if (this.state.selectedUsDS.length === deepStreamLimit) {
      console.log("Deepstream limit reached");

      this.optionLoop(data, (items) => {
        this.parentLoop(items.Parent_container_id, (item2) => {
          if (!this.state.selectedUsDS.includes(item2)) {
            items.disableUnscheduleCheckbox = true;
          }
        });
      });

      this.setState({ data });
    } else {
      console.log("handleGlobalScheduleDisable ELSE");

      this.optionLoop(data, (items) => {
        if (this.state.selectedUsDS.length > 1) {
          //if selectedUsDS length is greater than 1
          console.log("selectedUsDS length is greater than 1");
          if (
            items.Parent_container_id.length >= this.state.selectedUsDS.length
          ) {
            //parent is greater/equal to selectedUsDS

            let result = [];
            for (let ele of this.state.selectedUsDS) {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            }
            if (!result.includes(true)) {
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedUsDS.includes(x)
              );
              if (intersection.length) items.disableUnscheduleCheckbox = true;
            } else {
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedUsDS.includes(x)
              );
              let add = this.state.selectedUsDS.length + intersection.length;

              if (deepStreamLimit < add) {
                items.disableUnscheduleCheckbox = true;
              }
            }
          } else {
            //parent length is less than selectedUsDS
          }
        } else {
          // selectedUsDS length is 1
          if (items.Parent_container_id.length > 1) {
            console.log("selectedUsDS length is 1: " + items.service_name);
            let result = [];
            for (let ele of this.state.selectedUsDS) {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            }
            if (!result.includes(true)) {
              if (items.Parent_container_id.length < deepStreamLimit) {
              } else {
                let intersection = items.Parent_container_id.filter(
                  (x) => !this.state.selectedUsDS.includes(x)
                );
                if (intersection.length) items.disableUnscheduleCheckbox = true;
              }
            } else {
              console.log(items.service_name);
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedUsDS.includes(x)
              );
              let add = this.state.selectedUsDS.length + intersection.length;
              if (deepStreamLimit < add) {
                items.disableUnscheduleCheckbox = true;
              }
            }
          }
        }
      });
      this.setState({ data });
    }
  };

  handleUnscheduleCheck = (index) => {
    // reusable function to check Schedule

    let data = [...this.state.data];
    data[index].unScheduleChecked = true;
    let selected = data[index].service_name;
    let arr = [...this.state.unscheduleChecked];
    arr.push(selected);
    this.setState({ data, unscheduleChecked: arr }, () =>
      this.handleGlobalUnscheduleDisable()
    );
  };

  handleUnscheduleUncheck = (index, item) => {
    // reusable function to uncheck Schedule
    let data = [...this.state.data];
    data[index].unScheduleChecked = false;
    let selected = data[index].service_name;
    let arr = [...this.state.unscheduleChecked];
    let result = arr.filter((item) => item !== selected);

    this.setState({ data, unscheduleChecked: result }, () =>
      this.toggleUnschduleUsecase()
    );
  };

  toggleUnschduleUsecase = () => {
    let data = [...this.state.data];
    let scheduleChecked = [...this.state.unscheduleChecked];

    //to toggle usecase if user uncheck schedule
    if (scheduleChecked.length === 0) {
      console.log("DEFAULT STATE");

      this.parentLoop(data, (ele) => {
        if (
          ele.type === "Usecase" &&
          ele.Parent_container_id.length <= deepStreamLimit
        ) {
          ele.disableUnscheduleCheckbox = false;
        }
      });
      this.setState({ selectedUsDS: [] });
    } else {
      console.log("toggleSchduleUsecase ELSE");
      let arr = [];
      this.parentLoop(scheduleChecked, (ele) => {
        this.parentLoop(data, (ele2) => {
          if (ele2.service_name === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id);
            arr = [...new Set(arr)];
          }
        });
      });

      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = data.filter(
          (item) =>
            item.type === "Usecase" &&
            item.Parent_container_id.length <= deepStreamLimit
        );

        this.parentLoop(filterData, (element) => {
          let result = [];
          this.parentLoop(arr, (ele) => {
            this.parentLoop(element.Parent_container_id, (ele2) => {
              if (ele === ele2) result.push(true);
              else result.push(false);
            });
          });
          console.log(element.service_name);
          console.log("result: " + result);
          if (result.includes(true)) {
            this.resultIntersection(element, "unschedule", arr, (obj) => {
              element = { ...obj };
            });
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(data, (element) => {
          if (
            element.type === "Usecase" &&
            element.Parent_container_id.length <= deepStreamLimit
          ) {
            if (element.Parent_container_id.length === 1) {
              element.disableUnscheduleCheckbox = false;
            } else {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });
              console.log(result);
              if (result.includes(true)) {
                this.resultIntersection(element, "unschedule", arr, (obj) => {
                  element = { ...obj };
                });
              }
            }
          }
        });
      }
      this.setState({ selectedUsDS: arr, data });
    }
  };

  disableUsecaseDSLimitReached2 = (indexx) => {
    // disable use case if deepstream limit reached
    if (this.state.selectedUsDS.length === deepStreamLimit) {
      if (this.state.unscheduleChecked.length >= usecaseLimit) {
        console.log("disableUsecaseDSLimitReached IF");
        let data = [...this.state.data];

        this.optionLoop(data, (items) => {
          this.parentLoop(items.Parent_container_id, (item2) => {
            if (!this.state.selectedUsDS.some((item) => item === item2)) {
              items.disableUnscheduleCheckbox = true;
            }
          });
        });
        this.setState({ data });
      } else {
        this.handleUnscheduleCheck(indexx);
      }
    } else {
      this.handleUnscheduleCheck(indexx);
      console.log("disableUsecaseDSLimitReached ELSE");
    }
  };

  onUnscheduleClickHandle = (e, item, index, type) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedUsDS];
    const isChecked = this.state.unscheduleChecked.some(
      (itemm) => itemm === item.service_name
    );
    //if else condition to check and uncheck scheduled usecase
    if (isChecked) {
      //if unchecked
      this.handleUnscheduleUncheck(index, item);
    } else {
      // if checked
      if (!selectedDS.length) {
        console.log("IF");
        this.setState({ selectedUsDS: parentContainerArr }, () => {
          this.disableUsecaseDSLimitReached2(index);
        });
      } else {
        console.log("ELSE");
        this.parentLoop(parentContainerArr, (ele) => {
          if (!selectedDS.some((item) => item === ele)) {
            selectedDS.push(ele);
          }
        });

        this.setState({ selectedUsDS: selectedDS }, () => {
          this.disableUsecaseDSLimitReached2(index);
        });
      }
    }
  };

  onLoad = () => {
    //Disable the service if it does not match the DeepStreamLimit
    let data = [...this.state.data];

    this.optionLoop(data, (item) => {
      if (item.Parent_container_id.length > deepStreamLimit) {
        item.disableScheduleCheckbox = true;
        item.disableUnscheduleCheckbox = true;
      }
    });
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
                        this.onUnscheduleClickHandle(e, item, index)
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
