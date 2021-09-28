import React from 'react';
import sifter from '../images/sifting-flour.jpeg';

const Home = () => {
  return ( 
    <div className='container'>
      <h1>Sifter App</h1>
      <img src={sifter} alt='sifter logo' />
      <p>an app for separating wanted crypto from the digital heap.</p>
      <h1>Other ideas</h1>
      <p>we should also consider having header and footer components to plop into app.js</p>
      <p>maybe add a forgot password and password resent functionality to login page ???</p>
    </div>
   );
}
 
export default Home;