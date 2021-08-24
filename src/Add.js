import React, { Component } from 'react'
import limits from "./limits.json"
import usecases from './data/services.json'
const useCasesAndDS = usecases['data']
const Limits = limits["details"]["Limitations"]
const deepStreamLimit = Limits["Deepstream"]

//check whether value is present inside object of array of object
const arrayIncludesInObj = (arr, key, valueToCheck) => {
    return arr.some(value => console.log(value));
}

const hasParent = (arr) => arr.some(vendor => vendor['Name'] === 'Magenic')

class Add extends Component {
    state = {
        data: useCasesAndDS,
        scheduleChecked: [],
        Deepstream: 0,
    }

    onScheduleClickHandle = (e, item) => {
        let parentContainerArr = item.Parent_container_id
        if (deepStreamLimit >= this.state.Deepstream) {
            // let result = this.state.data.filter(x => x.name == 'Mark' && x.address == 'England');
            let result = []
            for (let i = 0; i < this.state.data.length; i++) {
                arrayIncludesInObj(parentContainerArr)
            }
        }
        else {
            alert('DS limit reached')
        }

    }
    render() {
        return (
            <div>
                {console.log(this.state.data)}
                Add
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {this.state.data.map((item, index) => {
                        if (item.type === "Usecase") {
                            return <div>
                                {item.service_name}
                                <br />
                                <label>
                                    <input
                                        type="checkbox"
                                        id="scheduled"
                                        name="scheduled"
                                        value={item.service_name}

                                        onChange={(e) => this.onScheduleClickHandle(e, item)}
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
                                    />UnScheduled
                                </label>
                            </div>
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default Add
