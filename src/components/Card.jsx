import React from 'react'

import "./Card.css"

const Card = ({usecase, cardTitle, onScheduledChange, onUnscheduledChange, scheduleChecked, unScheduleChecked, scheduleDisable, unScheduleDisable}) => {
    
    const onScheduledClicked = (e) => {
        onScheduledChange(e.target.checked, usecase)
    }

    const onUnscheduledClicked = (e) => {
        onUnscheduledChange(e.target.checked, usecase)
    }

    return (
        <div className="card">
            <h3>{cardTitle}</h3>
            <input 
                type="checkbox" 
                id="scheduled" 
                name="scheduled" 
                value="scheduled"
                onChange={onScheduledClicked}
                checked={scheduleChecked}
                disabled={scheduleDisable}
            />
            <label> Scheduled</label><br></br>
            <input 
                type="checkbox" 
                id="unscheduled" 
                name="unscheduled" 
                value="unscheduled" 
                onChange={onUnscheduledClicked}
                checked={unScheduleChecked}
                disabled={unScheduleDisable}
            />
            <label> Unscheduled</label><br></br>
        </div>
    )
}

export default Card
