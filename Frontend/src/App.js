import './App.css';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './components/home/Home';
import Form from './components/form/Lala';
function App() {
  const [navMobile] = useState(false);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      delay: 200,
    });
  }
  );

  return (
    <div className='overflow-hidden'>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
