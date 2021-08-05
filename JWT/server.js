require("dotenv").config();
const express =require("express");
const jwt =require("jsonwebtoken");

const app=express();

app.use(express.json());

const posts=[
    {
        username:"Ahmed",
        title:"post 1"
    },
    {
        username:"Ahmed2",
        title:"post 2"
    }
];

//app.use(authanticateToken);

app.post("/",authanticateToken,(req,res)=>{
    res.json(posts);
})

app.post("/login",(req,res)=>{
    // authanticate user ... =>
    
    const username =req.body.username ;
    const user ={username:username};
    console.log(user);
    
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.header('Ahmed', accessToken).send("ahmed text");
  //  res.send({accessToken:accessToken});
})

function authanticateToken(req,res,next){
    //const token = authHeader && authHeader.split(" ")[1];
    const token = req.headers.Ahmed;
    if(token == null){
        console.log("test");
        return res.sendStatus(401);
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)
            return res.sendStatus(403);
        req.user=user;
        next();
    });

};

app.listen(3000,(req,res)=>{
    console.log("yeah I am here to help you !!")
});