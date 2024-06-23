import './App.css'
import {
  Home
} from './views/index.js'
import {Routes, Route} from 'react-router-dom';
import NavBar from "./components/navBar/NavBar";

function App() {

  return (
    <>
      <div className='App'>
        <NavBar />
        <Routes>
          {/* home */}
          <Route path='/' element={<Home />} />
          {/* teams */}
          <Route path='/teams' />
        </Routes>
          {/* error */}
          {/* <Route path='*' element={< */}
      </div>
    </>
  )
}

export default App
