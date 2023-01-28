import { Link } from "react-router-dom";
import React , {useState} from 'react'
import axios from 'axios'

function SignUp(){
  const [phoneNumber , updatePhoneNumber] = useState();
  const [userName , updateUserName] = useState();
  const [password , updatePassword] = useState();

  const handlePhoneChange = (e)=>{
    updatePhoneNumber(e.target.value);
  }
  const handleUsernameChange = (e)=>{
    updateUserName(e.target.value);
  }
  const handlePasswordChange = (e)=>{
    updatePassword(e.target.value);
  }

  const handleSubmit = async ()=>{
    
    if(phoneNumber<= 999999999 || phoneNumber >= 10000000000 ){
        alert("Enter A Valid Phone Number")
        return;
    }
    try{
      const payload ={
        userName,
        phoneNumber,
        password
      }
      let response = await axios.post("http://localhost:5000/add-user" , payload);
      response = response.data;
      alert(response.message);

    }
    catch(e){
        console.log(e.response.status)
        if(e.response.status == 502){
            alert(e.response.data.message);
            return;
        }
       console.log(e.response.data.message);
    }
  }


  return(
    <div className="content-container">
      <div className="header">
        <h1>SingUp</h1>
      </div>
      <div className="content">
        <input type="text" name="userName" placeholder="Name" value={userName} onChange={handleUsernameChange}>
        </input>
        <input type="number" name="phone" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneChange}>
        </input>
        <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange}>
        </input>
      </div>
      <div className="footer">
        <button onClick={handleSubmit}>
          Submit 
        </button>
        <Link to="/">
            Login
        </Link>
      </div>
    </div>
  )
}

export default SignUp;
