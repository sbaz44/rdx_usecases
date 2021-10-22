import React, { Children, Component } from "react";
import logo from "./logo.svg";
import limits from "./limits.json";
import servicess from "./services.json";
const Services = servicess["Services"];
const Limits = limits["details"]["Limitations"];
const deepStreamLimit = Limits["Deepstream"];
const usecaseLimit = Limits["Usecase"];

// let Services = "";
// const Limits = limits["details"]["Limitations"];
// let deepStreamLimit = "";
// let usecaseLimit = "";

class AddCamera2 extends Component {
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
      "22-24",
    ],
    mouseState: false,
    arr: [],
    isCamerPresent: false,
    Service: [],
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
          Cameras: ["1"],
          Usecases: [
            // "DUMMYANAV1",
            // "DUMMYANAV2",
            // "LOITV1ANA",
            "DUMMYV2",
            // "VEHIV1ANA",
            // "VEHIV1",
            "TRESANAV1",
            // "TRESV1",
            // "MASKV1",
            // "DUMMYV1",
            // "LOITV1",
          ],
          Dependent: ["LOITV1"],
          AI: ["person", "vehicle", "dp1"],
        },
        local: {
          1: {
            Usecases: ["LOITV1", "LOITV1ANA", "TRESV1"],
            Dependent: ["LOITV1"],
            // AI: ["person", "fmgh"],
          },
        },
      },
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
      // "0-2": {
      //   global: {
      //     Cameras: ["1"],
      //     Usecases: [
      //       // "LOITV1",
      //       "LOITV1ANA",
      //       // "TRESV1",
      //       // "MASKV1",
      //       "VEHIV1",
      //     ],
      //     Dependent: ["LOITV1"],
      //     AI: ["person", "vehicle"],
      //   },
      //   local: {
      //     1: {
      //       Usecases: ["LOITV1", "LOITV1ANA", "TRESV1", "MASKV1"],
      //       Dependent: ["LOITV1"],
      //       // AI: ["person", "fmgh"],
      //     },
      //     2: {
      //       Usecases: ["LOITV1"],
      //       Dependent: [],
      //       AI: ["person"],
      //     },
      //   },
      // },
      // "2-4": {
      //   global: {
      //     Cameras: ["1"],
      //     Usecases: [
      //       // "DUMMYANAV1",
      //       // "DUMMYANAV2",
      //       // "LOITV1ANA",
      //       // "VEHIV1ANA",
      //       "VEHIV1",
      //       // "TRESANAV1",
      //       // "TRESV1",
      //       // "MASKV1",
      //       // "DUMMYV1",
      //       // "LOITV1",
      //     ],
      //     Dependent: [],
      //     AI: ["vehicle"],
      //   },
      //   // global: {
      //   //   Cameras: [],
      //   //   Usecases: [],
      //   //   Dependent: [],
      //   //   AI: [],
      //   // },
      //   local: {},
      // },
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
    console.log("toggleUsecase()");
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
          ele.disabledService = [...new Set(ele.disabledService)];
          // var index = ele.disabledService.indexOf(service_id);
          // ele.disabledService.splice(index, 1);
        }
        // else ele.Usecases.push(service_id);
      });
    }
    this.setState({ data: _data });
  };

  timeslotMouseDown = (i) => {
    console.log("timeslotMouseDown()");
    let _selectedTimeSlot = [...this.state.selectedTimeSlot];
    let _service = [...this.state.Service];
    let _data = [...this.state.data];
    let is_present = false;
    if (_selectedTimeSlot.includes(i)) {
      console.log("FOUND");
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
      is_present = true;
    } else {
      _selectedTimeSlot.push(i);
      this.parentLoop(_data, (ele) => {
        if (ele.slot === i) {
          ele.disabledService.length = 0;
        }
      });
    }

    this.parentLoop(_service, (serv_item) => {
      if (serv_item.Parent_container_id.AI.length <= deepStreamLimit) {
        if (serv_item.Category === "Analytics") {
          console.log("object..........");
        }
      } else {
        if (serv_item.Category === "Analytics") {
          this.parentLoop(_data, (data_ele) => {
            if (data_ele.slot === i) {
              data_ele.disabledService.push(serv_item.Service_id);
              data_ele.disabledService = [...new Set(data_ele.disabledService)];
            }
          });
        } else {
          this.parentLoop(_data, (data_ele) => {
            if (data_ele.slot === i) {
              data_ele.disabledService.push(serv_item.Service_id);
              data_ele.disabledService = [...new Set(data_ele.disabledService)];
            }
          });
        }
      }
    });
    this.setState(
      {
        selectedTimeSlot: _selectedTimeSlot,
        data: _data,
        mouseState: true,
      },
      () => {
        if (this.state.isCamerPresent) {
          if (!is_present) {
            this.cameraPresent(i);
          }
        }
      }
    );
  };

  _UCLimitReached = (data_item, service_index, service_item, data_index) => {
    console.log("_UCLimitReached");
    let _Service = [...this.state.Service];
    let _data = [...this.state.data];
    let _usecases = [..._data[data_index].Usecases];
    Array.prototype.push.apply(_usecases, data_item.Dependent);
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
  _UCLimitReached2 = (data_item, service_index, service_item, data_index) => {
    console.log("_UCLimitReached");
    let _Service = [...this.state.Service];
    let _data = [...this.state.data];
    let _usecases = [..._data[data_index].Usecases];
    Array.prototype.push.apply(_usecases, data_item.staticUC);
    Array.prototype.push.apply(_usecases, data_item.staticDependent);
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

  _DSLimitReached2 = (data_item, service_index, service_item, data_index) => {
    console.log("_DSLimitReached()");
    console.log(this.state);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _usecases = _data[data_index].Usecases;
    let _AI = [..._data[data_index].AI];
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

  toggleAnalytics = (element, data_index) => {
    console.log("toggleAnalytics()");
    console.log(element, data_index);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _usecases = _data[data_index].Usecases;
    let _AI = _data[data_index].AI;
    let _Dependent = _data[data_index].Dependent;
    let uniqueUC = [..._usecases];
    Array.prototype.push.apply(uniqueUC, _Dependent);
    uniqueUC = [...new Set(uniqueUC)];
    let uniqueAI = [...new Set(_data[data_index].AI)];
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
  toggleAnalytics2 = (data_ele, item) => {
    console.log("toggleAnalytics2()");
    let uniqueUCnD = [...data_ele.staticUC];
    let _data = [...this.state.data];
    Array.prototype.push.apply(uniqueUCnD, data_ele.Usecases);
    Array.prototype.push.apply(uniqueUCnD, data_ele.staticDependent);
    uniqueUCnD = [...new Set(uniqueUCnD)];
    let uniqueAI = [...data_ele.staticAI];
    let intersection = item.Parent_container_id.AI.filter(
      (x) => !uniqueAI.includes(x)
    );
    console.log(intersection);
    let add = uniqueAI.length + intersection.length;
    console.log(uniqueAI);
    console.log(add);
    if (deepStreamLimit < add) {
      data_ele.disabledService.push(item.Service_id);
      data_ele.disabledService = [...new Set(data_ele.disabledService)];
    } else {
      console.log("below DS range");
      let UCnDependent = [...item.Parent_container_id.Usecase];
      UCnDependent.push(item.Service_id);
      console.log(UCnDependent);
      console.log(uniqueUCnD);
      let UCadd = [...uniqueUCnD];
      Array.prototype.push.apply(UCadd, UCnDependent);
      UCadd = [...new Set(UCadd)];
      console.log(UCadd);
      console.log(usecaseLimit + "<" + UCadd.length);
      if (usecaseLimit < UCadd.length) {
        data_ele.disabledService.push(item.Service_id);
        data_ele.disabledService = [...new Set(data_ele.disabledService)];
      } else {
        console.log("false");
        var ucIndex = data_ele.disabledService.indexOf(item.Service_id);
        console.log(ucIndex);
        if (ucIndex >= 0) {
          data_ele.disabledService.splice(ucIndex, 1);
          data_ele.disabledService = [...new Set(data_ele.disabledService)];
        }
      }
    }
    this.setState({ data: _data });
  };

  toggleService = (data_item, service_index, service_item, data_index) => {
    console.log(this.state);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    console.log("toggleService()");
    let _usecases = _data[data_index].Usecases;
    let _Dependent = _data[data_index].Dependent;
    let addArr = [..._usecases];
    Array.prototype.push.apply(addArr, _Dependent);
    addArr = [...new Set(addArr)];
    let uniqueAI = [...new Set(_data[data_index].AI)];
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
  toggleService2 = (data_item, service_index, service_item, data_index) => {
    console.log("toggleService2()");
    console.log(this.state);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    let _usecases = _data[data_index].Usecases;
    let _AI = [..._data[data_index].AI];
    Array.prototype.push.apply(_AI, data_item.staticAI);

    let _Dependent = _data[data_index].Dependent;
    let addArr = [..._usecases];
    Array.prototype.push.apply(addArr, data_item.staticUC);
    Array.prototype.push.apply(addArr, data_item.staticDependent);
    Array.prototype.push.apply(addArr, _Dependent);
    addArr = [...new Set(addArr)];
    let uniqueAI = [...new Set(_AI)];
    console.log(addArr, uniqueAI);
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
              this.toggleAnalytics2(data_item, element);
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
              this.toggleAnalytics2(data_item, element);
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
                  this.toggleAnalytics2(data_item, element);
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
                  this.toggleAnalytics2(data_item, element);
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
                  this.toggleAnalytics2(data_item, element);
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
                  this.toggleAnalytics2(data_item, element);
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

  verifyLimits = (data_item, service_index, service_item, data_index) => {
    console.log(this.state);
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];
    console.log("verifyLimits()");
    let _usecases = _data[data_index].Usecases;
    let _AI = _data[data_index].AI;
    let _Dependent = _data[data_index].Dependent;
    let addArr = [..._usecases];
    Array.prototype.push.apply(addArr, _Dependent);
    addArr = [...new Set(addArr)];
    let uniqueAI = [...new Set(_data[data_index].AI)];
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

  verifyLimits2 = (data_item, service_index, service_item, data_index) => {
    console.log("verifyLimits2()");
    console.log(this.state);
    let _data = [...this.state.data];
    let _usecases = _data[data_index].Usecases;
    let _AI = [..._data[data_index].AI];
    Array.prototype.push.apply(_AI, data_item.staticAI);
    let _Dependent = _data[data_index].Dependent;
    let addArr = [..._usecases];
    Array.prototype.push.apply(addArr, data_item.staticUC);
    Array.prototype.push.apply(addArr, data_item.staticDependent);
    Array.prototype.push.apply(addArr, _Dependent);
    addArr = [...new Set(addArr)];
    // _AI = [...new Set(_AI)];
    let uniqueAI = [...new Set(_data[data_index].AI)];
    console.log(uniqueAI);
    console.log(addArr);
    if (usecaseLimit === addArr.length) {
      console.log("Usecase limit reached");
      console.log(addArr);
      this._UCLimitReached2(data_item, service_index, service_item, data_index);
    } else if (uniqueAI === deepStreamLimit) {
      console.log("DS limit reached");
      console.log(uniqueAI);
      this._DSLimitReached2(data_item, service_index, service_item, data_index);
    } else {
      console.log(addArr);
      console.log("verifyLimits ELSE");
      console.log(this.state);
      this.toggleService2(data_item, service_index, service_item, data_index);
    }
  };

  usecaseMouseDown = (data_item, service_index, service_item, data_index) => {
    let _activeUsecases = [...this.state.activeUsecases];
    let _activeDS = [...this.state.activeDS];
    let _Service = [...this.state.Service];
    let _data = [...this.state.data];
    let _activeDependent = [...this.state.activeDependent];
    let _usecases = _data[data_index].Usecases;
    let _AI = _data[data_index].AI;
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
      _activeDS = [...arr];
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

        // this.parentLoop(dArr, (dep_ele) => {
        //   console.log(dep_ele);
        //   this.parentLoop(
        //     service_item.Parent_container_id.Usecase,
        //     (ser_item) => {
        //       console.log(dep_ele + "====" + ser_item);
        //       if (dep_ele === ser_item) {
        //         let index = _data[data_index].Dependent.indexOf(ser_item);
        //         console.log(index);
        //         if (index >= 0) {
        //           _data[data_index].Dependent.splice(index, 1);
        //         }
        //       }
        //     }
        //   );
        // });
        // var filteredDependent = _data[data_index].Dependent.filter(
        //   (data_ele) =>
        //     !service_item.Parent_container_id.Usecase.includes(data_ele)
        // );
        // console.log(filteredDependent);
        // _data[data_index].Dependent = [...filteredDependent];
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
        activeUsecases: _activeUsecases,
        activeDS: _activeDS,
        activeDependent: _activeDependent,
      },
      () =>
        this.verifyLimits(data_item, service_index, service_item, data_index)
    );
  };

  usecaseMouseDown2 = (data_item, service_index, service_item, data_index) => {
    console.log("usecaseMouseDown2()");
    let _activeUsecases = [...data_item.Usecases];
    let _activeDS = [...data_item.AI];
    let _activeDependent = [...data_item.Dependent];
    let _data = [...this.state.data];
    let _Service = [...this.state.Service];

    let addUC = [...data_item.staticUC];
    Array.prototype.push.apply(addUC, _activeUsecases);
    Array.prototype.push.apply(addUC, _activeDependent);
    // Array.prototype.push.apply(addUC, this.state.staticDependent);
    addUC = [...new Set(addUC)];
    const isUCPresent = _activeUsecases.includes(service_item.Service_id);
    console.log(isUCPresent);
    console.log(addUC);
    if (isUCPresent) {
      console.log("UC PRESENT");
      var ucIndex = _data[data_index].Usecases.indexOf(service_item.Service_id);
      _data[data_index].Usecases.splice(ucIndex, 1);

      //removing DS
      let arr = [];
      console.log(_data[data_index].Usecases);
      this.parentLoop(_data[data_index].Usecases, (ele) => {
        this.parentLoop(_Service, (ele2) => {
          if (ele2.Service_id === ele) {
            Array.prototype.push.apply(arr, ele2.Parent_container_id.AI);
            // arr = [...new Set(arr)];
          }
        });
      });
      _activeDS = [...arr];
      console.log(arr);
      _data[data_index].AI = [...arr];
      console.log(_data[data_index].AI);
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
      console.log("UC NOT PRESENT");

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

      // Array.prototype.push.apply(
      //   _data[data_index].AI,
      //   service_item.Parent_container_id.AI
      // );
      // _data[data_index].AI = [...new Set(_activeDS)];

      // if (_data[data_index].Usecases.includes(service_item.Service_id)) {
      //   var index = _data[data_index].Usecases.indexOf(service_item.Service_id);
      //   _data[data_index].Usecases.splice(index, 1);
      // } else {
      //   _data[data_index].Usecases.push(service_item.Service_id);
      // }

      // Array.prototype.push.apply(
      //   _data[data_index].AI,
      //   service_item.Parent_container_id.AI
      // );

      // _data[data_index].AI = [...new Set(_data[data_index].AI)];
      // if (service_item.Category === "Analytics") {
      //   Array.prototype.push.apply(
      //     _data[data_index].Dependent,
      //     _Service[service_index].Parent_container_id.Usecase
      //   );
      // }
    }

    this.setState(
      {
        mouseState: true,
        data: _data,
      },

      // () => this._DisableService2(item, service_item)
      () => {
        console.log(this.state.data);
        this.verifyLimits2(data_item, service_index, service_item, data_index);
      }
      // console.log(this.state)
    );
  };

  onLoad = () => {
    let _staticDS = [...this.state.staticDS];
    let _staticDependent = [...this.state.staticDependent];
    let _data = [...this.state.data];
    let staticUC = [...this.state.staticUC];
    let keys = Object.keys(this.state.apiData);
    let cameraLength = 0;
    for (let i = 0; i < keys.length; i++) {
      if (this.state.apiData[keys[i]].global.Cameras.length) {
        cameraLength += 1;
        Array.prototype.push.apply(
          _data[i].staticUC,
          this.state.apiData[keys[i]].global.Usecases
        );
        Array.prototype.push.apply(
          _data[i].staticAI,
          this.state.apiData[keys[i]].global.AI
        );
        Array.prototype.push.apply(
          _data[i].staticDependent,
          this.state.apiData[keys[i]].global.Dependent
        );
      }
    }
    staticUC = [...new Set(staticUC)];
    _staticDS = [...new Set(_staticDS)];
    console.log(cameraLength);
    this.setState(
      {
        data: _data,
        staticUC: staticUC,
        staticDS: _staticDS,
        staticDependent: _staticDependent,
      },
      () => {
        if (cameraLength) {
          console.log("CAMERA IS PRESENT");

          this.setState({ isCamerPresent: true }, () => {
            let _data = [...this.state.data];
            let _service = [...this.state.Service];

            this.parentLoop(_data, (data_ele) => {
              this.parentLoop(_service, (_service_ele) => {
                data_ele.disabledService.push(_service_ele.Service_id);
                data_ele.disabledService = [
                  ...new Set(data_ele.disabledService),
                ];
              });
            });
            this.setState({ data: _data });
          });
        } else {
          console.log("CAMERA IS NOT PRESENT");
          this.setState({ isCamerPresent: false }, () =>
            this.cameraNotPresent()
          );
        }
        console.log(this.state);
      }
    );
  };

  cameraNotPresent = () => {
    console.log("cameraNotPresent()");
    let _data = [...this.state.data];
    let _service = [...this.state.Service];

    this.parentLoop(_data, (data_ele) => {
      this.parentLoop(_service, (_service_ele) => {
        data_ele.disabledService.push(_service_ele.Service_id);
        data_ele.disabledService = [...new Set(data_ele.disabledService)];
      });
    });
    this.setState({ data: _data });
  };

  cameraPresent = (i) => {
    console.log("cameraPresent()");
    let _data = [...this.state.data];
    let _service = [...this.state.Service];
    this.parentLoop(_data, (data_ele) => {
      if (data_ele.slot === i) {
        let uniqueUCnD = [...data_ele.staticUC];
        let _activeAI = [...data_ele.staticAI];
        Array.prototype.push.apply(uniqueUCnD, data_ele.staticDependent);
        uniqueUCnD = [...new Set(uniqueUCnD)];
        // console.log(uniqueUCnD);
        // console.log(_activeAI);

        if (uniqueUCnD.length >= usecaseLimit) {
          // console.log("USE CASE LIMIT REACHED: " + uniqueUCnD.length);
          this.parentLoop(_service, (item) => {
            //disable other usecase and DS
            if (!uniqueUCnD.includes(item.Service_id)) {
              // console.log(item.Service_id);
              data_ele.disabledService.push(item.Service_id);
            }
          });
        } else {
          // console.log("USE CASE LIMIT NOT REACHED: " + uniqueUCnD.length);
          // console.log(deepStreamLimit + " ===" + _activeAI.length);
          if (deepStreamLimit === _activeAI.length) {
            // console.log("DS LIMIT REACHED V2");
            this.parentLoop(_service, (item) => {
              if (item.Parent_container_id.AI.length <= _activeAI.length) {
                let result = [];

                this.parentLoop(item.Parent_container_id.AI, (ele) => {
                  this.parentLoop(_activeAI, (ele2) => {
                    if (ele2 === ele) result.push(true);
                    else result.push(false);
                  });
                });
                if (!result.includes(true)) {
                  // console.log(item.Service_id);
                  if (item.Category === "Analytics") {
                    // console.log("CATEGORY IS ANALYTIC " + item.Service_id);
                    this.toggleAnalytics2(data_ele, item);
                  } else {
                    let intersection = item.Parent_container_id.AI.filter(
                      (x) => !_activeAI.includes(x)
                    );
                    let add = _activeAI.length + intersection.length;
                    if (deepStreamLimit < add) {
                      // console.log("disable4: " + item.Service_id);
                      data_ele.disabledService.push(item.Service_id);
                      data_ele.disabledService = [
                        ...new Set(data_ele.disabledService),
                      ];
                    } else {
                      // console.log("enable4: " + item.Service_id);
                      let uniqueD = [...new Set(data_ele.disabledService)];
                      var ucIndex = uniqueD.indexOf(item.Service_id);
                      // console.log(ucIndex);
                      if (ucIndex >= 0) {
                        uniqueD.splice(ucIndex, 1);
                        data_ele.disabledService = [...uniqueD];
                      }
                    }
                  }
                } else {
                  if (item.Category === "Analytics") {
                    // console.log("CATEGORY IS ANALYTIC " + item.Service_name);
                    this.toggleAnalytics2(data_ele, item);
                  } else {
                    let intersection = item.Parent_container_id.AI.filter(
                      (x) => !_activeAI.includes(x)
                    );
                    let add = _activeAI.length + intersection.length;
                    if (deepStreamLimit < add) {
                      // console.log("disable7: " + item.Service_id);
                      data_ele.disabledService.push(item.Service_id);
                      data_ele.disabledService = [
                        ...new Set(data_ele.disabledService),
                      ];
                    } else {
                      // console.log("enable7: " + item.Service_id);
                      let uniqueD = [...new Set(data_ele.disabledService)];
                      var ucIndex = uniqueD.indexOf(item.Service_id);
                      // console.log(ucIndex);
                      if (ucIndex >= 0) {
                        uniqueD.splice(ucIndex, 1);
                        data_ele.disabledService = [...uniqueD];
                      }
                    }
                  }
                }
              } else {
                data_ele.disabledService.push(item.Service_id);
                data_ele.disabledService = [
                  ...new Set(data_ele.disabledService),
                ];
              }
            });
          } else {
            // console.log("DS LIMIT NOT REACHED V2");
            this.parentLoop(_service, (item) => {
              if (item.Parent_container_id.AI.length <= deepStreamLimit) {
                let result = [];

                this.parentLoop(item.Parent_container_id.AI, (ele) => {
                  this.parentLoop(_activeAI, (ele2) => {
                    if (ele2 === ele) result.push(true);
                    else result.push(false);
                  });
                });
                // console.log(item.Service_id);
                // console.log(result);
                if (!result.includes(true)) {
                  // console.log(item.Service_id);
                  if (item.Category === "Analytics") {
                    // console.log("CATEGORY IS ANALYTIC " + item.Service_id);
                    this.toggleAnalytics2(data_ele, item);
                  } else {
                    let intersection = item.Parent_container_id.AI.filter(
                      (x) => !_activeAI.includes(x)
                    );
                    let add = _activeAI.length + intersection.length;
                    if (deepStreamLimit < add) {
                      // console.log("disable4: " + item.Service_id);
                      data_ele.disabledService.push(item.Service_id);
                      data_ele.disabledService = [
                        ...new Set(data_ele.disabledService),
                      ];
                    } else {
                      // console.log("enable4: " + item.Service_id);
                      let uniqueD = [...new Set(data_ele.disabledService)];
                      var ucIndex = uniqueD.indexOf(item.Service_id);
                      // console.log(ucIndex);
                      if (ucIndex >= 0) {
                        uniqueD.splice(ucIndex, 1);
                        data_ele.disabledService = [...uniqueD];
                      }
                    }
                  }
                } else {
                  if (item.Category === "Analytics") {
                    // console.log("CATEGORY IS ANALYTIC " + item.Service_name);
                    this.toggleAnalytics2(data_ele, item);
                  } else {
                    let intersection = item.Parent_container_id.AI.filter(
                      (x) => !_activeAI.includes(x)
                    );
                    let add = _activeAI.length + intersection.length;
                    if (deepStreamLimit < add) {
                      // console.log("disable7: " + item.Service_id);
                      data_ele.disabledService.push(item.Service_id);
                      data_ele.disabledService = [
                        ...new Set(data_ele.disabledService),
                      ];
                    } else {
                      // console.log("enable7: " + item.Service_id);
                      let uniqueD = [...new Set(data_ele.disabledService)];
                      var ucIndex = uniqueD.indexOf(item.Service_id);
                      // console.log(ucIndex);
                      if (ucIndex >= 0) {
                        uniqueD.splice(ucIndex, 1);
                        data_ele.disabledService = [...uniqueD];
                      }
                    }
                  }
                }
              } else {
                data_ele.disabledService.push(item.Service_id);
                data_ele.disabledService = [
                  ...new Set(data_ele.disabledService),
                ];
              }
            });
          }
        }
      }
    });

    // this.parentLoop(_data, (data_ele) => {
    //   this.parentLoop(_service, (_service_ele) => {
    //     data_ele.disabledService.push(_service_ele.Service_id);
    //     data_ele.disabledService = [...new Set(data_ele.disabledService)];
    //   });
    // });
    console.log(_data);
    this.setState({ data: _data });
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
    }
    this.setState(
      {
        data: _data,
      },
      () => console.log(this.state)
    );
  };
  componentDidMount() {
    // this.getCameraLimit();
    this.onLoad();
  }

  // vikas..............................

  // getCameraLimit = async () => {
  //   await api.getAPI("/base/device", (res, status) => {
  //     if (status == 200) {
  //       this.getServices();
  //       console.log(res.Limitations);
  //       usecaseLimit = res.Limitations.Usecase;
  //       deepStreamLimit = res.Limitations.Deepstream;

  //       console.log(usecaseLimit, deepStreamLimit);
  //     } else {
  //       console.log("error provision");
  //     }
  //   });
  // };

  // getServices = async () => {
  //   api.getAPI("/camera/get_services_all", (res, status) => {
  //     if (status == 200) {
  //       this.getCameraSlots();
  //       this.setState({ Service: res.Services });
  //       console.log(res.Services);
  //     } else {
  //       console.log("error");
  //     }
  //   });
  // };

  // getCameraSlots = async () => {
  //   api.getAPI("/camera/get_all_slots", (res, status) => {
  //     if (status == 200) {
  //       console.log(res);
  //       this.setState({ apiData: res }, () => {
  //         this.onLoad();
  //       });
  //     } else {
  //       console.log("error");
  //     }
  //   });
  // };

  // submitCameraSlots = async () => {
  //   let finalObj = {};
  //   let UCArray = [];
  //   this.state.data.map((items, index) => {
  //     console.log(items.slot);

  //     if (items.Usecases.length > 0) {
  //       items.Usecases.map((uc, ucind) => {
  //         UCArray.push(uc);
  //       });

  //       console.log("is grater");
  //       let aiSet = [...new Set(items.AI)];
  //       let ucSet = [...new Set(items.Usecases)];
  //       let dpSet = [...new Set(items.Dependent)];
  //       finalObj[items.slot] = {
  //         Usecases: ucSet,
  //         Dependent: dpSet,
  //         AI: aiSet,
  //       };
  //     } else {
  //       finalObj[items.slot] = {};
  //     }
  //     console.log(finalObj);
  //   });

  //   let body = {
  //     CameraID: localStorage.getItem("camid"),
  //     Timeslots: finalObj,
  //   };
  //   let arrset = [...new Set(UCArray)];
  //   console.log(arrset);
  //   api.postAPI(body, "/camera/send_camera_slots", (res, status) => {
  //     if (status == 200) {
  //       console.log(res);
  //       alert("success");
  //       this.props.history.push({
  //         pathname: "/setting",
  //         state: { arr: arrset },
  //       });
  //     } else {
  //       alert("Failed to save");
  //     }
  //   });
  // };

  render() {
    return (
      <div className="addCamera">
        {/* {console.log(this.state)} */}
        {/* <div className="header"> */}
        {/* <img src={logo} className="logo" /> */}
        {/* </div> */}
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
              <p>24</p>
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
                      ? "child activeslot"
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
                <span className="name">{service_item.Service_name}</span>
                {/* <pre>
                  {JSON.stringify(service_item.Parent_container_id.AI, null, 4)}
                </pre> */}
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
                          ? "child activeslot"
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
          <div className="submit_num">
            <button
              onClick={() => this.submitCameraSlots()}
              className="addCame_save_btn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

//NOTE:
//Remove duplicate from Dependent Array onSubmit

// export default withRouter(AddCamera);
export default AddCamera2;
