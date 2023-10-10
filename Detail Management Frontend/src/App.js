import './App.css';
import {Routes, Route} from 'react-router-dom'
import Owners from './pages/owners/owners';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/owners' element={<Owners />} />
      </Routes>
    </div>
  );
}

export default App;
