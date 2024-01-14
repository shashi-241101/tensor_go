import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Topbar from './Pages/Topbar';
import Login from './Pages/Login';
import Dashboard from './Dashboard';
import Error from './Pages/Error';

function App() {
  return (
    <Router>
      <>
        <Topbar />
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
