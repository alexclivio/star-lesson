import React from 'react'
import sendQuery from './sendQuery'
import {Star} from './Star'

const UserHome = (props) => {
  const [lessons, setLessons] = React.useState([])
  const [enrolled, setEnrolled] = React.useState(props.login['lessons'] || [])
  const [loadPage, setLoadPage] = React.useState(true)

  React.useEffect(() => {
    loadLessons()
  }, [])

  const loadLessons = () => {
    sendQuery(`{lessons{title, value}}`).then(data => {
      setLessons(data.lessons)
      setLoadPage(false)
    }); 
  } 

  const enrolledMap = enrolled.reduce((acc, lesson) => {
    acc[lesson.title] = true
    return acc
  }, {})

  const unenrolled = lessons.filter((lesson) => {
    if(enrolledMap[lesson.title]) {
      return false
    }
    return true
  })

  const starRating = (starValue, titleName) => {
    // console.log('title: ' + titleName + ' starValue: ' + starValue);
    sendQuery(`mutation{setStar(title:"${titleName}", value:${starValue}){title, value}}`).then(data => {
      // console.log('ANTHONY: ' + JSON.stringify(data.setStar))
    })
  }

  const loadEnrolled = (e) => {
    sendQuery(`mutation{enrolled(title:"${e.target.textContent}"){title, value}}`).then(data => {
      // console.log(data.enrolled)
      setEnrolled(data.enrolled)
    })
  }

  const removeEnrolled = (e) => {
    sendQuery(`mutation{unenrolled(title:"${e.target.textContent}"){title, value}}`).then(data => {
      setEnrolled(data.unenrolled)
    })
  }

  const lessonsList = unenrolled.map((lesson, i) => {
    return <h4 onClick={loadEnrolled} key={i}>{lesson.title}</h4>
  })

  const enrolledList = enrolled.map((enroll, i) => { 
    console.log('enroll ' + enroll.value)
    return (
      <div>
        <h4 onClick={removeEnrolled} key={i}>{enroll.title}</h4>
        <Star 
          onClick={(starValue)=>starRating(starValue, enroll.title)}
          presetValue={enroll.value}
        />
      </div>
    )
  })

  if(loadPage) {
    return <h1>Loading...</h1>
  }
  
  return (
    <div>
      <h1>{props.login.name}</h1>
      <img src={props.login.image} alt=""/>
      <hr/>
      {enrolled.length !== 0 && <h1>Enrolled</h1>}
      {enrolled.length !== 0 && <h2>Click to Unenroll</h2>}
      {enrolledList}
      <hr/>
      <h1>Not Enrolled</h1>
      <h2>Click to enroll</h2>
      {lessonsList}
    </div>
  ) 
}

export default UserHome