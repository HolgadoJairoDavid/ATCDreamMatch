import './App.css'
import {
  Home,
  Teams,
  Error,
  Detail
} from './views/index.js'
import {Routes, Route} from 'react-router-dom';

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

          {/* detail */}
          <Route path='/detail/:id' element={<Detail />} />

        </Routes>
      </div>
    </>
  )
}

export default App
