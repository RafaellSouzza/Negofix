const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/public/view/index.html');
})

app.get('/cadastrar',(req,res) => {
    res.sendFile(__dirname+'/public/view/cadastro.html');
    console.log(req.url)
})

app.post('/cadastrar',(req,res) => {
    let email = req.query.email
    let senha = req.query.senha

    console.log(req.url)
    console.log(email)
    console.log(senha)
})

app.listen(port,()=> {console.info(`Rodando na porta ${port}`)});

