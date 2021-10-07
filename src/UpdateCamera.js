import React, { Component } from "react";
import limits from "./limits.json";
import logo from "./logo.svg";
import servicess from "./services.json";
const Services = servicess["Services"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];
export default class UpdateCamera extends Component {
  state = {
    data: [
      {
        slot: "0-2",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "2-4",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "4-6",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "6-8",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "8-10",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "10-12",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "12-14",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "14-16",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "16-18",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "18-20",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "20-22",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
      {
        slot: "22-24",
        Usecases: [],
        AI: [],
        staticAI: [],
        staticUC: [],
        staticDependent: [],
        disabledService: [],
        Dependent: [],
      },
    ],
    apiData: {
      "0-2": {
        global: {
          Cameras: ["1", "2"],
          Usecases: ["LOITV1"],
          Dependent: [],
          AI: ["person"],
        },
        local: {
          2: {
            Usecases: ["LOITV1"],
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
          Usecases: ["LOITV1", "TRESV1"],
          Dependent: [],
          AI: ["person"],
        },
        local: {
          1: {
            Usecases: ["LOITV1", "TRESV1"],
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
    mouseState: false,
    isCamerPresent: false,
    Service: Services,
    selectedTimeSlot: [],
    staticTimeSlot: [],
  };

  parentLoop = (arr, callback) => {
    for (let element of arr) {
      callback(element);
    }
  };

  timeslotMouseDown = (i) => {
    console.log("timeslotMouseDown()");
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _data = [...this.state.data];
    let _service = [...this.state.Service];

    if (_selectedTimeSlot.includes(i)) {
      var index = _selectedTimeSlot.indexOf(i);
      _selectedTimeSlot.splice(index, 1);
      this.parentLoop(_data, (data_ele) => {
        this.parentLoop(_service, (_service_ele) => {
          if (data_ele.slot === i) {
            data_ele.disabledService.push(_service_ele.Service_id);
            data_ele.AI.length = 0;
            data_ele.Dependent.length = 0;
            data_ele.Usecases.length = 0;
          }
        });
      });
    } else {
      _selectedTimeSlot.push(i);

      this.parentLoop(_data, (ele) => {
        if (ele.slot === i) {
          if (this.state.staticTimeSlot.includes(i)) {
            if (this.state.staticTimeSlot.includes(i)) {
              console.log("IF..........");
              this.onLoad(undefined, ele.slot);
            } else {
              console.log("ELSE..........");

              this.onLoad(ele.slot, undefined);
            }
          } else {
            console.log("ELSE IF..........");

            ele.disabledService.length = 0;
            var indexOf = _data.findIndex((i) => i.slot === ele.slot);
            this.verifyLimits(ele, "", "", indexOf);
          }
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
  toggleAnalytics = (element, data_index) => {
    console.log("toggleAnalytics()");
    console.log(element, data_index);
    let _data = [...this.state.data];
    let _usecases = _data[data_index].Usecases;
    let _Dependent = _data[data_index].Dependent;
    let uniqueUC = [..._usecases];
    Array.prototype.push.apply(uniqueUC, _Dependent);
    uniqueUC = [...new Set(uniqueUC)];
    let uniqueAI = [..._data[data_index].staticAI];
    Array.prototype.push.apply(uniqueAI, _data[data_index].AI);
    uniqueAI = [...new Set(uniqueAI)];

    let intersection = element.Parent_container_id.AI.filter(
      (x) => !uniqueAI.includes(x)
    );
    console.log(intersection);
    let add = uniqueAI.length + intersection.length;
    console.log();
    if (deepStreamLimit < add) {
      _data[data_index].disabledService.push(element.Service_id);
      _data[data_index].disabledService = [
        ...new Set(_data[data_index].disabledService),
      ];
    } else {
      console.log("below DS range");
      let UCnDependent = [...element.Parent_container_id.Usecase];
      UCnDependent.push(element.Service_id);
      console.log(UCnDependent);
      let UCadd = [...uniqueUC];
      Array.prototype.push.apply(UCadd, UCnDependent);
      Array.prototype.push.apply(UCadd, _data[data_index].staticUC);
      UCadd = [...new Set(UCadd)];
      console.log(UCadd);
      console.log(usecaseLimit + "<" + UCadd.length);
      if (usecaseLimit < UCadd.length) {
        _data[data_index].disabledService.push(element.Service_id);
        _data[data_index].disabledService = [
          ...new Set(_data[data_index].disabledService),
        ];
      } else {
        console.log("false");
        var ucIndex = _data[data_index].disabledService.indexOf(
          element.Service_id
        );
        console.log(ucIndex);
        if (ucIndex >= 0) {
          _data[data_index].disabledService.splice(ucIndex, 1);
          _data[data_index].disabledService = [
            ...new Set(_data[data_index].disabledService),
          ];
        }
      }
    }

    this.setState({ data: _data });
  };

  verifyLimits = (data_item, service_index, service_item, data_index) => {
    console.log("verifyLimits()");
    console.log(this.state);
    let _data = [...this.state.data];
    // let _Service = [...this.state.Service];
    let _usecases = _data[data_index].Usecases;
    let _Dependent = _data[data_index].Dependent;
    let addArr = [..._usecases];
    Array.prototype.push.apply(addArr, _Dependent);
    Array.prototype.push.apply(addArr, _data[data_index].staticUC);
    addArr = [...new Set(addArr)];
    // let uniqueAI = [...new Set(_data[data_index].AI)];
    let uniqueAI = [..._data[data_index].staticAI];
    Array.prototype.push.apply(uniqueAI, _data[data_index].AI);
    uniqueAI = [...new Set(uniqueAI)];
    console.log(uniqueAI);
    console.log(addArr);
    if (usecaseLimit === addArr.length) {
      console.log(addArr);
      console.log("Usecase limit reached");
      this._UCLimitReached(data_item, service_index, service_item, data_index);
    } else if (uniqueAI === deepStreamLimit) {
      console.log(uniqueAI);
      console.log("DS limit reached");
      this._DSLimitReached(data_item, service_index, service_item, data_index);
    } else {
      console.log("verifyLimits ELSE");
      this.toggleService(data_item, service_index, service_item, data_index);
      // this._unchecked(service_item);
    }
  };

  toggleService = (data_item, service_index, service_item, data_index) => {
    console.log("toggleService()");
    console.log(this.state);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _usecases = _data[data_index].Usecases;
    let _Dependent = [..._data[data_index].Dependent];
    // let addArr = [..._usecases];
    // Array.prototype.push.apply(addArr, _Dependent);
    // addArr = [...new Set(addArr)];
    let addArr = [..._usecases];
    Array.prototype.push.apply(addArr, _Dependent);
    Array.prototype.push.apply(addArr, _data[data_index].staticUC);
    addArr = [...new Set(addArr)];
    // let uniqueAI = [...new Set(_data[data_index].AI)];
    let uniqueAI = [..._data[data_index].staticAI];
    Array.prototype.push.apply(uniqueAI, _data[data_index].AI);
    uniqueAI = [...new Set(uniqueAI)];
    console.log(addArr);
    console.log(uniqueAI);
    if (!uniqueAI.length) {
      console.log("DEFAULT STATE");
      this.parentLoop(_Service, (item) => {
        if (item.Parent_container_id.AI.length <= deepStreamLimit) {
          var indexx = _data[data_index].disabledService.indexOf(
            item.Service_id
          );
          if (indexx >= 0) {
            _data[data_index].disabledService.splice(indexx, 1);
            _data[data_index].disabledService = [
              ...new Set(_data[data_index].disabledService),
            ];
          }
        } else {
          const intersection = item.Parent_container_id.AI.filter(
            (value) => !uniqueAI.includes(value)
          );
          let add = uniqueAI.length + intersection.length;
          if (deepStreamLimit < add) {
            _data[data_index].disabledService.push(item.Service_id);
            _data[data_index].disabledService = [
              ...new Set(_data[data_index].disabledService),
            ];
          } else {
            console.log("ELSE...............");
          }
        }
      });
    } else {
      console.log("toggleService ELSE");
      let arr = [];
      this.parentLoop(_usecases, (ele) => {
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
            if (element.Category === "Analytics") {
              console.log("calling analytics " + element.Service_name);
              this.toggleAnalytics(element, data_index);
            } else {
              let intersection = element.Parent_container_id.AI.filter(
                (x) => !uniqueAI.includes(x)
              );
              console.log(intersection);
              let add = uniqueAI.length + intersection.length;
              if (deepStreamLimit < add) {
                console.log("disable4: " + element.Service_id);
                _data[data_index].disabledService.push(element.Service_id);
                _data[data_index].disabledService = [
                  ...new Set(_data[data_index].disabledService),
                ];
              } else {
                console.log("enable4: " + element.Service_id);
                let uniqueD = [...new Set(_data[data_index].disabledService)];
                var ucIndex = uniqueD.indexOf(element.Service_id);
                console.log(ucIndex);
                if (ucIndex >= 0) {
                  uniqueD.splice(ucIndex, 1);
                  _data[data_index].disabledService = [...uniqueD];
                }
              }
            }
          } else {
            if (element.Category === "Analytics") {
              console.log("calling analytics " + element.Service_name);
              this.toggleAnalytics(element, data_index);
            } else {
              let intersection = element.Parent_container_id.AI.filter(
                (x) => !uniqueAI.includes(x)
              );
              console.log(intersection);
              let add = uniqueAI.length + intersection.length;
              console.log(uniqueAI, intersection);
              console.log(deepStreamLimit + "<" + add);
              if (deepStreamLimit < add) {
                console.log("disable5: " + element.Service_id);
                _data[data_index].disabledService.push(element.Service_id);
                _data[data_index].disabledService = [
                  ...new Set(_data[data_index].disabledService),
                ];
              } else {
                console.log("enable5: " + element.Service_id);
                let uniqueD = [...new Set(_data[data_index].disabledService)];
                var ucIndex = uniqueD.indexOf(element.Service_id);
                console.log(ucIndex);
                if (ucIndex >= 0) {
                  uniqueD.splice(ucIndex, 1);
                  _data[data_index].disabledService = [...uniqueD];
                }
              }
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
                if (element.Category === "Analytics") {
                  console.log("calling analytics " + element.Service_name);
                  this.toggleAnalytics(element, data_index);
                } else {
                  let intersection = element.Parent_container_id.AI.filter(
                    (x) => !uniqueAI.includes(x)
                  );
                  let add = uniqueAI.length + intersection.length;
                  console.log("RESULT");
                  console.log(intersection);
                  console.log(deepStreamLimit + "<" + add);
                  if (deepStreamLimit < add) {
                    console.log("disable: " + element.Service_id);
                    _data[data_index].disabledService.push(element.Service_id);
                    _data[data_index].disabledService = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                  } else {
                    console.log("enable: " + element.Service_id);
                    let uniqueD = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                    var ucIndex = uniqueD.indexOf(element.Service_id);
                    console.log(ucIndex);
                    if (ucIndex >= 0) {
                      uniqueD.splice(ucIndex, 1);
                      _data[data_index].disabledService = [...uniqueD];
                    }
                  }
                }
              } else {
                if (element.Category === "Analytics") {
                  console.log("calling analytics " + element.Service_name);
                  this.toggleAnalytics(element, data_index);
                } else {
                  let intersection = element.Parent_container_id.AI.filter(
                    (x) => !uniqueAI.includes(x)
                  );
                  console.log(intersection);
                  let add = uniqueAI.length + intersection.length;
                  console.log("RESULT 1");
                  console.log(intersection);
                  console.log(deepStreamLimit + "<" + add);
                  if (deepStreamLimit < add) {
                    console.log("disable1: " + element.Service_id);
                    _data[data_index].disabledService.push(element.Service_id);
                    _data[data_index].disabledService = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                  } else {
                    console.log("enable1: " + element.Service_id);
                    let uniqueD = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                    var ucIndex = uniqueD.indexOf(element.Service_id);
                    console.log(ucIndex);
                    if (ucIndex >= 0) {
                      uniqueD.splice(ucIndex, 1);
                      _data[data_index].disabledService = [...uniqueD];
                    }
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
                if (element.Category === "Analytics") {
                  console.log("calling analytics " + element.Service_name);
                  this.toggleAnalytics(element, data_index);
                } else {
                  let intersection = element.Parent_container_id.AI.filter(
                    (x) => !uniqueAI.includes(x)
                  );
                  console.log(intersection);
                  let add = uniqueAI.length + intersection.length;
                  console.log("RESULT 2");
                  console.log(intersection);
                  console.log(deepStreamLimit + "<" + add);
                  if (deepStreamLimit < add) {
                    console.log("disable2: " + element.Service_id);
                    _data[data_index].disabledService.push(element.Service_id);
                    _data[data_index].disabledService = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                  } else {
                    console.log("enable2: " + element.Service_id);
                    let uniqueD = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                    var ucIndex = uniqueD.indexOf(element.Service_id);
                    console.log(ucIndex);
                    if (ucIndex >= 0) {
                      uniqueD.splice(ucIndex, 1);
                      _data[data_index].disabledService = [...uniqueD];
                    }
                  }
                }
              } else {
                if (element.Category === "Analytics") {
                  console.log("calling analytics " + element.Service_name);
                  this.toggleAnalytics(element, data_index);
                } else {
                  let intersection = element.Parent_container_id.AI.filter(
                    (x) => !uniqueAI.includes(x)
                  );

                  let add = uniqueAI.length + intersection.length;
                  console.log("RESULT 3");
                  console.log(intersection);
                  console.log(deepStreamLimit + "<" + add);
                  if (deepStreamLimit < add) {
                    console.log("disable3: " + element.Service_id);
                    _data[data_index].disabledService.push(element.Service_id);
                    _data[data_index].disabledService = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                  } else {
                    console.log("enable3: " + element.Service_id);
                    let uniqueD = [
                      ...new Set(_data[data_index].disabledService),
                    ];
                    var ucIndex = uniqueD.indexOf(element.Service_id);
                    console.log(ucIndex);
                    if (ucIndex >= 0) {
                      uniqueD.splice(ucIndex, 1);
                      _data[data_index].disabledService = [...uniqueD];
                    }
                  }
                }
              }
            }
          } else {
            console.log(element.Service_name);
            _data[data_index].disabledService.push(element.Service_id);
            _data[data_index].disabledService = [
              ...new Set(_data[data_index].disabledService),
            ];
          }
        });
      }
    }
    console.log(_data);
    this.setState({ data: _data });
  };

  _UCLimitReached = (data_item, service_index, service_item, data_index) => {
    console.log("_UCLimitReached()");
    let _Service = [...this.state.Service];
    let _data = [...this.state.data];
    let _usecases = [..._data[data_index].Usecases];
    Array.prototype.push.apply(_usecases, data_item.Dependent);
    Array.prototype.push.apply(_usecases, data_item.staticDependent);
    Array.prototype.push.apply(_usecases, data_item.staticUC);
    _usecases = [...new Set(_usecases)];
    console.log(_usecases);

    this.parentLoop(_Service, (ele) => {
      if (!_usecases.includes(ele.Service_id)) {
        _data[data_index].disabledService.push(ele.Service_id);
      }
    });
    _data[data_index].disabledService = [
      ...new Set(_data[data_index].disabledService),
    ];
    this.setState({ data: _data });
  };

  _DSLimitReached = (data_item, service_index, service_item, data_index) => {
    console.log("_DSLimitReached()");
    console.log(this.state);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _usecases = _data[data_index].Usecases;
    let _AI = _data[data_index].AI;
    let _Dependent = _data[data_index].Dependent;
    let uniqueUC = [..._usecases];
    Array.prototype.push.apply(uniqueUC, _Dependent);
    uniqueUC = [...new Set(uniqueUC)];

    this.parentLoop(_Service, (serv_ele) => {
      let result = [];
      if (serv_ele.Parent_container_id.AI.length <= deepStreamLimit) {
        this.parentLoop(_usecases, (uc_ele) => {
          if (uc_ele === serv_ele.Service_id) result.push(true);
          else result.push(false);
        });
        // console.log(serv_ele.Service_id, result);
        if (result.includes(true)) {
          console.log("IF " + serv_ele.Service_id);
        } else {
          const intersection = serv_ele.Parent_container_id.AI.filter(
            (value) => !_AI.includes(value)
          );
          console.log(intersection);
          let add = _AI.length + intersection.length;
          if (deepStreamLimit < add) {
            console.log("disabled DS: " + serv_ele.Service_id);
            _data[data_index].disabledService.push(serv_ele.Service_id);
            _data[data_index].disabledService = [
              ...new Set(_data[data_index].disabledService),
            ];
          } else {
            if (
              _data[data_index].disabledService.includes(serv_ele.Service_id)
            ) {
              var index = _data[data_index].disabledService.indexOf(
                serv_ele.Service_id
              );
              _data[data_index].disabledService.splice(index, 1);
              _data[data_index].disabledService = [
                ...new Set(_data[data_index].disabledService),
              ];
            }
          }
        }
      }
    });

    this.setState({ data: _data });
  };

  usecaseMouseDown = (data_item, service_index, service_item, data_index) => {
    let _Service = [...this.state.Service];
    let _data = [...this.state.data];
    let _usecases = _data[data_index].Usecases;
    let _Dependent = _data[data_index].Dependent;
    let activeUC = [..._usecases];
    Array.prototype.push.apply(activeUC, _Dependent);
    // activeUC = [...new Set(activeUC)];
    console.log(_usecases);
    //checking if usecase is added or not
    if (_usecases.includes(service_item.Service_id)) {
      console.log("UC PRESENT IN ACTIVE UC");
      var ucIndex = _data[data_index].Usecases.indexOf(service_item.Service_id);
      _data[data_index].Usecases.splice(ucIndex, 1);

      //removing DS
      let arr = [];
      console.log(_usecases);
      this.parentLoop(_usecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            // arr = [...new Set(arr)];
          }
        });
      });
      console.log(arr);
      _data[data_index].AI = [...arr];
      if (service_item.Category === "Analytics") {
        console.log("Analytics: " + service_item.Service_name);
        let dArr = _data[data_index].Dependent;

        this.parentLoop(service_item.Parent_container_id.Usecase, (u_ele) => {
          if (dArr.includes(u_ele)) {
            let index = _data[data_index].Dependent.indexOf(u_ele);
            console.log(index);
            if (index >= 0) {
              _data[data_index].Dependent.splice(index, 1);
            }
          }
        });
      }
    } else {
      console.log(activeUC);
      console.log("UC NOT PRESENT IN ACTIVE UC");
      //push data in time slot
      _data[data_index].Usecases.push(service_item.Service_id);
      if (service_item.Category === "Analytics") {
        let arr = [];
        arr.push(service_item.Service_id);
        Array.prototype.push.apply(
          arr,
          service_item.Parent_container_id.Usecase
        );
        console.log(arr);
        if (arr <= usecaseLimit) {
          Array.prototype.push.apply(
            _data[data_index].Dependent,
            service_item.Parent_container_id.Usecase
          );
        } else {
          console.log("else");
          Array.prototype.push.apply(
            _data[data_index].Dependent,
            service_item.Parent_container_id.Usecase
          );
        }
      }

      Array.prototype.push.apply(
        _data[data_index].AI,
        service_item.Parent_container_id.AI
      );
    }

    console.log(activeUC);
    this.setState(
      {
        mouseState: true,
        data: _data,
      },
      () =>
        this.verifyLimits(data_item, service_index, service_item, data_index)
    );
  };

  componentDidMount() {
    this.onLoad();
  }

  onLoad = (slot, slot2) => {
    console.log("onLoad()");
    let _data = [...this.state.data];
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _service = [...this.state.Service];
    let _apiData = { ...this.state.apiData };
    let keys = Object.keys(this.state.apiData);
    let idee = this.props.match.params.idee;

    function pushData(data_ele, keys) {
      // data_ele.Usecases.push(..._apiData[keys].local[idee].Usecases);
      // data_ele.Dependent.push(..._apiData[keys].local[idee].Dependent);
      //       data_ele.AI.push(..._apiData[keys].local[idee].AI);
      // data_ele.staticUC.push(..._apiData[keys].global.Usecases);
      // data_ele.staticDependent.push(..._apiData[keys].global.Dependent);
      // data_ele.staticAI.push(..._apiData[keys].global.Usecases);

      Array.prototype.push.apply(
        data_ele.Usecases,
        _apiData[keys].local[idee].Usecases
      );

      Array.prototype.push.apply(
        data_ele.Dependent,
        _apiData[keys].local[idee].Dependent
      );

      Array.prototype.push.apply(data_ele.AI, _apiData[keys].local[idee].AI);

      Array.prototype.push.apply(
        data_ele.staticUC,
        _apiData[keys].global.Usecases
      );

      Array.prototype.push.apply(data_ele.staticAI, _apiData[keys].global.AI);
      Array.prototype.push.apply(
        data_ele.staticDependent,
        _apiData[keys].global.Dependent
      );

      //unique
      data_ele.staticAI = [...new Set(data_ele.staticAI)];
      data_ele.staticUC = [...new Set(data_ele.staticUC)];
      data_ele.staticDependent = [...new Set(data_ele.staticDependent)];

      data_ele.Usecases = [...new Set(data_ele.Usecases)];
      data_ele.Dependent = [...new Set(data_ele.Dependent)];
      data_ele.AI = [...new Set(data_ele.AI)];
    }

    if (slot) {
      this.parentLoop(_data, (data_ele) => {
        if (data_ele.slot === slot) {
          pushData(data_ele, slot);
          var indexOf = _data.findIndex((i) => i.slot === slot);
          this.verifyLimits(data_ele, "", "", indexOf);
        }
      });
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (this.state.apiData[keys[i]].global.Cameras.length) {
          console.log(keys[i]);

          if (this.state.apiData[keys[i]].global.Cameras.includes(idee)) {
            console.log("IF");
            if (!_selectedTimeSlot.length) {
              console.log("IFIFIFIFIFIFIF", keys[i]);
              if (slot2) {
                _selectedTimeSlot.push(keys[i]);
                var indexOf = _data.findIndex((i) => i.slot == slot2);
                console.log(indexOf);
                pushData(_data[i], keys[i]);
                this.verifyLimits(_data[indexOf], "", "", indexOf);
              } else {
                console.log("object", keys[i]);
                _selectedTimeSlot.push(keys[i]);
                // var indexOf = _data.findIndex(
                //   (i) => i.slot == _selectedTimeSlot[0]
                // );
                // console.log(indexOf);
                // pushData(_data[i], keys[i]);
                // this.verifyLimits(_data[indexOf], "", "", indexOf);
                pushData(_data[i], keys[i]);
                this.verifyLimits(_data[i], "", "", i);
              }
            } else {
              console.log("ELSEELSEELSEELSE ", keys[i], slot2);

              _selectedTimeSlot.push(keys[i]);
              if (slot2) {
                var indexOf = _data.findIndex((i) => i.slot == slot2);
                console.log(indexOf);
                if (indexOf >= 0) {
                  pushData(_data[i], keys[i]);
                  this.verifyLimits(_data[indexOf], "", "", indexOf);
                }
              } else {
                this.parentLoop(_selectedTimeSlot, (slot_ele) => {
                  var indexOf = _data.findIndex((i) => i.slot == slot_ele);
                  console.log(indexOf);
                  pushData(_data[i], keys[i]);
                  this.verifyLimits(_data[indexOf], "", "", indexOf);
                });
                // pushData(_data[i], keys[i]);
                // this.verifyLimits(_data[i], "", "", i);
              }

              // _selectedTimeSlot.push(keys[i]);
              // this.parentLoop(_selectedTimeSlot, (slot_ele) => {
              //   var indexOf = _data.findIndex((i) => i.slot == slot_ele);
              //   console.log(indexOf);
              //   pushData(_data[i], keys[i]);
              //   this.verifyLimits(_data[indexOf], "", "", indexOf);
              // });
              // pushData(_data[i], keys[i]);
              // this.verifyLimits(_data[i], "", "", i);
            }
          } else {
            console.log("ELSE");
            this.parentLoop(_service, (serv_ele) => {
              _data[i].disabledService.push(serv_ele.Service_id);
            });
          }
        } else {
          console.log("ELSE ELSE");
          this.parentLoop(_service, (serv_ele) => {
            _data[i].disabledService.push(serv_ele.Service_id);
          });
        }
      }
    }

    this.setState(
      {
        selectedTimeSlot: _selectedTimeSlot,
        staticTimeSlot: _selectedTimeSlot,
        data: _data,
      },
      () => console.log(this.state)
    );
  };
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

          <div className="timeline-header">
            <p className="h">Camera</p>
            <div
              className="timeline"
              onMouseLeave={() => this.setState({ mouseState: false })}
            >
              {this.state.data.map((item) => (
                <div
                  key={item.slot + "1020"}
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
              <div className="flex" key={service_item.Service_id}>
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
                      key={item.slot + "2"}
                      className={
                        item.Usecases.includes(service_item.Service_id)
                          ? "child active"
                          : "child"
                      }
                      style={{
                        backgroundColor: item.disabledService.includes(
                          service_item.Service_id
                        )
                          ? "gray"
                          : "",
                      }}
                      onMouseDown={() => {
                        if (
                          !item.disabledService.includes(
                            service_item.Service_id
                          )
                        ) {
                          if (this.state.isCamerPresent) {
                            this.usecaseMouseDown2(
                              item,
                              service_index,
                              service_item,
                              index
                            );
                          } else {
                            this.usecaseMouseDown(
                              item,
                              service_index,
                              service_item,
                              index
                            );
                          }
                        }
                      }}
                      onMouseEnter={() => {
                        if (this.state.mouseState) {
                          if (
                            !item.disabledService.includes(
                              service_item.Service_id
                            )
                          ) {
                            if (this.state.isCamerPresent) {
                              this.usecaseMouseDown2(
                                item,
                                service_index,
                                service_item,
                                index
                              );
                            } else {
                              this.usecaseMouseDown(
                                item,
                                service_index,
                                service_item,
                                index
                              );
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
