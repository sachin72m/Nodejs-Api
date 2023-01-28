import React , {useState , useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function AddOrder() {
    const navigate = useNavigate();
    const [ itemName , updateItemName] = useState();
    const [ subTotal , updateSubTotal] = useState(0);
    const [ phoneNumber , updatePhoneNumber] = useState();

    const handleNameChange = (e)=>{
        updateItemName(e.target.value);
    }

    const handleSubTotalChange = (e)=>{
        updateSubTotal(e.target.value);
    }

    const handlePhoneChange = (e) =>{
        updatePhoneNumber(e.target.value);
    }

    const handleSubmit = async() => {
        try{
            let payload = {
                itemName,
                subTotal,
                phoneNumber
            }

            let response = await axios.post("http://localhost:5000/add-order",payload,{
                withCredentials : 'true',
            })

            response = response.data;
            console.log(response);
            console.log(response.message)
            alert(response.message)
            updateItemName("");
            updateSubTotal(0);
            updatePhoneNumber("");
        }
        catch(e){
            console.log(e.response.data.message)
            console.log(e.message)
        }
    }
    useEffect(()=>{
        
        const controller = new AbortController();
       
        const validateToken = async () =>{
           try{
            let response = await axios.get("http://localhost:5000/get-order",{
                withCredentials : 'true',
            })

            response = response.data;
            return;
           }
           catch(e){
            console.log(e.response.data.message)
            navigate("/");
            return 
           }
        };

        validateToken();
        return () => controller.abort();
       
    },[]);
  return (

   

    <div className='content-container'>
        <div className='header'>
            <h1>
                Add Order
            </h1>
        </div>
        <div className="content">
        <input type="text" name="name" placeholder="Name" value={itemName} onChange={handleNameChange}>
        </input>
        <input type="number" name="total" placeholder="Sub_Total" value={subTotal} onChange={handleSubTotalChange}>
        </input>
        <input type="number" name="phone" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneChange}>
        </input>
      </div>
      <div className="footer">
        <button onClick={handleSubmit}>
          Submit 
        </button>
        <Link to="/GetOrders">
            Cancel
        </Link>
      </div>
    </div>
  )
}
