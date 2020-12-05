import React, {
  createContext, 
  useReducer, 
  useContext,
  useEffect
} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom'

import './app.css'

import Home from './pages/Home'
import Authentication from './pages/Authentication'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Courses from './pages/Courses'
import AddCourse from './pages/AddCourse'
import Topics from './pages/Students'
import CourseDetails from './pages/CourseDetails'
import Instructors from './pages/Instructors'
import Tests from './pages/Tests'
import Students from './pages/Students'
import AddTest from './pages/AddTest'
import TestQuestions from './pages/TestQuestions'

import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem("admin"))
  useEffect(() => {
    if(user){
      dispatch({type: "USER", payload: user})
      // history.push('/classroom')
    } else{
      // history.push('/')
    }
  }, [])
  
  return(
    <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/authentication/' component={Authentication} />
          
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset-password/:token' component={ResetPassword} />
          <Route path='/courses' component={Courses} />
          <Route path='/add-course' component={AddCourse} />
          <Route path='/topics' component={Topics} />
          <Route path='/course-details/:postId' component={CourseDetails} />
          <Route path='/instructors' component={Instructors} />
          <Route path='/tests' component={Tests} />
          <Route path='/students' component={Students} />
          <Route path='/add-test' component={AddTest} />
          <Route path='/test-questions/:testId' component={TestQuestions} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
