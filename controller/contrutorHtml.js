const DOMParser = require("dom-parser");
const parser = new DOMParser();
const fs = require("fs");
const pastalocal = "controller/";

const newhtml = (arquivo) => {
  if (!fs.existsSync(pastalocal + arquivo)) return "Arquivo não existe.";
  const htmlopen = fs.readFileSync(pastalocal + arquivo, "utf-8");
  const html = parser.parseFromString(htmlopen, "text/html");
  
  html.getElementsByClassName("div")[0].innerHTML = "<p>Rafa</p>";

  fs.writeFileSync(`${pastalocal}${arquivo}`, html);
};
newhtml("new.html");

//const data = fs.readFileSync(`${pastalocal}${arquivo}`, "utf-8");
//const objetox = JSON.parse(data.toString());
//objetox.push(objeto);
//const objetoJson = JSON.stringify(objetox);
//fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
