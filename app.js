const express= require('express');
const bodyParser= require('body-parser');
const request = require('request');
const https = require('https');

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post('/failure', function(req,res){
    res.redirect('/');
})

app.post('/', function(req,res){
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_field : {
                FNAME: fname,
                LNAME: lname
            }
        }]
    }
    const JSONdata= JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/50b0ac2afb";
    const options= {
        method: "post",
        auth: "priyanshu:b5f0f267f9dcdca39d295f9129bf29cc-us1"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    })
        request.write(JSONdata);
        request.end();
});




const port = process.env.PORT || 80;
app.listen(port,()=>{
    console.log("Server is running ");
})

// API key
// b5f0f267f9dcdca39d295f9129bf29cc-us1
// list id
// 50b0ac2afb 
