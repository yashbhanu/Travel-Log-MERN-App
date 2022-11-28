import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios';
import React, { useState } from 'react'

const SignUp = ({setShowSignUp}) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [username, setuserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password,
        }
        try {
            await axios.post('/users/signup', newUser);
            setError(false);
            setSuccess(true)
        }
        catch (err) {
            setError(true);
        }
    }

  return (
    <div className='signUpCard'>
        <div className='logo'>
            <Room />
            Travel Log
        </div>
        <form onSubmit={handleSignUp}>
            <input required minLength={3} type = "text" placeholder='username' onChange={(e) => setuserName(e.target.value)} />
            <input required type = "email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input required minLength={8} type = "password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <button className='regBtn' type = "submit">Sign Up</button>
            {success && (
            <span className='success'>Successfully Signed Up! You can now SignIn </span>
            )}
            {error && (
            <span className='failure'>Something went wrong</span>
            )}
        </form>
        <Cancel className='regCancel' onClick = {() => setShowSignUp(false)} />
    </div>
  )
}

export default SignUp