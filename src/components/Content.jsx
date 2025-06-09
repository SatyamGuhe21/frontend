import React from 'react'
import "../styles/content.css" 
import Card from './HomeCard'
import TeacherList from './TeacherList'

const Content = () => {
  return (
    <div>
        <div className="content">
            <Card/>
            <TeacherList/>
        </div>
    </div>
  )
}

export default Content;