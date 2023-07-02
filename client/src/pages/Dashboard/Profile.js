import { useState } from "react"
import {FormRow, Alert} from '../../components'
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"

const Profile = () => {
  const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [username, setUsername] = useState(user?.username);
  const [age, setAge] = useState(user?.age);
  const [contactNumber, setContactNumber] = useState(user?.contactNumber);
  const [email, setEmail] = useState(user?.email);
  // const [following, setFollowing] = useState(user?.following);
  // const [followers, setFollowers] = useState(user?.followers);

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!firstName || !lastName || !username || !email || !age || !contactNumber){
      displayAlert();
      return 
    }
    updateUser({firstName, lastName, email, username, age, contactNumber});
  }
  
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert/>}

        <div className="form-center">
          <FormRow type='text' labelText='First Name' name='firstName' value={firstName} handleChange={(e)=>setFirstName(e.target.value)}/>
          <FormRow type='text' labelText='Last Name' name='lastName' value={lastName} handleChange={(e)=>setLastName(e.target.value)}/>
          <FormRow type='text' name='username' value={username} handleChange={(e)=>setUsername(e.target.value)}/>
          <FormRow type='text' name='email' value={email} handleChange={(e)=>setEmail(e.target.value)}/>
          <FormRow type='text' name='age' value={age} handleChange={(e)=>setAge(e.target.value)}/>
          <FormRow type='text' labelText='Contact Number' name='contactNumber' value={contactNumber} handleChange={(e)=>setContactNumber(e.target.value)}/>

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
