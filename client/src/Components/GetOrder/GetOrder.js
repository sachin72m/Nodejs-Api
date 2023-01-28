import React , {useState , useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function GetOrder() {
    const navigate = useNavigate();

    const [userOrders , setUserOrders] = useState([]);
    useEffect(()=>{
        
        const controller = new AbortController();
       
        const getOrders = async () =>{
           try{
            let response = await axios.get("http://localhost:5000/get-order",{
                withCredentials : 'true',
            })

            response = response.data;

            console.log(response);
            setUserOrders(response.orders)
            return;
           }
           catch(e){
            console.log(e.response.data.message)
            navigate("/");
            return 
           }
        };

        getOrders();
        return () => controller.abort();
       
    },[]);
  return (
    <div className='content-container'>
        <div className='header'>
            <h1>
                Your Orders
            </h1> 
        </div>
        <Link to="/addOrder">
            Add Order
        </Link>
       <div className = 'orders'>
        {
            userOrders.map(order =>{
               return(
                    <div>
                        <p>
                            Order Name : {order.name}
                        </p>
                        <p>
                            Order Sub-Total : {order.sub_total}
                        </p>
                        <p>
                            Phone Number : {order.phone}
                        </p>
                    </div>
               )
            })
        }
        </div>
    </div>
  )
}