import React from 'react';
import Footer from './Footer';
import Slogan from './Slogan'
import SifterH1 from './SifterH1';
import HomePageLogo from './HomePageLogo';

const Home = () => {
  return ( 
    <div className='container'>
      <SifterH1 />
      <Slogan />
      <HomePageLogo />
      <Footer />
    </div>
   );
}
 
export default Home;