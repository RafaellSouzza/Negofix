const express = require("express");
const app = express();
const path = require("path");
const cons = require("consolidate");
const Dbase = require("./database/database.js");
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = 3000;

const dbase = new Dbase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use(express.static(__dirname + "/public"));

app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "/public/view"));
app.set("view engine", "html");

app.get("/", (req, res) => {
    io.on('connection', (socket) => {
    filmes = dbase.buscar("Filmes.json", 'a');
    socket.emit("buscaFilme", filmes);
    })
  res.render("index.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/public/view/cadastro.html");
  console.log(req.url);
});

app.get("/cadastrar", (req, res) => {
  let nick = req.query.nick;
  let senha = req.query.senha;
  if (nick.length && senha.length) {
    let valid = true;
    if (dbase.existe(`users/users.json`)) {
      dbase.ler(`users/users.json`).forEach((element) => {
        if (element.nick == nick) {
          valid = false;
        }
      });
    }
    if (valid) {
      dbase.salvar("user/User.json", { nick: nick, senha: senha });
    }
  }
  res.render("index.html")
});

io.on('connection', (socket) => {
    console.log(`Socket conectado: ${socket.id}`)
    socket.emit('velhaMsg',dbase.ler('msg/msg.json'))
    socket.on('envioMenssagem', (msg) =>{
        dbase.salvar('msg/msg.json',msg)
        socket.broadcast.emit('receivedMsg',msg)
    })
    socket.on("encontrarFilme", (busca) => {
        filmes = dbase.buscar("Filmes.json", busca);
        socket.emit("buscaFilme", filmes);
      });
})

server.listen(port, () => {
  console.info(`Rodando na porta ${port}`);
});
