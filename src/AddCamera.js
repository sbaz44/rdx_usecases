import React, { Children, Component } from "react";
import logo from "./logo.svg";
import limits from "./limits.json";
import servicess from "./services.json";
const Services = servicess["Services"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];
export default class AddCamera extends Component {
  state = {
    time: [
      "0-2",
      "2-4",
      "4-6",
      "6-8",
      "8-10",
      "10-12",
      "12-14",
      "14-16",
      "16-18",
      "18-20",
      "20-22",
      "22-0",
    ],
    mouseState: false,
    arr: [],
    isCamerPresent: false,
    Service: Services,
    // selectedTimeSlot: ["0-2", "2-4", "4-6", "6-8"],
    selectedTimeSlot: [],
    staticDS: [],
    staticUC: [],
    staticDependent: [],
    data: [
      {
        slot: "0-2",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "2-4",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "4-6",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "6-8",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "8-10",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "10-12",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "12-14",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "14-16",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "16-18",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "18-20",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "20-22",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "22-0",
        Usecases: [],
        AI: [],
        isDisabled: true,
        disabledService: [],
        Dependent: [],
      },
    ],
    apiData: {
      // "0-2": {
      //   global: {
      //     Cameras: [],
      //     Usecases: [],
      //     Dependent: [],
      //     AI: [],
      //   },
      //   local: {},
      // },
      // "2-4": {
      //   global: {
      //     Cameras: [],
      //     Usecases: [],
      //     Dependent: [],
      //     AI: [],
      //   },
      //   local: {},
      // },
      "0-2": {
        global: {
          Cameras: ["1"],
          Usecases: [
            // "LOITV1",
            "LOITV1ANA",
            "TRESV1",
            "MASKV1",
          ],
          Dependent: ["LOITV1"],
          AI: ["person", "fmgh"],
        },
        local: {
          1: {
            Usecases: ["LOITV1", "LOITV1ANA", "TRESV1", "MASKV1"],
            Dependent: ["LOITV1"],
            AI: ["person", "fmgh"],
          },
          // 2: {
          //   Usecases: ["LOITV1"],
          //   Dependent: [],
          //   AI: ["person"],
          // },
        },
      },
      "2-4": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
      // "2-4": {
      //   global: {
      //     Cameras: ["2", "3"],
      //     Usecases: ["LOITVANALYTICS", "LOITV1"],
      //     Dependent: ["LOITV1"],
      //     AI: ["person"],
      //   },
      //   local: {
      //     2: {
      //       Usecases: ["LOITVANALYTICS", "LOITV1"],
      //       Dependent: ["LOITV1"],
      //       AI: ["person"],
      //     },
      //     3: {
      //       Usecases: ["LOITVANALYTICS", "LOITV1"],
      //       Dependent: ["LOITV1"],
      //       AI: ["person"],
      //     },
      //   },
      // },
      "4-6": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
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
      "22-0": {
        global: {
          Cameras: [],
          Usecases: [],
          Dependent: [],
          AI: [],
        },
        local: {},
      },
    },
    activeUsecases: [],
    activeDS: [],
    activeDependent: [],
  };

  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };
  toggleUsecase = (service_id, type) => {
    let _data = [...this.state.data];
    if (type === "push") {
      this.parentLoop(_data, (ele) => {
        ele.disabledService.push(service_id);
        ele.disabledService = [...new Set(ele.disabledService)];
      });
    } else {
      this.parentLoop(_data, (ele) => {
        if (ele.disabledService.includes(service_id)) {
          var filterArr = ele.disabledService.filter(
            (item) => item != service_id
          );
          ele.disabledService = [...filterArr];
          // var index = ele.disabledService.indexOf(service_id);
          // ele.disabledService.splice(index, 1);
        }
        // else ele.Usecases.push(service_id);
      });
    }
    this.setState({ data: _data });
  };

  timeslotMouseDown = (i) => {
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    let _activeUsecases = [...this.state.activeUsecases];

    if (_selectedTimeSlot.includes(i)) {
      var index = _selectedTimeSlot.indexOf(i);
      _selectedTimeSlot.splice(index, 1);
      this.parentLoop(_data, (ele) => {
        if (ele.slot === i) {
          ele.isDisabled = true;
          ele.Usecases = [];
        }
      });
    } else {
      _selectedTimeSlot.push(i);
      this.parentLoop(_data, (ele) => {
        if (ele.slot === i) {
          ele.isDisabled = false;
        }
      });
    }

    this.setState(
      {
        selectedTimeSlot: _selectedTimeSlot,
        data: _data,
        mouseState: true,
      },
      () => console.log(this.state)
    );
  };
  submitTime = () => {
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    const intersection = _data.filter((element) => {
      if (_selectedTimeSlot.includes(element.slot)) {
        element.isDisabled = false;
      } else element.isDisabled = true;
      return element;
    });
    this.setState({ data: intersection });
  };
  resetTime = () => {
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    for (let ele of _data) {
      ele.isDisabled = false;
    }
    this.setState({ data: _data });
  };

  _DSLimitReached = (data_item, service_item) => {
    console.log("DISABLING USING DS");
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];

    this.parentLoop(_Service, (ele) => {
      let result = [];
      if (ele.Parent_container_id.AI.length <= deepStreamLimit) {
        this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
          this.parentLoop(_activeDS, (ele3) => {
            if (ele3 === ele2) result.push(true);
            else result.push(false);
          });
        });
        if (!result.includes(true)) {
          this.parentLoop(_data, (data_ele) => {
            data_ele.disabledService.push(ele.Service_id);
          });
        } else {
          const intersection = ele.Parent_container_id.AI.filter(
            (value) => !_activeDS.includes(value)
          );
          // let arr = [..._activeDS];
          // console.log(arr);
          // console.log(intersection);
          // Array.prototype.push.apply(arr, intersection);
          // arr = [...new Set(arr)];
          // console.log(arr);
          // console.log(ele.Service_id);
          let add = _activeDS.length + intersection.length;
          if (deepStreamLimit < add) {
            console.log("disabled DS: " + ele.Service_id);
            this.parentLoop(_data, (data_ele) => {
              data_ele.disabledService.push(ele.Service_id);
              data_ele.disabledService = [...new Set(data_ele.disabledService)];
            });
          } else {
            // console.log(_data);
            this.parentLoop(_data, (data_ele) => {
              if (data_ele.disabledService.includes(ele.Service_id)) {
                var index = data_ele.disabledService.indexOf(ele.Service_id);
                data_ele.disabledService.splice(index, 1);
              }
              // else ele.Usecases.push(service_id);
            });
          }
        }
      }
    });
    this.setState({ data: _data });
  };

  _DSLimitReached2 = (data_item, service_item) => {
    console.log("DISABLING USING DS");
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];
    let addDS = [...this.state.staticDS];
    Array.prototype.push.apply(addDS, this.state.activeDS);
    addDS = [...new Set(addDS)];
    this.parentLoop(_Service, (ele) => {
      let result = [];
      if (ele.Parent_container_id.AI.length <= deepStreamLimit) {
        console.log(ele.Service_id);
        this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
          this.parentLoop(addDS, (ele3) => {
            if (ele3 === ele2) result.push(true);
            else result.push(false);
          });
        });

        if (!result.includes(true)) {
          console.log("IF");
          this.parentLoop(_data, (data_ele) => {
            data_ele.disabledService.push(ele.Service_id);
          });
        } else {
          console.log("ELSE");
          const intersection = ele.Parent_container_id.AI.filter(
            (value) => !addDS.includes(value)
          );
          let add = addDS.length + intersection.length;
          console.log(deepStreamLimit + "< " + add);
          if (deepStreamLimit < add) {
            console.log("ELSE IF");
            console.log("disabled DS: " + ele.Service_id);
            this.toggleUsecase(ele.Service_id, "push");
          } else {
            // this.toggleUsecase(ele.Service_id, "put");
            console.log("ELSE ELSE");
            console.log("enabled DS: " + ele.Service_id);
            this.onLoadDisableServices();
          }
        }

        // this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
        //   this.parentLoop(addDS, (ele3) => {
        //     if (ele3 === ele2) result.push(true);
        //     else result.push(false);
        //   });
        // });
        // console.log(result, ele.Service_id);
        // if (!result.includes(true)) {
        //   console.log("if");
        //   this.parentLoop(_data, (data_ele) => {
        //     data_ele.disabledService.push(ele.Service_id);
        //   });
        // } else {
        //   console.log("else");
        //   const intersection = ele.Parent_container_id.AI.filter(
        //     (value) => !addDS.includes(value)
        //   );
        //   let arr = [...addDS];
        //   Array.prototype.push.apply(arr, intersection);
        //   arr = [...new Set(arr)];
        //   // console.log(intersection);
        //   // console.log(arr);
        //   console.log(arr);
        //   let add = addDS.length + intersection.length;
        //   console.log(deepStreamLimit + "< " + add);
        //   if (deepStreamLimit < add) {
        //     console.log("IF");
        //     console.log("disabled DS: " + ele.Service_id);
        //     this.parentLoop(_data, (data_ele) => {
        //       data_ele.disabledService.push(ele.Service_id);
        //       data_ele.disabledService = [...new Set(data_ele.disabledService)];
        //     });
        //   } else {
        //     console.log("ELSE");
        //     this.parentLoop(_data, (data_ele) => {
        //       if (data_ele.disabledService.includes(ele.Service_id)) {
        //         var index = data_ele.disabledService.indexOf(ele.Service_id);
        //         data_ele.disabledService.splice(index, 1);
        //       }
        //       // else ele.Usecases.push(service_id);
        //     });
        //   }
        // }
      }
    });
    // this.setState({ data: _data });
  };

  _UCLimitReached = () => {
    console.log("_UCLimitReached");
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _activeUsecases = [...this.state.activeUsecases];
    let _data = [...this.state.data];
    this.parentLoop(_Service, (ele) => {
      if (!_activeUsecases.includes(ele.Service_id)) {
        this.parentLoop(_data, (data_ele) => {
          data_ele.disabledService.push(ele.Service_id);
        });
      }
    });
  };

  _UCLimitReached2 = () => {
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _activeUsecases = [...this.state.activeUsecases];

    let addUC = [...this.state.staticUC];
    Array.prototype.push.apply(addUC, this.state.activeUsecases);
    Array.prototype.push.apply(addUC, this.state.activeDependent);
    Array.prototype.push.apply(addUC, this.state.staticDependent);
    addUC = [...new Set(addUC)];
    console.log(addUC);
    let _data = [...this.state.data];
    this.parentLoop(_Service, (ele) => {
      if (!addUC.includes(ele.Service_id)) {
        this.parentLoop(_data, (data_ele) => {
          data_ele.disabledService.push(ele.Service_id);
        });
      }
    });
  };

  _unchecked = (service_item) => {
    console.log("_unchecked");
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _activeUsecases = [...this.state.activeUsecases];
    let _activeDependent = [...this.state.activeDependent];
    if (!_activeDS.length) {
      console.log("DEFAULT STATE");
      this.parentLoop(_Service, (item) => {
        if (item.Parent_container_id.AI.length > deepStreamLimit) {
          this.parentLoop(_data, (ele) => {
            ele.disabledService.push(item.Service_id);
          });
        } else {
          this.parentLoop(_data, (ele) => {
            ele.disabledService = [];
            ele.Dependent = [];
          });
        }
      });
    } else {
      console.log("_unchecked ELSE");

      let arr = [];
      this.parentLoop(_activeUsecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            arr = [...new Set(arr)];
          }
        });
      });
      console.log(arr);
      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = _Service.filter(
          (item) => item.Parent_container_id.AI.length <= deepStreamLimit
        );
        console.log(filterData);
        this.parentLoop(filterData, (element) => {
          let result = [];
          this.parentLoop(arr, (ele) => {
            this.parentLoop(element.Parent_container_id.AI, (ele2) => {
              if (ele === ele2) result.push(true);
              else result.push(false);
            });
          });

          if (result.includes(true)) {
            let intersection = element.Parent_container_id.AI.filter(
              (x) => !_activeDS.includes(x)
            );
            console.log(intersection);
            let add = _activeDS.length + intersection.length;
            if (deepStreamLimit < add) {
              console.log("disable4: " + element.Service_id);
              this.toggleUsecase(element.Service_id, "push");
            } else {
              console.log("enable4: " + element.Service_id);
              this.toggleUsecase(element.Service_id, "put");
            }
          } else {
            let intersection = element.Parent_container_id.AI.filter(
              (x) => !_activeDS.includes(x)
            );
            console.log(intersection);
            let add = _activeDS.length + intersection.length;
            console.log(add);
            if (deepStreamLimit < add) {
              console.log("disable5: " + element.Service_id);
              this.toggleUsecase(element.Service_id, "push");
            } else {
              console.log("enable5: " + element.Service_id);
              this.toggleUsecase(element.Service_id, "put");
            }
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(_Service, (element) => {
          if (element.Parent_container_id.AI.length <= deepStreamLimit) {
            if (element.Parent_container_id.AI.length === 1) {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id.AI, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });

              if (result.includes(true)) {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  console.log("disable: " + element.Service_id);
                  this.toggleUsecase(element.Service_id, "push");
                } else {
                  console.log("enable: " + element.Service_id);
                  this.toggleUsecase(element.Service_id, "put");
                }
              } else {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  console.log("disable1: " + element.Service_id);
                  this.toggleUsecase(element.Service_id, "push");
                } else {
                  console.log("enable1: " + element.Service_id);
                  this.toggleUsecase(element.Service_id, "put");
                  // this.toggleUsecase(element.Service_id);
                }
              }
            } else {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id.AI, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });

              if (result.includes(true)) {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  this.toggleUsecase(element.Service_id, "push");
                  console.log("disable2: " + element.Service_id);
                } else {
                  this.toggleUsecase(element.Service_id, "put");
                  console.log("enable2: " + element.Service_id);
                }
              } else {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  this.toggleUsecase(element.Service_id, "push");
                  console.log("disable3: " + element.Service_id);
                } else {
                  console.log("enable3: " + element.Service_id);
                }
              }
            }
          }
        });
      }
    }
  };

  _unchecked2 = (service_item) => {
    console.log("_unchecked2");
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];
    let _activeUsecases = [...this.state.activeUsecases];
    let _activeDependent = [...this.state.activeDependent];
    let addUC = [...this.state.staticUC];
    let addDS = [...this.state.staticDS];
    Array.prototype.push.apply(addUC, this.state.activeUsecases);
    Array.prototype.push.apply(addUC, this.state.activeDependent);
    Array.prototype.push.apply(addDS, this.state.activeDS);
    addUC = [...new Set(addUC)];
    addDS = [...new Set(addDS)];
    console.log(addDS);
    if (!_activeDS.length) {
      console.log("DEFAULT STATE");
      this.onLoadDisableServices();
    } else {
      console.log("_unchecked2 ELSE");

      let arr = [];
      this.parentLoop(_activeUsecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            arr = [...new Set(arr)];
          }
        });
      });
      console.log(arr);
      if (arr.length > 1) {
        console.log("ARR > 1");
        let filterData = _Service.filter(
          (item) => item.Parent_container_id.AI.length <= deepStreamLimit
        );
        this.parentLoop(filterData, (element) => {
          let result = [];
          this.parentLoop(addDS, (ele) => {
            this.parentLoop(element.Parent_container_id.AI, (ele2) => {
              if (ele === ele2) result.push(true);
              else result.push(false);
            });
          });
          console.log(result);
          if (result.includes(true)) {
            if (element.Category === "Analytics") {
              console.log("calling analytics");
              this.toggleAnalytics2(element);
            } else {
              let intersection = element.Parent_container_id.AI.filter(
                (x) => !addDS.includes(x)
              );
              let add = addDS.length + intersection.length;
              if (deepStreamLimit < add) {
                console.log("disable4: " + element.Service_id);
                this.toggleUsecase(element.Service_id, "push");
              } else {
                console.log("enable4: " + element.Service_id);
                this.toggleUsecase(element.Service_id, "put");
                // this.toggleUsecase(element.Service_id);
              }
            }

            // let intersection = element.Parent_container_id.AI.filter(
            //   (x) => !addDS.includes(x)
            // );
            // console.log(intersection);
            // let add = addDS.length + intersection.length;
            // if (deepStreamLimit < add) {
            //   console.log("disable4: " + element.Service_id);
            //   this.toggleUsecase(element.Service_id, "push");
            // } else {
            //   console.log("enable4: " + element.Service_id);
            //   this.toggleUsecase(element.Service_id, "put");
            // }
          } else {
            if (element.Category === "Analytics") {
              this.toggleAnalytics2(element);
            } else {
              let intersection = element.Parent_container_id.AI.filter(
                (x) => !addDS.includes(x)
              );
              let add = addDS.length + intersection.length;
              if (deepStreamLimit < add) {
                console.log("disable1: " + element.Service_id);
                this.toggleUsecase(element.Service_id, "push");
              } else {
                console.log("enable1: " + element.Service_id);
                this.toggleUsecase(element.Service_id, "put");
                // this.toggleUsecase(element.Service_id);
              }
            }
            // let intersection = element.Parent_container_id.AI.filter(
            //   (x) => !addDS.includes(x)
            // );
            // console.log(intersection);
            // let add = addDS.length + intersection.length;
            // console.log(add);
            // if (deepStreamLimit < add) {
            //   console.log("disable5: " + element.Service_id);
            //   this.toggleUsecase(element.Service_id, "push");
            // } else {
            //   console.log("enable5: " + element.Service_id);
            //   this.toggleUsecase(element.Service_id, "put");
            // }
          }
        });
      } else {
        console.log("ARR === 1");
        this.parentLoop(_Service, (element) => {
          if (element.Parent_container_id.AI.length <= deepStreamLimit) {
            if (element.Parent_container_id.AI.length === 1) {
              let result = [];
              this.parentLoop(addDS, (ele) => {
                this.parentLoop(element.Parent_container_id.AI, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });
              console.log(result);
              if (result.includes(true)) {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !addDS.includes(x)
                );
                let add = addDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  console.log("disable: " + element.Service_id);
                  this.toggleUsecase(element.Service_id, "push");
                } else {
                  console.log("enable: " + element.Service_id);
                  this.toggleUsecase(element.Service_id, "put");
                }
              } else {
                if (element.Category === "Analytics") {
                  this.toggleAnalytics2(element);
                } else {
                  let intersection = element.Parent_container_id.AI.filter(
                    (x) => !addDS.includes(x)
                  );
                  let add = addDS.length + intersection.length;
                  if (deepStreamLimit < add) {
                    console.log("disable1: " + element.Service_id);
                    this.toggleUsecase(element.Service_id, "push");
                  } else {
                    console.log("enable1: " + element.Service_id);
                    this.toggleUsecase(element.Service_id, "put");
                    // this.toggleUsecase(element.Service_id);
                  }
                }
              }
            } else {
              let result = [];
              this.parentLoop(arr, (ele) => {
                this.parentLoop(element.Parent_container_id.AI, (ele2) => {
                  if (ele === ele2) result.push(true);
                  else result.push(false);
                });
              });

              if (result.includes(true)) {
                let intersection = element.Parent_container_id.AI.filter(
                  (x) => !addDS.includes(x)
                );
                let add = addDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  this.toggleUsecase(element.Service_id, "push");
                  console.log("disable2: " + element.Service_id);
                } else {
                  this.toggleUsecase(element.Service_id, "put");
                  console.log("enable2: " + element.Service_id);
                }
              } else {
                if (element.Category === "Analytics") {
                  this.toggleAnalytics2(element);
                } else {
                  let intersection = element.Parent_container_id.AI.filter(
                    (x) => !addDS.includes(x)
                  );
                  let add = addDS.length + intersection.length;
                  if (deepStreamLimit < add) {
                    console.log("disable3: " + element.Service_id);
                    this.toggleUsecase(element.Service_id, "push");
                  } else {
                    console.log("enable3: " + element.Service_id);
                    this.toggleUsecase(element.Service_id, "put");
                    // this.toggleUsecase(element.Service_id);
                  }
                }
              }
            }
          }
        });
      }
    }
  };

  DisableServices = (data_item, service_item) => {
    console.log(this.state);
    let addArr = [...this.state.activeUsecases];
    Array.prototype.push.apply(addArr, this.state.activeDependent);
    addArr = [...new Set(addArr)];

    if (usecaseLimit === addArr.length) {
      console.log("Usecase limit reached");
      this._UCLimitReached();
      // } else if (this.isDSPresentInState(data_item, service_item)) {
    } else if (this.state.activeDS.length === deepStreamLimit) {
      console.log("DS limit reached");
      this._DSLimitReached(data_item, service_item);
    } else {
      console.log("DisableServices ELSE");
      this._unchecked(service_item);
    }
  };

  _DisableService2 = (data_item, service_item) => {
    console.log(this.state);
    let addUC = [...this.state.staticUC];
    let addDS = [...this.state.staticDS];
    Array.prototype.push.apply(addUC, this.state.activeUsecases);
    Array.prototype.push.apply(addUC, this.state.activeDependent);
    Array.prototype.push.apply(addUC, this.state.staticDependent);
    Array.prototype.push.apply(addDS, this.state.activeDS);
    addUC = [...new Set(addUC)];
    addDS = [...new Set(addDS)];
    console.log(addUC);
    console.log(addDS);
    console.log(usecaseLimit + " ===" + addUC.length);
    console.log(deepStreamLimit + " ===" + addDS.length);
    if (usecaseLimit === addUC.length) {
      console.log("Usecase limit reached");
      this._UCLimitReached2();
    } else if (addDS.length === deepStreamLimit) {
      console.log("DS limit reached");
      this._DSLimitReached2();
    } else {
      console.log("DisableServices ELSE");
      this._unchecked2();
    }
  };

  usecaseMouseDown = (item, indexx, service_item) => {
    let _activeUsecases = [...this.state.activeUsecases];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDependent = [...this.state.activeDependent];

    console.log("Type is usecase");
    if (_activeUsecases.includes(service_item.Service_id)) {
      console.log("ELSE IF");
      this.parentLoop(_data, (ele) => {
        if (ele.slot === item.slot) {
          if (ele.Usecases.includes(service_item.Service_id)) {
            var index = ele.Usecases.indexOf(service_item.Service_id);
            ele.Usecases.splice(index, 1);
          } else ele.Usecases.push(service_item.Service_id);
        }
      });

      let isUCPresent = 0;
      this.parentLoop(_data, (ele) => {
        //removing UC condition
        if (ele.Usecases.includes(service_item.Service_id)) {
          isUCPresent += 1;
        }
      });
      //removing UC
      if (isUCPresent === 0) {
        console.log("removing: " + service_item.Service_id);
        var index = _activeUsecases.indexOf(service_item.Service_id);
        _activeUsecases.splice(index, 1);
        isUCPresent = 1;
      }

      //removing DS
      let arr = [];
      // _activeDS = [...arr];
      this.parentLoop(_activeUsecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            arr = [...new Set(arr)];
          }
        });
      });
      _activeDS = [...arr];

      //removing dependent
      if (service_item.Category === "Analytics") {
        let arr2 = [];
        this.parentLoop(_activeUsecases, (ele) => {
          this.parentLoop(_Service, (ele2) => {
            if (ele2.Category === "Analytics") {
              if (ele2.Service_id === ele) {
                Array.prototype.push.apply(
                  arr2,
                  ele2.Parent_container_id.Usecase
                );
                // arr2 = [...new Set(arr2)];
              }
            }
          });
        });
        _activeDependent = [...arr2];
      }
    } else {
      console.log("ELSE");
      Array.prototype.push.apply(
        _activeDS,
        service_item.Parent_container_id.AI
      );
      _activeDS = [...new Set(_activeDS)];
      _activeUsecases.push(service_item.Service_id);
      if (service_item.Category === "Analytics") {
        Array.prototype.push.apply(
          _activeDependent,
          service_item.Parent_container_id.Usecase
        );
      }
      this.parentLoop(_data, (ele) => {
        if (ele.slot === item.slot) {
          if (ele.Usecases.includes(service_item.Service_id)) {
            var index = ele.Usecases.indexOf(service_item.Service_id);
            ele.Usecases.splice(index, 1);
          } else {
            ele.Usecases.push(service_item.Service_id);
          }
          if (service_item.Category === "Analytics") {
            Array.prototype.push.apply(
              ele.Dependent,
              _Service[indexx].Parent_container_id.Usecase
            );
          }
        }
      });
    }

    this.setState(
      {
        mouseState: true,
        data: _data,
        activeUsecases: _activeUsecases,
        activeDS: _activeDS,
        activeDependent: _activeDependent,
      },
      () => this.DisableServices(item, service_item)
    );
  };

  disableUsecaseDSLimitReached = (item, service_item) => {
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.activeDS];

    // disable use case if deepstream limit reached
    if (this.state.activeDS.length === deepStreamLimit) {
      if (this.state.activeUsecases.length >= usecaseLimit) {
        console.log("disableUsecaseDSLimitReached IF");
        let _Service = [...this.state.Service];

        // this.parentLoop(_Service, (items) => {
        //   this.parentLoop(items.Parent_container_id, (item2) => {
        //     if (!this.state.selectedDS.some((item) => item === item2)) {
        //       items.disableScheduleCheckbox = true;
        //     }
        //   });
        // });

        this.parentLoop(_Service, (ele) => {
          let result = [];
          if (ele.Parent_container_id.AI.length <= deepStreamLimit) {
            this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
              this.parentLoop(_activeDS, (ele3) => {
                if (ele3 === ele2) {
                  console.log(_Service.Service_id);
                }
              });
            });
            // if (!result.includes(true)) {
            //   this.parentLoop(_data, (data_ele) => {
            //     data_ele.disabledService.push(ele.Service_id);
            //   });
            // } else {
            //   const intersection = ele.Parent_container_id.AI.filter(
            //     (value) => !_activeDS.includes(value)
            //   );

            //   let add = _activeDS.length + intersection.length;
            //   if (deepStreamLimit < add) {
            //     console.log("disabled DS: " + ele.Service_id);
            //     this.parentLoop(_data, (data_ele) => {
            //       data_ele.disabledService.push(ele.Service_id);
            //       data_ele.disabledService = [...new Set(data_ele.disabledService)];
            //     });
            //   } else {
            //     this.parentLoop(_data, (data_ele) => {
            //       if (data_ele.disabledService.includes(ele.Service_id)) {
            //         var index = data_ele.disabledService.indexOf(ele.Service_id);
            //         data_ele.disabledService.splice(index, 1);
            //       }
            //     });
            //   }
            // }
          }
        });

        // this.parentLoop(_Service, (ele) => {
        //   let result = [];
        //   if (ele.Parent_container_id.AI.length <= deepStreamLimit) {
        //     this.parentLoop(ele.Parent_container_id.AI, (ele2) => {
        //       this.parentLoop(_activeDS, (ele3) => {
        //         if (ele3 === ele2) result.push(true);
        //         else result.push(false);
        //       });
        //     });
        //     if (!result.includes(true)) {
        //       this.parentLoop(_data, (data_ele) => {
        //         data_ele.disabledService.push(ele.Service_id);
        //       });
        //     } else {
        //       const intersection = ele.Parent_container_id.AI.filter(
        //         (value) => !_activeDS.includes(value)
        //       );

        //       let add = _activeDS.length + intersection.length;
        //       if (deepStreamLimit < add) {
        //         console.log("disabled DS: " + ele.Service_id);
        //         this.parentLoop(_data, (data_ele) => {
        //           data_ele.disabledService.push(ele.Service_id);
        //           data_ele.disabledService = [...new Set(data_ele.disabledService)];
        //         });
        //       } else {
        //         // console.log(_data);
        //         this.parentLoop(_data, (data_ele) => {
        //           if (data_ele.disabledService.includes(ele.Service_id)) {
        //             var index = data_ele.disabledService.indexOf(ele.Service_id);
        //             data_ele.disabledService.splice(index, 1);
        //           }
        //           // else ele.Usecases.push(service_id);
        //         });
        //       }
        //     }
        //   }
        // });

        // this.setState({ data:_data });
      } else {
        // this.handleScheduleCheck(indexx);
      }
    } else {
      // this.handleScheduleCheck(indexx);
      // console.log("disableUsecaseDSLimitReached ELSE");
    }
  };

  // usecaseMouseDown2 = (item, indexx, service_item) => {
  //   console.log("usecaseMouseDown2");
  //   let _activeUsecases = [...this.state.activeUsecases];
  //   let _staticUC = [...this.state.staticUC];
  //   let _staticDS = [...this.state.staticDS];
  //   let _activeDS = [...this.state.activeDS];
  //   let _data = [...this.state.data];
  //   let _Service = [...this.state.Service];
  //   let _activeDependent = [...this.state.activeDependent];

  //   let addUC = [...this.state.staticUC];
  //   Array.prototype.push.apply(addUC, this.state.activeUsecases);
  //   Array.prototype.push.apply(addUC, this.state.activeDependent);
  //   Array.prototype.push.apply(addUC, this.state.staticDependent);
  //   addUC = [...new Set(addUC)];
  //   console.log(service_item.Service_id);
  //   const isChecked = _activeUsecases.includes(item.Service_id);
  //   console.log(isChecked);
  //   if (isChecked) {
  //     console.log("IF");
  //   } else {
  //     console.log("ELSE");
  //     console.log(_activeDS);
  //     if (!_activeDS.length) {
  //       console.log("IF");
  //       // this.setState({ selectedDS: parentContainerArr }, () => {
  //       //   this.disableUsecaseDSLimitReached(index);
  //       // });
  //     } else {
  //       console.log("ELSE");
  //       this.parentLoop(service_item.Parent_container_id.AI, (ele) => {
  //         if (!_activeDS.some((item) => item === ele)) {
  //           _activeDS.push(ele);
  //         }
  //       });
  //       console.log(_activeDS);
  //     }
  //   }
  //   this.setState(
  //     {
  //       mouseState: true,
  //       data: _data,
  //       activeUsecases: _activeUsecases,
  //       activeDS: _activeDS,
  //       activeDependent: _activeDependent,
  //     },

  //     () => this.disableUsecaseDSLimitReached(item, service_item)
  //   );
  //   // if (addUC.includes(service_item.Service_id)) {
  //   //   console.log("IF");
  //   //   this.parentLoop(_data, (ele) => {
  //   //     if (ele.slot === item.slot) {
  //   //       if (ele.Usecases.includes(service_item.Service_id)) {
  //   //         var index = ele.Usecases.indexOf(service_item.Service_id);
  //   //         ele.Usecases.splice(index, 1);
  //   //       } else {
  //   //         ele.Usecases.push(service_item.Service_id);
  //   //       }
  //   //     }
  //   //   });

  //   //   let isUCPresent = 0;
  //   //   this.parentLoop(_data, (ele) => {
  //   //     //removing UC condition
  //   //     if (ele.Usecases.includes(service_item.Service_id)) {
  //   //       isUCPresent += 1;
  //   //     }
  //   //   });
  //   //   //removing UC
  //   //   if (isUCPresent === 0) {
  //   //     console.log("removing: " + service_item.Service_id);
  //   //     var index = _activeUsecases.indexOf(service_item.Service_id);
  //   //     _activeUsecases.splice(index, 1);
  //   //     isUCPresent = 1;
  //   //   }

  //   //   //removing DS
  //   //   let arr = [];
  //   //   // _activeDS = [...arr];
  //   //   this.parentLoop(_activeUsecases, (ele) => {
  //   //     this.parentLoop(_Service, (ele2) => {
  //   //       if (ele2.Service_id === ele) {
  //   //         Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
  //   //         arr = [...new Set(arr)];
  //   //       }
  //   //     });
  //   //   });
  //   //   _activeDS = [...arr];

  //   //   //removing dependent
  //   //   if (service_item.Category === "Analytics") {
  //   //     console.log("Analytics");
  //   //     let arr2 = [];
  //   //     this.parentLoop(_activeUsecases, (ele) => {
  //   //       this.parentLoop(_Service, (ele2) => {
  //   //         if (ele2.Category === "Analytics") {
  //   //           if (ele2.Service_id === ele) {
  //   //             Array.prototype.push.apply(
  //   //               arr2,
  //   //               ele2.Parent_container_id.Usecase
  //   //             );
  //   //             // arr2 = [...new Set(arr2)];
  //   //           }
  //   //         }
  //   //       });
  //   //     });
  //   //     console.log(arr2);
  //   //     _activeDependent = [...arr2];
  //   //   }
  //   // } else {
  //   //   console.log("ELSE");
  //   //   Array.prototype.push.apply(
  //   //     _activeDS,
  //   //     service_item.Parent_container_id.AI
  //   //   );
  //   //   _activeDS = [...new Set(_activeDS)];
  //   //   _activeUsecases.push(service_item.Service_id);
  //   //   if (service_item.Category === "Analytics") {
  //   //     Array.prototype.push.apply(
  //   //       _activeDependent,
  //   //       service_item.Parent_container_id.Usecase
  //   //     );
  //   //   }
  //   //   this.parentLoop(_data, (ele) => {
  //   //     if (ele.slot === item.slot) {
  //   //       if (ele.Usecases.includes(service_item.Service_id)) {
  //   //         var index = ele.Usecases.indexOf(service_item.Service_id);
  //   //         ele.Usecases.splice(index, 1);
  //   //       } else {
  //   //         ele.Usecases.push(service_item.Service_id);
  //   //       }
  //   //       if (service_item.Category === "Analytics") {
  //   //         Array.prototype.push.apply(
  //   //           ele.Dependent,
  //   //           _Service[indexx].Parent_container_id.Usecase
  //   //         );
  //   //       }
  //   //     }
  //   //   });
  //   // }
  //   // console.log(_activeUsecases);
  //   // this.setState(
  //   //   {
  //   //     mouseState: true,
  //   //     data: _data,
  //   //     activeUsecases: _activeUsecases,
  //   //     activeDS: _activeDS,
  //   //     activeDependent: _activeDependent,
  //   //   },
  //   //   // () => this.DisableServices(item, service_item)
  //   //   // () => console.log(this.state)
  //   //   () => this._DisableService2(item, service_item)
  //   // );
  // };
  toggleAnalytics = (service_item) => {
    console.log("toggleAnalytics");
    console.log(service_item);
    let _activeUsecases = [...this.state.activeUsecases];
    let _staticUC = [...this.state.staticUC];
    let _staticDS = [...this.state.staticDS];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDependent = [...this.state.activeDependent];
    let addUC = [...this.state.staticUC];
    Array.prototype.push.apply(addUC, this.state.activeUsecases);
    Array.prototype.push.apply(addUC, this.state.activeDependent);
    addUC = [...new Set(addUC)];

    console.log(addUC);
    let arr2 = [];
    this.parentLoop(service_item.Parent_container_id.AI, (ele) => {
      if (!addUC.includes(ele)) {
        this.toggleUsecase(service_item.Service_id, "push");
      }
    });
  };

  toggleAnalytics2 = (service_item) => {
    console.log("toggleAnalytics2");
    console.log(service_item);
    let _activeUsecases = [...this.state.activeUsecases];
    let _staticUC = [...this.state.staticUC];
    let _staticDS = [...this.state.staticDS];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDependent = [...this.state.activeDependent];
    let addUC = [...this.state.staticUC];
    Array.prototype.push.apply(addUC, this.state.activeUsecases);
    Array.prototype.push.apply(addUC, this.state.activeDependent);
    addUC = [...new Set(addUC)];
    let addDS = [...this.state.staticDS];
    Array.prototype.push.apply(addDS, this.state.activeDS);
    addDS = [...new Set(addDS)];

    console.log(addUC);
    console.log(addDS);
    let intersection = service_item.Parent_container_id.AI.filter(
      (x) => !addDS.includes(x)
    );
    console.log(intersection);
    let add = addDS.length + intersection.length;
    if (deepStreamLimit < add) {
      this.toggleUsecase(service_item.Service_id, "push");
    } else {
      console.log("below DS range");
      let UCnDependent = [...service_item.Parent_container_id.Usecase];
      UCnDependent.push(service_item.Service_id);
      console.log(UCnDependent);
      console.log(addUC);
      let UCadd = [...addUC];
      Array.prototype.push.apply(UCadd, UCnDependent);
      console.log(UCadd);
      UCadd = [...new Set(UCadd)];
      // let UCadd = addUC.length + UCnDependent.length;
      console.log(usecaseLimit + "<" + UCadd.length);
      if (usecaseLimit < UCadd.length) {
        this.toggleUsecase(service_item.Service_id, "push");
      } else {
        console.log("false");
        this.toggleUsecase(service_item.Service_id, "put");
      }
    }
    // let arr2 = [];
    // this.parentLoop(service_item.Parent_container_id.AI, (ele) => {
    //   if (!addUC.includes(ele)) {
    //     this.toggleUsecase(service_item.Service_id, "push");
    //   }
    // });
  };

  usecaseMouseDown2 = (item, indexx, service_item) => {
    console.log("usecaseMouseDown2");
    let _activeUsecases = [...this.state.activeUsecases];
    let _staticUC = [...this.state.staticUC];
    let _staticDS = [...this.state.staticDS];
    let _activeDS = [...this.state.activeDS];
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDependent = [...this.state.activeDependent];

    let addUC = [...this.state.staticUC];
    Array.prototype.push.apply(addUC, this.state.activeUsecases);
    Array.prototype.push.apply(addUC, this.state.activeDependent);
    // Array.prototype.push.apply(addUC, this.state.staticDependent);
    addUC = [...new Set(addUC)];
    const isUCPresent = _activeUsecases.includes(service_item.Service_id);
    console.log(isUCPresent);
    console.log(addUC);
    if (isUCPresent) {
      console.log("UC PRESENT");
      this.parentLoop(_data, (ele) => {
        if (ele.slot === item.slot) {
          if (ele.Usecases.includes(service_item.Service_id)) {
            var index = ele.Usecases.indexOf(service_item.Service_id);
            ele.Usecases.splice(index, 1);
          } else ele.Usecases.push(service_item.Service_id);
        }
      });

      let isUCPresent = 0;
      this.parentLoop(_data, (ele) => {
        //removing UC condition
        if (ele.Usecases.includes(service_item.Service_id)) {
          isUCPresent += 1;
        }
      });
      //removing UC
      if (isUCPresent === 0) {
        console.log("removing: " + service_item.Service_id);
        var index = _activeUsecases.indexOf(service_item.Service_id);
        _activeUsecases.splice(index, 1);
        isUCPresent = 1;
      }

      //removing DS
      let arr = [];
      // _activeDS = [...arr];
      this.parentLoop(_activeUsecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            arr = [...new Set(arr)];
          }
        });
      });
      _activeDS = [...arr];

      //removing dependent
      if (service_item.Category === "Analytics") {
        let arr2 = [];
        this.parentLoop(_activeUsecases, (ele) => {
          this.parentLoop(_Service, (ele2) => {
            if (ele2.Category === "Analytics") {
              if (ele2.Service_id === ele) {
                Array.prototype.push.apply(
                  arr2,
                  ele2.Parent_container_id.Usecase
                );
                // arr2 = [...new Set(arr2)];
              }
            }
          });
        });
        _activeDependent = [...arr2];
      }

      console.log(_data);
    } else {
      console.log("ELSE");
      _activeUsecases.push(service_item.Service_id);
      Array.prototype.push.apply(
        _activeDS,
        service_item.Parent_container_id.AI
      );
      _activeDS = [...new Set(_activeDS)];
      if (service_item.Category === "Analytics") {
        Array.prototype.push.apply(
          _activeDependent,
          service_item.Parent_container_id.Usecase
        );
      }
      this.parentLoop(_data, (ele) => {
        if (ele.slot === item.slot) {
          if (ele.Usecases.includes(service_item.Service_id)) {
            var index = ele.Usecases.indexOf(service_item.Service_id);
            ele.Usecases.splice(index, 1);
          } else {
            ele.Usecases.push(service_item.Service_id);
          }

          Array.prototype.push.apply(
            ele.AI,
            service_item.Parent_container_id.AI
          );

          ele.AI = [...new Set(ele.AI)];
          if (service_item.Category === "Analytics") {
            Array.prototype.push.apply(
              ele.Dependent,
              _Service[indexx].Parent_container_id.Usecase
            );
          }
        }
      });
    }

    // if (addUC.includes(service_item.Service_id)) {

    // }

    console.log(_activeUsecases);
    this.setState(
      {
        mouseState: true,
        data: _data,
        activeUsecases: _activeUsecases,
        activeDS: _activeDS,
        activeDependent: _activeDependent,
      },
      // () => this.DisableServices(item, service_item)
      // () => console.log(this.state)
      () => this._DisableService2(item, service_item)
    );
  };

  onLoad = () => {
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _staticDS = [...this.state.staticDS];
    let _staticDependent = [...this.state.staticDependent];
    let staticUC = [...this.state.staticUC];

    let keys = Object.keys(this.state.apiData);
    let cameraLength = 0;
    for (let i = 0; i < keys.length; i++) {
      // console.log(this.state.apiData[keys[i]]);

      if (this.state.apiData[keys[i]].global.Cameras.length) {
        cameraLength += 1;
        Array.prototype.push.apply(
          staticUC,
          this.state.apiData[keys[i]].global.Usecases
        );
        Array.prototype.push.apply(
          _staticDS,
          this.state.apiData[keys[i]].global.AI
        );
        Array.prototype.push.apply(
          _staticDependent,
          this.state.apiData[keys[i]].global.Dependent
        );
      }
    }
    staticUC = [...new Set(staticUC)];
    _staticDS = [...new Set(_staticDS)];
    this.setState(
      {
        staticUC: staticUC,
        staticDS: _staticDS,
        staticDependent: _staticDependent,
      },
      () => {
        if (staticUC.length) {
          console.log("CAMERA IS PRESENT");
          this.onLoadDisableServices();
          this.setState({ isCamerPresent: true });
        } else {
          console.log("CAMERA IS NOT PRESENT");
          this.setState({ isCamerPresent: false });
        }
        console.log(this.state);
      }
    );

    // this.parentLoop(_Service, (item) => {
    //   if (item.Parent_container_id.AI.length > deepStreamLimit) {
    //     this.parentLoop(_data, (ele) => {
    //       ele.disabledService.push(item.Service_id);
    //     });
    //   }
    // });
    // this.setState({ data: _data }, () => console.log(this.state));
  };
  onLoadDisableServices = () => {
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _activeDS = [...this.state.staticDS];
    let _activeUsecases = [...this.state.staticUC];

    let addArr = [...this.state.staticUC];
    Array.prototype.push.apply(addArr, this.state.staticDependent);
    addArr = [...new Set(addArr)];
    console.log(addArr);
    if (addArr.length >= usecaseLimit) {
      console.log("USE CASE LIMIT REACHED: " + addArr.length);
      this.parentLoop(_Service, (item) => {
        //disable other usecase and DS
        if (!_activeUsecases.includes(item.Service_id)) {
          this.parentLoop(_data, (ele) => {
            ele.disabledService.push(item.Service_id);
          });
        }
      });
    } else {
      console.log("USE CASE LIMIT NOT REACHED: " + addArr.length);
      if (deepStreamLimit === _activeDS.length) {
        console.log("DS LIMIT REACHED V2");
        this.parentLoop(_Service, (item) => {
          if (item.Parent_container_id.AI.length <= _activeDS.length) {
            let result = [];

            this.parentLoop(item.Parent_container_id.AI, (ele) => {
              this.parentLoop(_activeDS, (ele2) => {
                if (ele2 === ele) result.push(true);
                else result.push(false);
              });
            });
            if (!result.includes(true)) {
              let intersection = item.Parent_container_id.AI.filter(
                (x) => !_activeDS.includes(x)
              );
              let add = _activeDS.length + intersection.length;
              if (deepStreamLimit < add) {
                console.log("disable: " + item.Service_id);
                this.toggleUsecase(item.Service_id, "push");
              } else {
                console.log("enable: " + item.Service_id);
                this.toggleUsecase(item.Service_id, "put");
              }
            } else {
              let intersection = item.Parent_container_id.AI.filter(
                (x) => !_activeDS.includes(x)
              );
              let add = _activeDS.length + intersection.length;
              if (deepStreamLimit < add) {
                console.log("disable1: " + item.Service_id);
                this.toggleUsecase(item.Service_id, "push");
              } else {
                console.log("enable1: " + item.Service_id);
                this.toggleUsecase(item.Service_id, "put");
              }
            }
          } else {
            this.toggleUsecase(item.Service_id, "push");
          }
        });
      } else {
        console.log("DS LIMIT NOT REACHED V2");
        this.parentLoop(_Service, (item) => {
          if (item.Parent_container_id.AI.length <= deepStreamLimit) {
            let result = [];

            this.parentLoop(item.Parent_container_id.AI, (ele) => {
              this.parentLoop(_activeDS, (ele2) => {
                if (ele2 === ele) result.push(true);
                else result.push(false);
              });
            });
            // console.log(item.Service_id);
            // console.log(result);
            if (!result.includes(true)) {
              console.log(item.Service_id);
              if (item.Category === "Analytics") {
                console.log("CATEGORY IS ANALYTIC " + item.Service_id);
                let UCresult = [];
                this.parentLoop(
                  item.Parent_container_id.Usecase,
                  (item_ele) => {
                    this.parentLoop(_activeUsecases, (UC_ele) => {
                      console.log(UC_ele + "===" + item_ele);
                      if (UC_ele === item_ele) UCresult.push(true);
                      else UCresult.push(false);
                    });
                  }
                );
                console.log(UCresult);
                if (!UCresult.includes(true)) {
                  let intersection = item.Parent_container_id.AI.filter(
                    (x) => !_activeDS.includes(x)
                  );
                  console.log(addArr, intersection);
                  let add = _activeUsecases.length + intersection.length;
                  // let add = addArr.length + intersection.length;
                  console.log(deepStreamLimit + "<" + add);

                  if (deepStreamLimit < add) {
                    console.log("disable: " + item.Service_id);
                    this.toggleUsecase(item.Service_id, "push");
                  } else {
                    console.log("enable: " + item.Service_id);
                    this.toggleUsecase(item.Service_id, "put");
                  }
                } else {
                  let intersection = item.Parent_container_id.AI.filter(
                    (x) => !_activeDS.includes(x)
                  );
                  let add = _activeDS.length + intersection.length;
                  if (deepStreamLimit < add) {
                    console.log("disable: " + item.Service_id);
                    this.toggleUsecase(item.Service_id, "push");
                  } else {
                    console.log("enable: " + item.Service_id);
                    this.toggleUsecase(item.Service_id, "put");
                  }
                }
              } else {
                let intersection = item.Parent_container_id.AI.filter(
                  (x) => !_activeDS.includes(x)
                );
                let add = _activeDS.length + intersection.length;
                if (deepStreamLimit < add) {
                  console.log("disable: " + item.Service_id);
                  this.toggleUsecase(item.Service_id, "push");
                } else {
                  console.log("enable: " + item.Service_id);
                  this.toggleUsecase(item.Service_id, "put");
                }
              }
            } else {
              let intersection = item.Parent_container_id.AI.filter(
                (x) => !_activeDS.includes(x)
              );
              let add = _activeDS.length + intersection.length;
              if (deepStreamLimit < add) {
                console.log("disable1: " + item.Service_id);
                this.toggleUsecase(item.Service_id, "push");
              } else {
                console.log("enable1: " + item.Service_id);
                this.toggleUsecase(item.Service_id, "put");
              }
            }
          } else {
            this.toggleUsecase(item.Service_id, "push");
          }
        });
      }
      // this.parentLoop(_Service, (item) => {
      //   //disable other usecase and DS
      //   console.log(item.Service_id);
      //   if (!_activeUsecases.includes(item.Service_id)) {
      //     console.log("service name: " + item.Service_name);
      //     this.parentLoop(_data, (ele) => {
      //       ele.disabledService.push(item.Service_id);
      //     });
      //   }
      // });
    }
    this.setState(
      {
        data: _data,
        // activeDS: [...this.state.staticDS]
      },
      () => console.log(this.state)
    );
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <div className="addCamera">
        {/* {console.log(this.state)} */}
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
                  key={item}
                  className={
                    this.state.selectedTimeSlot.includes(item.slot)
                      ? "child active"
                      : "child"
                  }
                  onMouseDown={() => {
                    this.timeslotMouseDown(item.slot);
                  }}
                  onMouseEnter={() => {
                    if (this.state.mouseState) {
                      this.timeslotMouseDown(item.slot);
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
              <div className="flex">
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
                      key={item.slot}
                      className={
                        item.Usecases.includes(service_item.Service_id)
                          ? "child active"
                          : "child"
                      }
                      style={{
                        backgroundColor: item.isDisabled
                          ? "gray"
                          : item.disabledService.includes(
                              service_item.Service_id
                            )
                          ? "gray"
                          : "",
                      }}
                      onMouseDown={() => {
                        if (!item.isDisabled) {
                          if (
                            !item.disabledService.includes(
                              service_item.Service_id
                            )
                          ) {
                            if (this.state.isCamerPresent) {
                              this.usecaseMouseDown2(
                                item,
                                service_index,
                                service_item
                              );
                            } else {
                              this.usecaseMouseDown(
                                item,
                                service_index,
                                service_item
                              );
                            }
                          }
                        }
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          if (!item.isDisabled) {
                            if (
                              !item.disabledService.includes(
                                service_item.Service_id
                              )
                            ) {
                              if (this.state.isCamerPresent) {
                                this.usecaseMouseDown2(
                                  item,
                                  service_index,
                                  service_item
                                );
                              } else {
                                this.usecaseMouseDown(
                                  item,
                                  service_index,
                                  service_item
                                );
                              }
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

//NOTE:
//Remove duplicate from Dependent Array onSubmit
