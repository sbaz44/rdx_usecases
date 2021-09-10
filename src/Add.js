import React, { Component } from "react";
import limits from "./limits.json";
import usecases from "./data/service2.json";
// const useCasesAndDS = usecases["data"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];

class Add extends Component {
  state = {
    data: usecases.Services,
    scheduleChecked: [],
    unscheduleChecked: [],
    selectedDS: [],
    selectedUsDS: [],
    apiData: {
      detail: {
        DeviceScheduleDetail: {
          ScheduledUC: [
            // "LOITV1",
            // "TRESSPASSV1",
            // "OCCUPANCYANALYSISV1",
            // "QUEUEV1",
            // "MASKHELMETV1",
            // "DUMMY2V1",
            // "DUMMY1V1",
          ],
          ScheduledDP: [],
          // ScheduledDP: ["person", "dp1", "dp2", "fmgh"],
          // ScheduledDP: ["dp1", "dp2"],
          // ScheduledDP: ["person"],
          // ScheduledDP: ["person", "fmgh"],
          UnScheduledUC: ["LOITV1", "TRESSPASSV1"],
          UnScheduledDP: [],
          // UnScheduledDP: ["person"],
        },
      },
      module_data: [
        {
          Service_id: "string",
          Parent_container_id: ["string"],
        },
      ],
    },
    ScheduledUC: [],
    ScheduledDP: [],
    UnScheduledUC: [],
    UnScheduledDP: [],
    disabledSchedule: [],
  };

  //reusable functions

