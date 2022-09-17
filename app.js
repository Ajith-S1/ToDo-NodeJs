// jshint esVersion :6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];
let worklist = [];

app.set("view point","ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
  let date = new Date();
  let option ={
    weekday : "long",
    year : "numeric",
    month : "long",
    day : "numeric"
  }
  let day = date.toLocaleDateString("en-US",option);
  res.render("list.ejs",{ listTitle : day, newListItem : items});

});
 app.post("/",function(req,res){
   let item = req.body.news;
   if(req.body.list=="worklist"){
  worklist.push(item);
  res.redirect("/work");
  } else {
  items.push(item);
  res.redirect("/");
}

 });

app.get("/work",function(req,res){
  res.render("list.ejs",{listTitle :"worklist" , newListItem : worklist});

});


app.listen(3000,function(){
  console.log("server Up at port 3000");
});
