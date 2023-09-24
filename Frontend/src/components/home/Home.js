import '../../App.css';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Hero from '../hero/Hero'
import Stats from '../stats/Stats';
import Why from '../stats/Why';
import Trade from '../sections/Trade';
import { useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Features from '../sections/Features';
import NewsLetter from '../sections/NewsLetter';
import Form from '../form/Lala';
function Home() {
  //state management
  const [navMobile] = useState(false);
  //aos init
  useEffect(() => {
    Aos.init({
      duration: 2500,
      delay: 400,
    });
  }
  );

  return (
    <div className='overflow-hidden'>
      <Hero />
      {/* Mobile Nav */}
      <div className={`${navMobile ? 'right-0' : '-right-full'} fixed z-10 top-0 h-full transition-all duration-200`}>
      </div>
      <Stats />
      <Why />      <Trade />
      <Features />
      <NewsLetter />
    </div>
  );
}

export default Home;
