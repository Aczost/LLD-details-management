import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Divider, Layout, Space} from 'antd';

import Owners from './pages/owners/owners';
import Dashboard from './pages/dashboard/dashboard';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="App">
      <Space direction="vertical" style={{width: '100%'}} size={[0, 48]}>
        <Layout>
          <Navbar />
          <Divider style={{marginTop: '0px'}}/>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/owners' element={<Owners />} />
          </Routes>
          <Footer />
        </Layout>
      </Space>
    </div>
  );
}

export default App;
