import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Footer from './Footer';

const Register = () => {

    let history = useHistory();

    const [email, setEmail] = useState();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    // const [errorMsg, setErrorMsg] = useState(null);
    // const [successMsg, setSuccessMsg] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let userInfo = JSON.stringify({
            email: email,
            username: username,
            password: password
        });

        await fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userInfo
        })
        .then(res => res.json())
        .then((data) => {
            console.log('register data is ', data)
            if(data.createdUser) {
                history.push('/login')
            } else {
                alert('Sifter registration unsuccessful.  Please try again.')
            }
        })
        .catch((err) => console.log(err));
        
        // if(!errorMsg){
        //     setSuccessMsg('Registration successful.  Happy Sifting')
        // }
    }
    
    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if(e.target.name === 'username') {
            setUserName(e.target.value);
        } else if(e.target.name === 'password') {
            setPassword(e.target.value);  
        } else if(e.target.name === 'repeatPassword') {
            setRepeatPassword(e.target.value);
        };
    }

  return ( 
    <div className='container'>
      <h1 className="text-center">Register</h1>
            
            <form className="text-center border border-light" onSubmit={handleSubmit}>
            
                 <br /> 
                
                <div>
                <label className="form-label">
                    Email:
                    <input type="text" className="form-control" name="email" onChange={handleChange}></input>
                </label>  
                </div>

                <br /> 
                
                <div>
                <label className="form-label">
                    Username:
                    <input type="text" className="form-control" name="username" onChange={handleChange}></input>
                </label>  
                </div>

                <br /> 
                
                <div>
                <label className="form-label">
                    Password:
                    <input type="text" className="form-control" name="password" onChange={handleChange}></input>
                </label>  
                </div>

                <br /> 

                <div>
                <label className="form-label">
                    Repeat Password:
                    <input type="text" className="form-control" name="repeatPassword" onChange={handleChange}></input>
                </label>  
                </div>

                <br /> 

                <div>
                    <button className="btn btn-secondary" type="submit">Submit</button>
                </div>

            </form>

            <Footer />
    </div>
   );
}
 
export default Register;