  //function to get USESCASES
  // parentLoop = (arr, callback) => {
  //   for (let element of arr) {
  //     if (
  //       callback(element);
  //     }
  //   }
  // };

  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  resultIntersection = (element, type, arr, callback) => {
    let selectedDS = [...arr];
    // let selectedDS =
    //   type === "unschedule"
    //     ? [...this.state.selectedUsDS]
    //     : [...this.state.selectedDS];

    let intersection = element.Parent_container_id.filter(
      (x) => !selectedDS.includes(x)
    );
    let add = arr.length + intersection.length;

    if (deepStreamLimit < add) {
      console.log("DISABLED: " + element.Service_name);
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

      this.parentLoop(data, (items) => {
        if (!scheduleChecked.some((item) => item === items.Service_id)) {
          items.disableScheduleCheckbox = true;
        }
      });

      this.setState({ data });
    } else if (this.state.selectedDS.length === deepStreamLimit) {
      console.log("Deepstream limit reached");

      this.parentLoop(data, (items) => {
        this.parentLoop(items.Parent_container_id, (item2) => {
          if (!this.state.selectedDS.includes(item2)) {
            items.disableScheduleCheckbox = true;
          }
        });
      });

      this.setState({ data });
    } else {
      console.log("handleGlobalScheduleDisable ELSE");

      this.parentLoop(data, (items) => {
        if (this.state.selectedDS.length > 1) {
          //if selectedDS length is greater than 1
          console.log("selectedDS length is greater than 1");

          if (
            // items.Parent_container_id.length >= this.state.selectedDS.length
            items.Parent_container_id.length <= this.state.selectedDS.length
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
              this.resultIntersection(
                items,
                "schedule",
                this.state.selectedDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            } else {
              this.resultIntersection(
                items,
                "schedule",
                this.state.selectedDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            }

            // if (!result.includes(true)) {
            //   let intersection = items.Parent_container_id.filter(
            //     (x) => !this.state.selectedDS.includes(x)
            //   );
            //   let add = this.state.selectedDS.length + intersection.length;
            //   if (deepStreamLimit < add) {
            //     items.disableScheduleCheckbox = true;
            //   }
            // } else {
            //   let intersection = items.Parent_container_id.filter(
            //     (x) => !this.state.selectedDS.includes(x)
            //   );
            //   let add = this.state.selectedDS.length + intersection.length;

            //   if (deepStreamLimit < add) {
            //     items.disableScheduleCheckbox = true;
            //   }
            // }
          } else {
            //parent length is greater than selectedDS
            console.log("parent length is greater than selectedDS");
            let result = [];
            for (let ele of this.state.selectedDS) {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            }

            if (!result.includes(true)) {
              this.resultIntersection(
                items,
                "schedule",
                this.state.selectedDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            } else {
              this.resultIntersection(
                items,
                "schedule",
                this.state.selectedDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            }

            // if (!result.includes(true)) {
            //   let intersection = items.Parent_container_id.filter(
            //     (x) => !this.state.selectedDS.includes(x)
            //   );
            //   let add = this.state.selectedDS.length + intersection.length;
            //   if (deepStreamLimit < add) {
            //     items.disableScheduleCheckbox = true;
            //   }
            // } else {
            //   let intersection = items.Parent_container_id.filter(
            //     (x) => !this.state.selectedDS.includes(x)
            //   );
            //   let add = this.state.selectedDS.length + intersection.length;

            //   if (deepStreamLimit < add) {
            //     items.disableScheduleCheckbox = true;
            //   }
            // }
          }
        } else {
          // selectedDS length is 1
          if (items.Parent_container_id.length > 1) {
            console.log("selectedDS length is 1: " + items.Service_name);
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
              this.resultIntersection(
                items,
                "schedule",
                this.state.selectedDS,
                (obj) => {
                  items = { ...obj };
                }
              );

              // let intersection = items.Parent_container_id.filter(
              //   (x) => !this.state.selectedDS.includes(x)
              // );
              // let add = this.state.selectedDS.length + intersection.length;
              // if (deepStreamLimit < add) {
              //   items.disableScheduleCheckbox = true;
              // }
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
    let selected = data[index].Service_id;
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
    let selected = data[index].Service_id;
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
        if (ele.Parent_container_id.length <= deepStreamLimit) {
          ele.disableScheduleCheckbox = false;
        }
      });
      this.setState({ selectedDS: [] });
    } else {
      console.log("toggleSchduleUsecase ELSE");
      let arr = [];

      this.parentLoop(scheduleChecked, (ele) => {
        this.parentLoop(data, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id);
            arr = [...new Set(arr)];
          }
        });
      });
      console.log(arr);
      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = data.filter(
          (item) => item.Parent_container_id.length <= deepStreamLimit
        );
        this.parentLoop(filterData, (element) => {
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
          } else {
            this.resultIntersection(element, "schedule", arr, (obj) => {
              element = { ...obj };
            });
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(data, (element) => {
          if (element.Parent_container_id.length <= deepStreamLimit) {
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
              } else {
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

        this.parentLoop(data, (items) => {
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

  onScheduleClickHandle = (e, item, index) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedDS];
    const isChecked = this.state.scheduleChecked.some(
      (itemm) => itemm === item.Service_id
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

      this.parentLoop(data, (items) => {
        if (!scheduleChecked.some((item) => item === items.Service_id)) {
          items.disableUnscheduleCheckbox = true;
        }
      });

      this.setState({ data });
    } else if (this.state.selectedUsDS.length === deepStreamLimit) {
      console.log("Deepstream limit reached");

      this.parentLoop(data, (items) => {
        this.parentLoop(items.Parent_container_id, (item2) => {
          if (!this.state.selectedUsDS.includes(item2)) {
            items.disableUnscheduleCheckbox = true;
          }
        });
      });

      this.setState({ data });
    } else {
      console.log("handleGlobalunScheduleDisable ELSE");

      this.parentLoop(data, (items) => {
        if (this.state.selectedUsDS.length > 1) {
          //if selectedUsDS length is greater than 1
          console.log("selectedUsDS length is greater than 1");

          if (
            items.Parent_container_id.length <= this.state.selectedUsDS.length
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
              this.resultIntersection(
                items,
                "unschedule",
                this.state.selectedUsDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            } else {
              this.resultIntersection(
                items,
                "unschedule",
                this.state.selectedUsDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            }
            // if (!result.includes(true)) {
            //   let intersection = items.Parent_container_id.filter(
            //     (x) => !this.state.selectedUsDS.includes(x)
            //   );
            //   let add = this.state.selectedUsDS.length + intersection.length;
            //   if (deepStreamLimit < add) {
            //     items.disableUnscheduleCheckbox = true;
            //   }
            // } else {
            //   let intersection = items.Parent_container_id.filter(
            //     (x) => !this.state.selectedUsDS.includes(x)
            //   );
            //   let add = this.state.selectedUsDS.length + intersection.length;

            //   if (deepStreamLimit < add) {
            //     items.disableUnscheduleCheckbox = true;
            //   }
            // }
          } else {
            console.log("parent length is greater than selectedDS");
            let result = [];
            for (let ele of this.state.selectedDS) {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            }

            if (!result.includes(true)) {
              this.resultIntersection(
                items,
                "unschedule",
                this.state.selectedUsDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            } else {
              this.resultIntersection(
                items,
                "unschedule",
                this.state.selectedUsDS,
                (obj) => {
                  items = { ...obj };
                }
              );
            }
          }
        } else {
          // selectedUsDS length is 1
          if (items.Parent_container_id.length > 1) {
            console.log("selectedUsDS length is 1: " + items.Service_name);
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
              this.resultIntersection(
                items,
                "unschedule",
                this.state.selectedUsDS,
                (obj) => {
                  items = { ...obj };
                }
              );
              // let intersection = items.Parent_container_id.filter(
              //   (x) => !this.state.selectedUsDS.includes(x)
              // );
              // let add = this.state.selectedUsDS.length + intersection.length;
              // if (deepStreamLimit < add) {
              //   items.disableUnscheduleCheckbox = true;
              // }
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
    let selected = data[index].Service_id;
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
    let selected = data[index].Service_id;
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
        if (ele.Parent_container_id.length <= deepStreamLimit) {
          ele.disableUnscheduleCheckbox = false;
        }
      });
      this.setState({ selectedUsDS: [] });
    } else {
      console.log("toggleUnschduleUsecase ELSE");
      let arr = [];
      this.parentLoop(scheduleChecked, (ele) => {
        this.parentLoop(data, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id);
            arr = [...new Set(arr)];
          }
        });
      });

      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = data.filter(
          (item) => item.Parent_container_id.length <= deepStreamLimit
        );

        this.parentLoop(filterData, (element) => {
          let result = [];
          this.parentLoop(arr, (ele) => {
            this.parentLoop(element.Parent_container_id, (ele2) => {
              if (ele === ele2) result.push(true);
              else result.push(false);
            });
          });

          if (result.includes(true)) {
            this.resultIntersection(element, "unschedule", arr, (obj) => {
              element = { ...obj };
            });
          } else {
            this.resultIntersection(element, "unschedule", arr, (obj) => {
              element = { ...obj };
            });
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(data, (element) => {
          if (element.Parent_container_id.length <= deepStreamLimit) {
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
              if (result.includes(true)) {
                this.resultIntersection(element, "unschedule", arr, (obj) => {
                  element = { ...obj };
                });
              } else {
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

        this.parentLoop(data, (items) => {
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
      (itemm) => itemm === item.Service_id
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
    let data = [...this.state.data];
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
      ];

    for (let ele of data) {
      ele.scheduleChecked = false;
      ele.unScheduleChecked = false;
      ele.disableScheduleCheckbox = false;
      ele.disableUnscheduleCheckbox = false;
    }

    this.setState(
      {
        data,
        ScheduledUC: [..._ScheduledUC],
        ScheduledDP: [..._ScheduledDP],
        UnScheduledUC: [..._UnScheduledUC],
        UnScheduledDP: [..._UnScheduledDP],
      },
      () => {
        if (_ScheduledDP.length !== 0 || _UnScheduledDP.length !== 0) {
          console.log("CAMERA IS PRESENT");
          this.setState({ selectedDS: [..._ScheduledDP] });
          // if (_ScheduledDP.length < deepStreamLimit) {
          //   console.log("DS LIMIT NOT REACHED");
          //   this.dsScheduleAvailable();
          // } else {
          //   console.log("DS LIMIT REACHED");
          this.dsScheduleAvailable();
          // }
        } else {
          console.log("CAMERA IS NOT PRESENT");
          this.parentLoop(data, (item) => {
            if (item.Parent_container_id.length > deepStreamLimit) {
              item.disableScheduleCheckbox = true;
              item.disableUnscheduleCheckbox = true;
            }
          });
          this.setState({ data });
        }
      }
    );
  };

  //IF CAMEARA IS PRESENT

  dsScheduleAvailable = () => {
    let _data = [...this.state.data];
    let _ScheduledUC = [...this.state.ScheduledUC];
    let _ScheduledDP = [...this.state.ScheduledDP];
    let _disabledSchedule = [...this.state.disabledSchedule];
    if (this.state.ScheduledUC.length >= usecaseLimit) {
      console.log("USE CASE LIMIT REACHED");
      this.parentLoop(_data, (item) => {
        //disable other usecase and DS
        if (!_ScheduledUC.includes(item.Service_id)) {
          console.log("service name: " + item.Service_name);
          _disabledSchedule.push(item.Service_id);
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
                if (ele === ele2) result.push(true);
                else result.push(false);
              });
            });
            if (result.includes(true)) {
              let intersection = item.Parent_container_id.filter(
                (x) => !_ScheduledDP.includes(x)
              );

              let add = _ScheduledDP.length + intersection.length;
              if (deepStreamLimit < add) {
                item.disableScheduleCheckbox = true;
                _disabledSchedule.push(item.Service_id);
              }
            } else {
              item.disableScheduleCheckbox = true;
              _disabledSchedule.push(item.Service_id);
            }
          } else {
            item.disableScheduleCheckbox = true;
            _disabledSchedule.push(item.Service_id);
          }
        });
      } else {
        console.log("DS LIMIT NOT REACHED V2");
        this.parentLoop(_data, (item) => {
          if (item.Parent_container_id.length <= deepStreamLimit) {
            let result = [];
            this.parentLoop(item.Parent_container_id, (ele) => {
              this.parentLoop(this.state.ScheduledDP, (ele2) => {
                if (ele2 === ele) result.push(true);
                else result.push(false);
              });
            });
            if (!result.includes(true)) {
              let intersection = item.Parent_container_id.filter(
                (x) => !_ScheduledDP.includes(x)
              );
              let add = _ScheduledDP.length + intersection.length;

              if (deepStreamLimit < add) {
                item.disableScheduleCheckbox = true;
                _disabledSchedule.push(item.Service_id);
              }
            } else {
              let intersection = item.Parent_container_id.filter(
                (x) => !_ScheduledDP.includes(x)
              );
              let add = _ScheduledDP.length + intersection.length;

              if (deepStreamLimit < add) {
                item.disableScheduleCheckbox = true;
                _disabledSchedule.push(item.Service_id);
              }
            }
          } else {
            console.log("GREATER THAN DS");
            _disabledSchedule.push(item.Service_id);
            item.disableScheduleCheckbox = true;
            item.disableUnscheduleCheckbox = true;
          }
        });
      }
    }
    this.setState({ data: _data, disabledSchedule: _disabledSchedule });
  };
  alwaysDisabled = () => {
    let _data = [...this.state.data];
    let _disabledSchedule = [...this.state.disabledSchedule];
    this.parentLoop(_data, (ele) => {
      if (_disabledSchedule.includes(ele.Service_id)) {
        console.log(ele.Service_name);
        ele.disableScheduleCheckbox = true;
      }
    });
    this.setState({ data: _data });
  };
  handleScheduleUncheck2 = (index, item) => {
    // reusable function to uncheck Schedule
    let data = [...this.state.data];
    data[index].scheduleChecked = false;
    let selected = data[index].Service_id;
    let arr = [...this.state.scheduleChecked];
    let result = arr.filter((item) => item !== selected);

    this.setState(
      { data, scheduleChecked: result },
      () => this.toggleSchduleUsecase2()
      // console.log("object")
    );
  };

  toggleSchduleUsecase2 = () => {
    console.log("toggleSchduleUsecase2");
    let data = [...this.state.data];
    let scheduleChecked = [...this.state.scheduleChecked];

    //to toggle usecase if user uncheck schedule
    if (this.state.scheduleChecked.length === 0) {
      console.log("DEFAULT STATE");
      this.parentLoop(data, (ele) => {
        if (ele.Parent_container_id.length <= deepStreamLimit) {
          ele.disableScheduleCheckbox = false;
        }
      });
      this.setState({ selectedDS: [...this.state.ScheduledDP] }, () =>
        this.alwaysDisabled()
      );
    } else {
      console.log("toggleSchduleUsecase ELSE");
      let arr = [...this.state.ScheduledDP];

      this.parentLoop(scheduleChecked, (ele) => {
        this.parentLoop(data, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id);
            arr = [...new Set(arr)];
          }
        });
      });
      // arr = [...this.state.ScheduledDP];
      console.log(arr);
      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = data.filter(
          (item) => item.Parent_container_id.length <= deepStreamLimit
        );
        this.parentLoop(filterData, (element) => {
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
          } else {
            this.resultIntersection(element, "schedule", arr, (obj) => {
              element = { ...obj };
            });
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(data, (element) => {
          if (element.Parent_container_id.length <= deepStreamLimit) {
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
      this.setState({ selectedDS: arr, data }, () => this.alwaysDisabled());
    }
  };

  onScheduleClickHandle2 = (item, index) => {
    let parentContainerArr = item.Parent_container_id;
    let selectedDS = [...this.state.selectedDS];
    const isChecked = this.state.scheduleChecked.some(
      (itemm) => itemm === item.Service_id
    );
    //if else condition to check and uncheck scheduled usecase
    if (isChecked) {
      //if unchecked
      this.handleScheduleUncheck2(index, item);
    } else {
      // if checked
      if (!selectedDS.length) {
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

  disableUsecaseDSLimitReached = (indexx) => {
    // disable use case if deepstream limit reached
    if (this.state.selectedDS.length === deepStreamLimit) {
      if (this.state.scheduleChecked.length >= usecaseLimit) {
        console.log("disableUsecaseDSLimitReached IF");
        let data = [...this.state.data];

        this.parentLoop(data, (items) => {
          this.parentLoop(items.Parent_container_id, (item2) => {
            if (!this.state.selectedDS.some((item) => item === item2)) {
              items.disableScheduleCheckbox = true;
            }
          });
        });
        this.setState({ data });
      } else {
        console.log("disableUsecaseDSLimitReached ELSE");
        this.handleScheduleCheck(indexx);
      }
    } else {
      this.handleScheduleCheck(indexx);
      console.log("disableUsecaseDSLimitReached ELSE");
    }
  };

  handleGlobalScheduleDisable2 = () => {
    console.log("Checking use case limit");
    let scheduleChecked = [...this.state.scheduleChecked];
    let data = [...this.state.data];

    if (scheduleChecked.length === usecaseLimit) {
      console.log("Usecase limit reached");

      this.parentLoop(data, (items) => {
        if (!scheduleChecked.some((item) => item === items.Service_id)) {
          items.disableScheduleCheckbox = true;
        }
      });

      this.setState({ data });
    } else if (this.state.selectedDS.length === deepStreamLimit) {
      console.log("Deepstream limit reached");
      this.parentLoop(data, (items) => {
        this.parentLoop(items.Parent_container_id, (item2) => {
          if (!this.state.selectedDS.includes(item2)) {
            items.disableScheduleCheckbox = true;
          }
        });
      });
      this.setState({ data });
    } else {
      console.log("handleGlobalScheduleDisable ELSE");
      this.parentLoop(data, (items) => {
        if (this.state.selectedDS.length > 1) {
          console.log("selectedDS length is greater than 1");
          if (
            items.Parent_container_id.length <= this.state.selectedDS.length
          ) {
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
              let add = this.state.selectedDS.length + intersection.length;

              if (deepStreamLimit < add) {
                items.disableScheduleCheckbox = true;
              }
              // if (intersection.length) items.disableScheduleCheckbox = true;
            } else {
              let intersection = items.Parent_container_id.filter(
                (x) => !this.state.selectedDS.includes(x)
              );
              // console.log("items.ser else" + items.Service_name);
              let add = this.state.selectedDS.length + intersection.length;

              if (deepStreamLimit < add) {
                items.disableScheduleCheckbox = true;
              }
            }
          }
        } else {
          // selectedDS length is 1
          if (items.Parent_container_id.length > 1) {
            console.log("selectedDS length is 1: " + items.Service_name);
            let result = [];

            this.parentLoop(this.state.selectedDS, (ele) => {
              this.parentLoop(items.Parent_container_id, (item2) => {
                if (ele === item2) result.push(true);
                else result.push(false);
              });
            });

            if (!result.includes(true)) {
              if (items.Parent_container_id.length < deepStreamLimit) {
              } else {
                let intersection = items.Parent_container_id.filter(
                  (x) => !this.state.selectedDS.includes(x)
                );
                if (intersection.length) items.disableScheduleCheckbox = true;
              }
            } else {
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

  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <div>
        {console.log(this.state)}
        Add
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {this.state.ScheduledDP.length === 0 &&
          this.state.UnScheduledDP.length === 0
            ? this.state.data.map((item, index) => {
                return (
                  <div>
                    {item.Service_name}
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        id="scheduled"
                        name="scheduled"
                        value={item.Service_name}
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
                        value={item.Service_name}
                        checked={item.unScheduleChecked}
                        disabled={item.disableUnscheduleCheckbox}
                        onChange={(e) =>
                          this.onUnscheduleClickHandle(e, item, index)
                        }
                      />
                      UnScheduled
                    </label>
                    <pre>
                      {JSON.stringify(item.Parent_container_id, null, 4)}
                    </pre>
                  </div>
                );
              })
            : this.state.data.map((item, index) => (
                <div>
                  {item.Service_name}
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      id="scheduled"
                      value={item.Service_name}
                      onChange={(e) => this.onScheduleClickHandle2(item, index)}
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
        <p>Selected Schedule</p>
        <pre>{JSON.stringify(this.state.scheduleChecked, null, 4)}</pre>
        <p>Selected DP</p>
        <pre>{JSON.stringify(this.state.selectedDS, null, 4)}</pre>
        <p>Deepstream limit</p>
        <pre>{JSON.stringify(deepStreamLimit, null, 4)}</pre>
        <p>Usecase limit</p>
        <pre>{JSON.stringify(usecaseLimit, null, 4)}</pre>
      </div>
    );
  }
}

export default Add;
