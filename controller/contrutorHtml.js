const DOMParser = require("dom-parser");
const parser = new DOMParser();
const fs = require("fs");
const pastalocal = "controller/";
const Dbase = require("../database/database.js");
const dbase = new Dbase();
class createhtml {

   newhtml = (arquivo) => {
    if (!fs.existsSync(pastalocal + arquivo)) return "Arquivo não existe.";
    const htmlopen = fs.readFileSync(pastalocal + arquivo, "utf-8");
    let htmlBurguer = htmlopen.split('#&&#')
    let html = htmlBurguer[0].toString(); //#&&#
     
    for (const filme of dbase.buscar("Filmes.json",'harry')) {
      html +=  '<div class="card">' +
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
    }
    html += htmlBurguer[1].toString();
    console.log(html)
    
    return html;
  };
}




//const data = fs.readFileSync(`${pastalocal}${arquivo}`, "utf-8");
//const objetox = JSON.parse(data.toString());
//objetox.push(objeto);
//const objetoJson = JSON.stringify(objetox);
//fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);


module.exports = createhtml;