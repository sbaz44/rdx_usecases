import {useState} from 'react'

import Card from "../components/Card"
import modulelist from "../modulelist.json"
import services from "../services.json"
import limits from "../limits.json"
import serviceCameraMap from "../serviceCameraMap.json"
import "./Page1.css"

const Page1 = () => {
    const hardLimits = limits["details"]["Limitations"]
    const aiModelLimit = hardLimits["Deepstream"]
    const usecaseLimit = hardLimits["Usecase"]
    const camera_id = "CAM1"
    var scheduleBaseMemory = 2000
    var unscheduleBaseMemory = 2000
    const maxMemory = 4000

    const globalScheduleDetails = modulelist["details"]["globallyActive"]
    const localScheduleDetails = modulelist["details"]["locallyActive"]

    const serviceCameraMapping = serviceCameraMap["details"]

    const currentglobalScheduleDetails = {
        "ScheduledUC": {},
        "ScheduledDP": {},
        "UnScheduledUC": {},
        "UnScheduledDP": {}
    }

    const scheduleUCCopy = {...globalScheduleDetails["ScheduledUC"]}
    const scheduleDPCopy = {...globalScheduleDetails["ScheduledDP"]}
    const unscheduleUCCopy = {...globalScheduleDetails["UnScheduledUC"]}
    const unscheduleDPCopy = {...globalScheduleDetails["UnScheduledDP"]}
    
    const usecasesMetadata = services["details"]

    const updateUsecasesMetadata = (totalMemory, usecaseHours, modelHours, checkCheckboxType, updateCheckboxType) => {
        var usecasesList = localScheduleDetails[usecaseHours]
        var aiModelList = localScheduleDetails[modelHours]  
        var usecaseListCopy = usecaseHours === "ScheduledUC" ? scheduleUCCopy : unscheduleUCCopy

        Object.keys(usecasesMetadata).map(
            service => {
                if (usecasesMetadata[service]["type"] === "Usecase") {
                    var parent_ids = [...usecasesMetadata[service]["Parent_container_id"]]

                    var currentMemory = usecasesMetadata[service]["memory"]
                    parent_ids.map(
                        parent => {
                            if (!Object.keys(aiModelList).includes(parent)) {
                                currentMemory += usecasesMetadata[parent]["memory"]
                            }
                        }
                    )
                    
                    if (!Object.keys(usecasesList).includes(service) && totalMemory + currentMemory > maxMemory) {
                        usecasesMetadata[service][updateCheckboxType] = true
                        return service
                    }
                    
                    if (Object.keys(aiModelList).length === aiModelLimit) {
                        parent_ids.map(
                            parent => {
                                if (!Object.keys(aiModelList).includes(parent)) {
                                    usecasesMetadata[service][updateCheckboxType] = true
                                }
                                return parent   
                            }
                        )
                    }
                    else {
                        usecasesMetadata[service][updateCheckboxType] = false
                    }
                    
                    if (Object.keys(usecasesList).length === usecaseLimit && 
                        !usecasesMetadata[service][checkCheckboxType] && 
                        !Object.keys(usecaseListCopy).includes(service)) {
                        usecasesMetadata[service][updateCheckboxType] = true
                    }
                    else if (usecasesMetadata[service][updateCheckboxType]) {
                        usecasesMetadata[service]["Parent_container_id"].map(
                            parent => {
                                if (Object.keys(aiModelList).includes(parent)) {
                                    usecasesMetadata[service][updateCheckboxType] = false
                                }
                                return parent
                            }
                        )
                    }
                    return service
                }
            }
        )
        return 1
    }

    const onChecked = (usecase, usecaseHours, modelHours) => {
        var tempScheduleUsecaseDetails = {...localScheduleDetails[usecaseHours]}
        var tempScheduleModelDetails = {...localScheduleDetails[modelHours]}

        usecasesMetadata[usecase]["Parent_container_id"].map(
            parent_id => {
                if (!Object.keys(tempScheduleModelDetails).includes(parent_id)) {
                    tempScheduleModelDetails[parent_id] = usecasesMetadata[parent_id]["memory"]
                }
                return tempScheduleModelDetails
            }
        )

        tempScheduleModelDetails = {...tempScheduleModelDetails}

        if (!Object.keys(tempScheduleUsecaseDetails).includes(usecase)) {
            tempScheduleUsecaseDetails[usecase] = usecasesMetadata[usecase]["memory"]
        }  

        return [tempScheduleUsecaseDetails, tempScheduleModelDetails]
    }

    const onUnchecked = (usecase, usecaseHours, modelHours, checkCheckboxType) => {
        var usecaseListCopy = usecaseHours === "ScheduledUC" ? scheduleUCCopy : unscheduleUCCopy
        var aiModelListCopy = usecaseHours === "ScheduledUC" ? scheduleDPCopy : unscheduleDPCopy

        var usecasesList = localScheduleDetails[usecaseHours]
        var aiModelList = localScheduleDetails[modelHours]  

        var hours = usecaseHours === "ScheduledUC" ? "scheduleHours" : "unscheduleHours"
        var runningCameras = []

        if (Object.keys(serviceCameraMapping).includes(usecase)) {
            runningCameras = serviceCameraMapping[usecase][hours]
        }

        // if (!Object.keys(usecaseListCopy).includes(usecase) || 
        //     (Object.keys(usecaseListCopy).includes(usecase) && 
        //         runningCameras.length === 1 && 
        //         runningCameras.includes(camera_id)
        //     )) {
        var newUsecaseList = {...usecasesList}
        delete newUsecaseList[usecase]
        usecasesList = {...newUsecaseList}

        usecasesMetadata[usecase]["Parent_container_id"].map(
            parent_id => {
                // if (!Object.keys(aiModelListCopy).includes(parent_id)) {

                var contains = false

                if (usecasesList !== undefined) {

                    Object.keys(usecasesList).map(
                        running_usecase => {

                            if (usecasesMetadata[running_usecase]["Parent_container_id"].includes(parent_id) &&
                                usecasesMetadata[running_usecase][checkCheckboxType]) {
                                contains = true
                            }
                            return running_usecase
                        }
                    )
                }
                
                if (!contains) {
    
                    var newAiModelList = {...aiModelList}
                    delete newAiModelList[parent_id]
                    aiModelList = {...newAiModelList} 
                } 
                // }
                return parent_id
            }
        )
        // }
        console.log(usecasesList, aiModelList)
        return [usecasesList, aiModelList]
    }

    const onScheduledChange = (checked, usecase) => {
        var scheduleUsecaseDict = undefined
        var scheduleModelDict = undefined
        var totalMemory = undefined

        usecasesMetadata[usecase]["scheduleChecked"] = checked

        if (checked) {
            [scheduleUsecaseDict, scheduleModelDict] = onChecked(usecase, "ScheduledUC", "ScheduledDP")  
        }

        else if (!checked) {
            [scheduleUsecaseDict, scheduleModelDict] = onUnchecked(usecase, "ScheduledUC", "ScheduledDP", "scheduleChecked") 
        }

        totalMemory = scheduleBaseMemory
        console.log(totalMemory)

        Object.keys(scheduleUsecaseDict).map(usecase => {
            if (!Object.keys(scheduleUCCopy).includes(usecase)){
                totalMemory += usecasesMetadata[usecase]["memory"]
            }
        })

        Object.keys(scheduleModelDict).map(parent => {
            if (!Object.keys(scheduleDPCopy).includes(parent)){
                totalMemory += usecasesMetadata[parent]["memory"]
            }
        })

        if (
            Object.keys(serviceCameraMapping).includes(usecase) && 
            serviceCameraMapping[usecase]["scheduleHours"].length > 1 &&
            serviceCameraMapping[usecase]["scheduleHours"].includes(camera_id)
        ) {
            totalMemory += usecasesMetadata[usecase]["memory"]
        }  

        localScheduleDetails["ScheduledUC"] = {...scheduleUsecaseDict}
        localScheduleDetails["ScheduledDP"] = {...scheduleModelDict}

        console.log(totalMemory, scheduleUsecaseDict, scheduleModelDict)

        updateUsecasesMetadata(totalMemory, "ScheduledUC", "ScheduledDP", "scheduleChecked", "disableScheduleCheckbox")
        setUsecaseWithChoices(getUsecaseWithChoices())        
    }

    const onUnscheduledChange = (checked, usecase) => {
        var unScheduleUsecaseDict = undefined
        var unScheduleModelDict = undefined
        var totalMemory = undefined

        usecasesMetadata[usecase]["unScheduleChecked"] = checked

        if (checked) {
            [unScheduleUsecaseDict, unScheduleModelDict] = onChecked(usecase, "UnScheduledUC", "UnScheduledDP")  

            totalMemory = unscheduleBaseMemory

            Object.keys(unScheduleUsecaseDict).map(usecase => {
                if (!Object.keys(unscheduleUCCopy).includes(usecase)){
                    totalMemory += usecasesMetadata[usecase]["memory"]
                }
            })

            Object.keys(unScheduleModelDict).map(parent => {
                if (!Object.keys(unscheduleDPCopy).includes(parent)){
                    totalMemory += usecasesMetadata[parent]["memory"]
                }
            })
        }

        else if (!checked) {
            [unScheduleUsecaseDict, unScheduleModelDict] = onUnchecked(usecase, "UnScheduledUC", "UnScheduledDP", "unScheduleChecked") 
        }

        localScheduleDetails["UnScheduledUC"] = {...unScheduleUsecaseDict}
        localScheduleDetails["UnScheduledDP"] = {...unScheduleModelDict}

        updateUsecasesMetadata(totalMemory, "UnScheduledUC", "UnScheduledDP", "unScheduleChecked", "disableUnscheduleCheckbox")
        setUsecaseWithChoices(getUsecaseWithChoices())
    }

    const getUsecaseWithChoices = () => {
        var tempUsecaseWithChoices = []

        // updateUsecasesMetadata(baseMemory, "ScheduledUC", "ScheduledDP", "scheduleChecked", "disableScheduleCheckbox")

        Object.keys(usecasesMetadata).map(
            service => {
                if (usecasesMetadata[service]["type"] === "Usecase") {
                    
                    var disableScheduleCheckbox = usecasesMetadata[service]["disableScheduleCheckbox"]
                    var disableUnscheduleCheckbox = usecasesMetadata[service]["disableUnscheduleCheckbox"]
                    var scheduleTotalMemory = scheduleBaseMemory
                    var unscheduleTotalMemory = unscheduleBaseMemory
                    var scheduleParentIds = [...Object.keys(scheduleDPCopy)]
                    var unscheduleParentIds = [...Object.keys(unscheduleDPCopy)]

                    if (usecasesMetadata[service]["Parent_container_id"].length > aiModelLimit) {
                        disableScheduleCheckbox = true
                        disableUnscheduleCheckbox = true                        
                    }                    

                    if (!Object.keys(scheduleUCCopy).includes(service)) {
                        scheduleTotalMemory += usecasesMetadata[service]["memory"]
                    }

                    if (!Object.keys(unscheduleUCCopy).includes(service)) {
                        unscheduleTotalMemory += usecasesMetadata[service]["memory"]
                    }

                    usecasesMetadata[service]["Parent_container_id"].map(
                        parent => {
                            if (!Object.keys(scheduleDPCopy).includes(parent)) {
                                scheduleTotalMemory += usecasesMetadata[parent]["memory"]
                                scheduleParentIds.push(parent)
                            }

                            if (!Object.keys(unscheduleDPCopy).includes(parent)) {
                                unscheduleTotalMemory += usecasesMetadata[parent]["memory"]
                                unscheduleParentIds.push(parent)
                            }
                            return parent
                        }
                    )

                    if (Object.keys(localScheduleDetails["ScheduledUC"]).includes(service)) {
                        usecasesMetadata[service]["scheduleChecked"] = true
                    }
                    if (Object.keys(localScheduleDetails["UnScheduledUC"]).includes(service)) {
                        usecasesMetadata[service]["unScheduleChecked"] = true
                    }

                    if (scheduleTotalMemory > maxMemory || scheduleParentIds.length > aiModelLimit) {
                        disableScheduleCheckbox = true                       
                    }
                    
                    if (unscheduleTotalMemory > maxMemory || unscheduleParentIds.length > aiModelLimit) {
                        disableUnscheduleCheckbox = true                        
                    }

                    // console.log(service, scheduleTotalMemory, unscheduleTotalMemory)

                    tempUsecaseWithChoices.push(
                        <Card 
                            key={usecasesMetadata[service]["service_id"]}
                            usecase={service}
                            cardTitle={usecasesMetadata[service]["service_name"]} 
                            onScheduledChange={onScheduledChange}
                            onUnscheduledChange={onUnscheduledChange}
                            scheduleChecked={usecasesMetadata[service]["scheduleChecked"]}
                            unScheduleChecked={usecasesMetadata[service]["unScheduleChecked"]}
                            scheduleDisable={disableScheduleCheckbox}
                            unScheduleDisable={disableUnscheduleCheckbox}
                        />
                    )
                    
                    // updateUsecasesMetadata(totalMemory, "ScheduledUC", "ScheduledDP", "scheduleChecked", "disableScheduleCheckbox")
                    // updateUsecasesMetadata(totalMemory, "UnScheduledUC", "UnScheduledDP", "unScheduleChecked", "disableUnscheduleCheckbox")

                    return service
                }       
            }
        )
        
        return tempUsecaseWithChoices
    }

    const onSubmitClick = () => {
        console.log("clicked")
        Object.keys(usecasesMetadata).map(
            usecase => {
                if (usecasesMetadata[usecase]["scheduleChecked"]) {
                    if (!currentglobalScheduleDetails["ScheduledUC"].includes(usecase)) {
                        currentglobalScheduleDetails["ScheduledUC"].push(usecase)
                    }
                    usecasesMetadata[usecase]["Parent_container_id"].map(
                        parent => {
                            if (!currentglobalScheduleDetails["ScheduledDP"].includes(parent)) {
                                currentglobalScheduleDetails["ScheduledDP"].push(parent)
                            }
                            return parent
                        }
                    )
                    
                }
                if (usecasesMetadata[usecase]["unScheduleChecked"]) {
                    if (!currentglobalScheduleDetails["UnScheduledUC"].includes(usecase)) {
                        currentglobalScheduleDetails["UnScheduledUC"].push(usecase)
                    }
                    usecasesMetadata[usecase]["Parent_container_id"].map(
                        parent => {
                            if (!currentglobalScheduleDetails["UnScheduledDP"].includes(parent)) {
                                currentglobalScheduleDetails["UnScheduledDP"].push(parent)
                            }
                            return parent
                        }
                    )
                    
                }
                return usecase
            }
        )
        console.log(currentglobalScheduleDetails)
    }

    const [usecaseWithChoices, setUsecaseWithChoices] = useState(getUsecaseWithChoices())

    return (
        <div>
            <div className="page1">
                {usecaseWithChoices}
            </div>
            <div className="submit">
                <button type="submit" onClick={onSubmitClick} >Submit</button>
            </div>
        </div>
        
    )
}

export default Page1
