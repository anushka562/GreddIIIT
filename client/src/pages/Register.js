import {useState, useEffect} from 'react'
import {Logo, FormRow, Alert} from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    // global state and useNavigate
    const navigate = useNavigate();
    const {user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext();

    const handleChange = (e)=>{
        // console.log(e.target);
        setValues({...values, [e.target.name]:e.target.value})
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        const {firstName, lastName, email, password, isMember} = values;
        if(!email || !password || (!isMember && !firstName)){
            displayAlert();
            return;
        }
        const currentUser = {firstName, lastName, email, password}
        if(isMember){
          loginUser(currentUser);
        } else{
          registerUser(currentUser);
        }
        // console.log(values);
    }

    const toggleMember = ()=>{
        setValues({...values, isMember:!values.isMember})
    }

    useEffect(()=>{
      if(user){
        setTimeout(()=>{
          navigate('/')
        }, 3000)
      }
    }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {showAlert && <Alert/>}

        {/* name input */}
        {!values.isMember && 
        <FormRow labelText='First Name' name='firstName' type='text' handleChange={handleChange} value={values.firstName}/>
        }
        {!values.isMember && 
        <FormRow labelText='Last Name' name='lastName' type='text' handleChange={handleChange} value={values.lastName}/>
        }
        <FormRow name='email' type='email' handleChange={handleChange} value={values.email}/>
        <FormRow name='password' type='password' handleChange={handleChange} value={values.password}/>

        <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>

        <p>
            {values.isMember?'Not a member yet? ':'Already a Member? '}
            <button type='button' onClick={toggleMember} className='member-btn'>{values.isMember?'Register':'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register