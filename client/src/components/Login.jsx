import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';

const Login = () => {

  const history = useHistory();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [cookie, setCookie, removeCookie] = useCookies();

  const handleSubmit = (e) => {
    
    e.preventDefault();

    let userInfo = JSON.stringify({
      username: username,
      password: password
    });

    fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userInfo
    })
    .then(res => res.json())
    .then((data) => {

      if (data.token) {

        // console.log('THIS IS DATA ', data)
        setCookie('token', data.token);
        setCookie('loggedIn', true);

        setTimeout(() => {
          removeCookie('loggedIn');
          removeCookie('token');
          history.push('/home');
        }, 3600 * 1000);

        setTimeout(() => {
          alert('For your security => 5 minutes left until auto logout')
        }, 3300 * 1000);

      } else if (data.errorMsg) {
        setErrorMsg(data.errorMsg);
      }
    })
    .catch((err) => console.log(err));
    

    // if(cookie.loggedIn) {
    //   console.log('we logged in')
    // } else {
    //   console.log('nope, not logged in');
    // }
  }

  const handleChange = (e) => {
    if(e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    };
  }

  if(cookie.loggedIn === undefined || cookie.loggedIn === null) {
    history.push('/login')
  } else {
    history.push('/list')
  }

  return ( 
    <div className='container'>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input name='username' type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <Footer />
    </div>
   );
}
 
export default Login;