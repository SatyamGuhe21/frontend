import React from 'react'
import "../styles/content.css" 
import Card from '../components/HomeCard'
import CompletedTaskList from './CompletedTaskList'

const CompletedTask = () => {
  return (
    <div>
        <div className="content">
            <Card/>
            <CompletedTaskList/>
        </div>
    </div>
  )
}

export default CompletedTask;