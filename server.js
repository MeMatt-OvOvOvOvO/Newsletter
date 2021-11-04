var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku

const bodyParser = require("body-parser")
app.use(express.static('static'))
var path = require("path")

app.use(bodyParser.urlencoded({ extended: true }));

let users = [
    {nick:"111", email:"111@w.pl"},
    {nick:"222", email:"222@w.pl"},
    {nick:"333", email:"333@w.pl"}
]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/addUser.html"))
})

app.get("/removeUserBySelect", function(req, res){
    var select = "<form action='/delete' method='POST'><select name='email'>"
    for(i = 0; i < users.length; i++){
        select = select + "<option value='" + users[i].email + "'>" + users[i].email + "</option>"
    }
    all = select + "</select><input type='submit' value='usun'></form>"
    res.send(all) 
    console.log(users[1])
})

app.get("/removeUserByRadio", function(req, res){
    var buttons = "<form action='/delete' method='POST'>"
    for(i = 0; i < users.length; i++){
        buttons = buttons + "<input type='radio' name='email' value='" + users[i].email + "'>" + users[i].email + "<br>"
    }
    all = buttons + "</select><input type='submit' value='usun'></form>"
    res.send(all)  
    console.log(req.users)
})

app.get("/removeUserByCheckbox", function(req, res){
    var buttons = "<form action='/delete' method='POST'>"
    for(i = 0; i < users.length; i++){
        buttons = buttons + "<input type='checkbox' name='email' value='" + users[i].email + "'>" + users[i].email + "<br>"
    }
    all = buttons + "</select><input type='submit' value='usun'></form>"
    res.send(all)  
    console.log(req.users)
})
app.post("/delete", function(req, res){
    if(Array.isArray(req.body.email)){
        var some = req.body.email
        for(m = 0; m < some.length; m++){
            for(j = 0; j < users.length; j++){
                if(users[j].email == some[m]){
                    users.splice(j, 1);
                }
            }
        }
    }else{
        for(i = 0; i < users.length; i++){
            if(req.body.email == users[i].email){
                users.splice(i, 1);
            }
        }
    }
    res.redirect("/");
})
app.post("/handleForm", function (req, res) {
    for (const x in users){
        if(users[x].email == req.body.email){
            //res.send("Taki email juz jest w bazie :((");
            res.send(`<body><a style="font-size: 40px" href="https://mateuszjanicki3p1newsletter.herokuapp.com/">powrot</a><script>alert("Taki email juz jest w bazie :((")</script></body>`)
        }
    }
    users.push(
        {
            nick: req.body.nick,
            email: req.body.email
        }
    )
    res.redirect("/");
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT )
})