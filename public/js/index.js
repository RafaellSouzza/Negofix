var socket = io("http://localhost:3000");

function renderMenssagem(menssagem) {
  $(".menssagem").append(
    "<div class='message'><strong>" +
      menssagem.nick +
      "</strong>: " +
      menssagem.msg +
      "</div>"
  );
}
socket.on("receivedMsg", (msg) => {
  renderMenssagem(msg);
});

socket.on("velhaMsg", (menssagens) => {
  for (const msg of menssagens) {
    renderMenssagem(msg);
  }
});

socket.on("buscaFilme", (filmes) => {
    $(".coteudo").empty();
    for (const filme of filmes) {
    $(".coteudo").append(
      '<div class="card">' +
        '<img src="' +
        filme.imgULR +
        '" alt="Avatar" ></img>' +
        '<div class="container">' +
        "<h4><b>" +
        filme.nome +
        "</b></h4> " +
        "<p>" +
        filme.ano +
        "</p>" +
        " <button>Detalhe</button> " +
        " </div>" +
        "</div>"
    );
  }
});
$("#search").submit((event) => {
  event.preventDefault();
  var busca = document.getElementById("search")[0].value;

  socket.emit("encontrarFilme", busca);
});

$("#chat").submit((event) => {
  var nick = document.getElementsByClassName("nick")[0].value;
  var msg = document.getElementsByClassName("msg")[0].value;

  event.preventDefault();
  if (nick.length && msg.length) {
    var menssagemObject = {
      nick: nick,
      msg: msg,
    };
    renderMenssagem(menssagemObject);
    socket.emit("envioMenssagem", menssagemObject);
  }
});
document.getElementsByClassName("div_chat")[0].style.display = "none";
document.getElementsByClassName("back")[0].style.opacity = 1;
function abrirChat() {
  var display = document.getElementsByClassName("div_chat")[0].style.display;
  if (display == "none") {
    document.getElementsByClassName("div_chat")[0].style.display = "block";
    document.getElementsByClassName("back")[0].style.opacity = 0.2;
  }
  if (display == "block") {
    document.getElementsByClassName("div_chat")[0].style.display = "none";
    document.getElementsByClassName("back")[0].style.opacity = 1;
  }
}
