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
    res.send(`
    <body>
        <div>
            <form action="/handleForm" method="POST">
                <select name="email" id="email">
                    <option value="asfadf">${users.map(e=>e.email)}</option>
                </select>
                <input type="button" value="usun">
            </form>
        </div>
    </body>`)   
    console.log(users[1])
})

app.get("/removeUserByRadio", function(req, res){
    res.send(`
    <body>
        <div>
            <form action="/handleForm" method="POST">
                <input type="radio" id="email" name="email" value="${users.email}">
                <label for="${users.email}">${users.email}</label><br>
                <input type="button" value="usun">
            </form>
        </div>
    </body>`)   
    console.log(req.users)
})

app.get("/removeUserByCheckbox", function(req, res){
    res.send(`
    <body>
        <div>
            <form action="/handleForm" method="POST">
                <input type="checkbox" id="email" name="email" value="${users.email}">
                <label for="${users.email}">${users.email}</label><br>
                <input type="button" value="usun">
            </form>
        </div>
    </body>`)   
    console.log(req.users)
})
app.post("/handleForm", function (req, res) {
    for (const x in users){
        if(users[x].email == req.body.email){
            //res.send("Taki email juz jest w bazie :((");
            res.send(`<body><a style="font-size: 40px" href="https://mateuszjanicki3p1.herokuapp.com/">powrot</a><script>alert("Taki email juz jest w bazie :((")</script></body>`)
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
    console.log("start serwera na porcie " + PORT)
})