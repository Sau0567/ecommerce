const path = require("path");
const express = require("express");
var mongoose = require('mongoose');
const bodyparser=require("body-parser");
const app = express();
const port = 80;

mongoose.connect('mongodb://localhost/registest', {useNewUrlParser: true});

var registerSchema = new mongoose.Schema({
  myname: String,
  myemail: String,
  mypass: String

})

var Register = mongoose.model('Register', registerSchema);
app.use("/public",express.static("public"));
app.use(express.urlencoded());



app.engine('html', require('ejs').renderFile);
app.set("view engine","html");
app.set("views", path.join(__dirname, "views"));

app.get('/',(req,res)=>{
  const params = {"data":{"amount":"500", "name":"Gray Tshirt"} }     
  res.status(200).render("home.html", params);
});
app.get('/register',(req,res)=>{
  const params = {}
  res.status(200).render("register.html", params);
});
app.get('/product-details',(req,res)=>{
  const params = {}
  res.status(200).render("product-details.html", params);
});

  app.post("/register",(req,res)=>{
    var mydata = new Register(req.body);
    mydata.save().then(()=>{
      res.send("this itemes saved")
    }).catch(()=>{ 
      res.status(400).render("item not saved")
    })
  })
app.listen(port,()=>{
   console.log(`Application started at ${port}`);
})





//db.items.insertMany([{name:"samsung 30",price:20000 ,rating:3.5},{name:"Xiaomi 80",price:15000 ,rating:4.5},{name:"vivo 50",price:13000 ,rating:2.5}])
//db.items.insertOne({name:"moto G",price:12000 ,rating:3.5})
//db.items.find({rating:{$gt:2.5},price:{$gt:13000}})


// app.get('/',(req,res)=>{
//   res.sendFile('home.html');
// });
// app.get('/search',(req,res)=>{
//   res.sendFile(path.join(__dirname+'/search.html'))
// })
// app.get('/product-details',(req,res)=>{
//   res.sendFile(path.join(__dirname+'/product-details.html'))
// })
   
// app.get('/login',(req,res)=>{
//   res.sendFile(path.join(__dirname+'/login.html'));
//   });
 