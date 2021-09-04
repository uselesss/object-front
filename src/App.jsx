import {useEffect, useState} from "react";

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameDirty, setUsernameDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [usernameError, setUsernameError] = useState('Email can not be empty')
    const [passwordError, setPasswordError] = useState('Password can not be empty')
    const [formValid, setFormValid] = useState(false)
    useEffect(()=>{
        if(usernameError||passwordError) {
        setFormValid(false) }else {setFormValid(true)
        }
    },[usernameError || passwordError])

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (username!=null)
            setUsernameError("")
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError('Password must be longer 3 and shorter than 8 symbols')
            if (!e.target.value) {setPasswordError('Password can not be empty')}
        } else
            setPasswordError('')
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsernameDirty(true)
                break
            case 'password' :
                setPasswordDirty(true)
                break
        }
    }
    return(
        <div className='app'>
            <form>
                <h1>Авторизация</h1>
                {(usernameDirty && passwordDirty) && <div style={{color:'red'}}>{usernameError}</div>}
                <input onChange={e => usernameHandler(e)} value = {username} onBlur= {e=>blurHandler(e)}name='username' type='text' placeholder='Enter your email.....'/>
                {(passwordError && passwordDirty)&& <div style={{color:'red'}}>{passwordError}</div>}
                <input onChange={e=> passwordHandler(e)} value = {password} onBlur= {e=>blurHandler(e)}name='password' type='password' placeholder='Enter your password....'/>
                <button disabled={!formValid} type='submit' on click >Registration</button>
            </form>
        </div>
    )

}

export default App;