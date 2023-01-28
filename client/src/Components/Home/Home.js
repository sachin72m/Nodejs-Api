import { Link , useNavigate } from "react-router-dom";
import axios from 'axios'
import React , {useState} from 'react'

function Home(){
  const navigate = useNavigate();
  const [phoneNumber , updatePhoneNumber] = useState();
  const [password , updatePassword] = useState();

  const handlePhoneChange = (e)=>{
    updatePhoneNumber(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    updatePassword(e.target.value);
  }

  const handleSubmit = async ()=>{
    console.log("Submit")
    try{
      const payload ={
        phoneNumber,
        password
      }
      let response = await axios.post("http://localhost:5000/login-user" , payload , {withCredentials : true});
      response = response.data;
      navigate("/getOrders")
    }
    catch(e){
        if(e.response.status == 502){
          alert(e.response.data.message);
        }

        console.log(e.response.data.message);
    }
  }
  return(
    <div className="content-container">
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="content">
        <input type="number" name="phone" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneChange}>
        </input>
        <input type="password" name="phone" placeholder="Password" value={password} onChange={handlePasswordChange}>
        </input>
      </div>
      <div className="footer">
        <button onClick={handleSubmit}>
          Submit 
        </button>
        <Link to="/SignUp">
            Sign Up 
        </Link>
      </div>
    </div>
  )
}

export default Home;
