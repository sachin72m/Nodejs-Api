const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const {v4 : uuidv4} = require('uuid')




//Getting the Mongoose Schema 
const User = require("./models/users.js")
const Order = require("./models/orders");
const orders = require("./models/orders");


//MongoDB UserName n Pass
// togilol927@bymercy.com
// 3!4brwp4vNYRSw!


//Connectiong to MongoDb

mongoose.connect("mongodb+srv://admin:admin@cluster0.w7jkmbk.mongodb.net/NodeJsProject?retryWrites=true&w=majority" , { useNewUrlParser: true , useUnifiedTopology: true})
.catch((error)=>{
    console.log(error.message);
  })


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

//Using Cors for allowing the frontend to send request to backend

app.use(cors({
    credentials : true,
    origin : ['http://localhost:3000']
  }));





async function validateToken(req,res,next){
    const token = req.cookies.token;
    try{
        const payload = await jwt.verify(token ,  "JWTSECRET@1234" );
        req.userId = payload.user_id;
        next();
    }
    catch(e){
        
        res.status(502);
        res.json({"message" : "Invalid Token"})
        return;
    }
}


app.post("/add-user" , async (req,res)=>{
    const data = req.body;
    try{
        const username = data.username;
        let password = data.password;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt);

        const user = new User({
            username : await uuidv4(),
            name : username,
            password : password,
            phone : data.phoneNumber
        })
        
        if(await(await User.find({phone : data.phoneNumber})).length !=0){
            res.status(502);
            res.json({"message" : "User Already Exists" , "reason" : "duplicate"})
            return;
        }

        await user.save();
        res.status(200);
        res.json({"message" : "User Added Successfully"})
    }
    catch(e){
        console.log(e);
        res.status(500).json({"message" : "Internal Server errorrrrr"})
    }

})

app.post("/login-user" , async (req,res)=>{
    const data = req.body;
    try{
        const phone = data.phoneNumber;
        let password = data.password;
        
        const user = await User.findOne({phone : phone});

        if(!user){
            res.status(502);
            res.json({"message" : "Invalid Credentials"})
            return;
        }

        const compared = await bcrypt.compare(data.password , user.password);
        if(!compared){
            res.status(502);
            res.json({
                "message" : "Invalid Credentials"
            })
            return;
        }

        let payload ={
            user_id : user.username
        }

        res.status(200)
        const accessToken = await jwt.sign(payload, "JWTSECRET@1234" , {algorithm : 'HS256' , expiresIn : "2d"});
        await res.cookie("token",accessToken,{ httpOnly: true  , secure : true , sameSite : 'none' , maxAge : 604800000});
        res.json({"message" : "Login Success"});
    }
    catch(e){
        console.log(e);
        res.status(500).json({"message" : "Internal Server errorrrrr"})
    }
})

app.post("/add-order",validateToken, async (req,res)=>{
    let data = req.body;
    const user_id = req.userId;
    try{
        let user = await User.findOne({username : user_id});
        
        const order = new Order({
            username : user_id,
            name : data.itemName,
            phone : data.phoneNumber,
            sub_total : data.subTotal
        })

        await order.save();
        res.status(200);
        res.json({"message" : "Item Added Successfully"})
        return;
    }
    catch(e){
        console.log(e);
        res.status(500);
        res.json({"message" : "Internal Server Error"})
    }
})

app.get("/get-order",validateToken, async (req,res)=>{
    const user_id = req.userId; // Clients Userid 
    try{
        const order = await orders.find({username : user_id}) //DB Query 
        res.json({"orders" : order})
    }
    catch(e){
        console.log(e);
        res.status(500);
        res.json({"message" : "Internal Server Error"})
    }
    
})

app.get("/",(req,res)=>{
    res.json({"message " : "Server Up"})
})

app.listen(5000, ()=>{
    console.log("Server Up on 5000");
})

