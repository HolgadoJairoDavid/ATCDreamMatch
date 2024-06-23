import './App.css'
import {
  Home,
  Teams,
  Error
} from './views/index.js'
import {Routes, Route} from 'react-router-dom';
import NavBar from "./components/navBar/NavBar";

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          {/* home */}
          <Route path='/' element={<Home />} />

          {/* teams */}
          <Route path='/teams' element={<Teams />} />

          {/* error */}
          <Route path='*' element={<Error />} />

        </Routes>
      </div>
    </>
  )
}

export default App
