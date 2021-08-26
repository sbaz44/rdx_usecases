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

        console.log("Checking use case limit");
        let scheduleChecked = [...this.state.scheduleChecked];
        let data = [...this.state.data];

        if (scheduleChecked.length === usecaseLimit) {
            console.log("Usecase limit reached");
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === "Usecase") {
                    if (!scheduleChecked.some((item) => item === data[i].service_name)) {
                        data[i].disableUnscheduleCheckbox = true;
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
                            data[i].disableUnscheduleCheckbox = true;
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
                        for (let j = 0; j < data[i].Parent_container_id.length; j++) {
                            if (data[i].Parent_container_id.length > 1) {
                                // let intersection = this.state.selectedDS.filter((x) =>
                                //   data[i].Parent_container_id.includes(x)
                                // );
                                let result = [];
                                for (let ele of this.state.selectedDS) {
                                    if (ele === data[i].Parent_container_id[j]) {
                                        result.push(true);
                                    } else result.push(false);
                                }
                                if (result.includes(true)) {
                                    if (
                                        !this.state.selectedDS.includes(
                                            data[i].Parent_container_id[j]
                                        )
                                    ) {
                                        data[i].disableScheduleCheckbox = true;
                                        data[i].disableUnscheduleCheckbox = true;
                                    }
                                }
                            } else {
                                // console.log("else................");
                            }
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
        // console.log(this.state.selectedDS);
        // let filteredRes = item.Parent_container_id.filter(
        //   (val) => !this.state.selectedDS.includes(val)
        // );

        // console.log("filteredRes");
        // console.log(filteredRes);

        this.setState({ data, scheduleChecked: result, selectedDS: [] }, () =>
            this.toggleSchduleUsecase()
        );
    };

    // toggleSchduleUsecase = () => {
    //   let data = [...this.state.data];

    //   //to toggle usecase if user checks and uncheck schedule
    //   console.log(this.state.scheduleChecked.length + "<=" + usecaseLimit);
    //   if (this.state.scheduleChecked.length <= usecaseLimit) {
    //     let scheduleChecked = [...this.state.scheduleChecked];
    //     console.log("Usecase limit not reached");
    //     for (let i = 0; i < data.length; i++) {
    //       if (
    //         data[i].type === "Usecase" &&
    //         data[i].Parent_container_id.length <= deepStreamLimit
    //       ) {
    //         if (this.state.scheduleChecked.length > 0) {
    //           //check schedule which is in this.state.scheduleChecked[which are already checked]
    //           if (
    //             !scheduleChecked.some((item) => item === data[i].service_name)
    //           ) {
    //             // console.log("data[i]: " + data[i].service_name);
    //             //returns unchecked schedule

    //             // if (
    //             //   this.state.selectedDS.length <=
    //             //   data[i].Parent_container_id.length
    //             // ) {
    //             console.log(data[i].Parent_container_id.length + ">" + 1);
    //             if (data[i].Parent_container_id.length > 1) {
    //               console.log("data[i]: " + data[i].service_name);

    //               for (let j = 0; j < data[i].Parent_container_id.length; j++) {
    //                 let result = [];
    //                 for (let ele of this.state.selectedDS) {
    //                   console.log(ele + "===" + data[i].Parent_container_id[j]);
    //                   if (ele === data[i].Parent_container_id[j]) {
    //                     // console.log(data[i].Parent_container_id[j]);
    //                     result.push(true);
    //                   } else result.push(false);
    //                 }
    //                 console.log(result);
    //               }

    //               // let result = [];
    //               // for (let j = 0; j < data[i].Parent_container_id.length; j++) {
    //               //   for (let ele of this.state.selectedDS) {
    //               //     if (ele === data[i].Parent_container_id[j]) {
    //               //       // console.log(data[i].Parent_container_id[j]);
    //               //       result.push(true);
    //               //     } else result.push(false);
    //               //   }
    //               //   console.log("data[i]: " + data[i].service_name);
    //               //   // console.log(result.includes(true));
    //               //   console.log(result);
    //               //   if (result.includes(true)) {
    //               //     if (
    //               //       !this.state.selectedDS.includes(
    //               //         data[i].Parent_container_id[j]
    //               //       )
    //               //     ) {
    //               //       data[i].disableScheduleCheckbox = false;
    //               //       data[i].disableUnscheduleCheckbox = false;
    //               //     }
    //               //   }
    //               // }
    //             } else {
    //               // console.log("ELSE data[i]: " + data[i].service_name);
    //             }
    //             // }
    //           } else {
    //             // console.log("toggleSchduleUsecase IFIFIFELSE");
    //             // console.log("data[i]: " + data[i].service_name);
    //             //checking state.selectedDS[] and accessing its value
    //             // data[i].dis;
    //           }
    //         } else {
    //           data[i].disableScheduleCheckbox = false;
    //           data[i].disableUnscheduleCheckbox = false;
    //           this.setState({ selectedDS: [] });
    //           // if (data[i].Parent_container_id.length > deepStreamLimit) {

    //           // }
    //         }

    //         // console.log("data[i]");
    //         // console.log(data[i]);
    //       }
    //       // else {
    //       //   console.log("else..................");
    //       // }
    //     }
    //     this.setState({ data });
    //   }
    // };

    toggleSchduleUsecase = () => {
        let data = [...this.state.data];
        let scheduleChecked = [...this.state.scheduleChecked];

        //to toggle usecase if user checks and uncheck schedule
        console.log(this.state.scheduleChecked.length + "<=" + usecaseLimit);
        // console.log(this.state.scheduleChecked)
        if (this.state.scheduleChecked.length === 0) {
            for (let i = 0; i < data.length; i++) {
                if (
                    data[i].type === "Usecase" &&
                    data[i].Parent_container_id.length <= deepStreamLimit
                ) {
                    data[i].disableScheduleCheckbox = false;
                    data[i].disableUnscheduleCheckbox = false;

                }

            }
            this.setState({ selectedDS: [] });
        }
        else {
            let arr = []
            for (let ele of scheduleChecked) {
                for (let ele2 of data) {
                    console.log(ele2.service_name + " === " + ele)
                    if (ele2.service_name === ele) {
                        arr = [...ele2.Parent_container_id]
                    }
                }
            }
            console.log(arr)
            this.setState({ selectedDS: arr });
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
                                data[i].disableUnscheduleCheckbox = true;
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
            return;
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
                    this.disableUsecaseDSLimitReached(index);
                    // this.handleScheduleCheck(index);
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
