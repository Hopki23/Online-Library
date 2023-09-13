import Home from './components/Home/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
         <Home/>
      </div>
      <Routes>
          {/* <Route path='/catalog' element={<Body/>}></Route>
          <Route path='/books' element={<Books/>}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
