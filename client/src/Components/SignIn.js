import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios';
import React, { useState } from 'react'

const SignIn = ({ setShowSignIn, myStorage, setCurrentUser }) => {

    const [error, setError] = useState(false);
    const [username, setuserName] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        }
        try {
            const res = await axios.post('/users/signin', user);
            myStorage.setItem("user", res.data.username);
            setCurrentUser(res.data.username);
            setShowSignIn(false)
            setError(false);
        }
        catch (err) {
            setError(true);
        }
    }

    return (
        <div className='signInCard'>
            <div className='logo'>
                <Room />
                Travel Log
            </div>
            <form onSubmit={handleSignIn}>
                <input required minLength={3} type="text" placeholder='username' onChange={(e) => setuserName(e.target.value)} />
                <input required minLength={8} type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button className='logBtn' type="submit">Sign In</button>
                {error && (
                    <span className='failure'>Something went wrong</span>
                )}
            </form>
            <Cancel className='logCancel' onClick={() => setShowSignIn(false)} />
        </div>
    )
}

export default SignIn