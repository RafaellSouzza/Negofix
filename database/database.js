const fs = require("fs");
const pastalocal = "datadase/";

var ler = (arquivo) => {
  if (!fs.existsSync(arquivo)) return "Arquivo não existe.";
  const data = fs.readFileSync(arquivo, "utf-8");
  const objeto = JSON.parse(data.toString());
  return objeto;
};

var salvar = (arquivo, objeto) => {
  const fs = require("fs");
  if (!fs.existsSync(`${pastalocal}${arquivo.split("/")[0]}`)) {
    fs.mkdirSync(`${pastalocal}${arquivo.split("/")[0]}`);
    console.log("Diretorio ", arquivo.split("/")[0], " criado");
    const objetoJson = JSON.stringify([]);
    fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
  }
  if (fs.existsSync(`${pastalocal}${arquivo}`)) {
    const data = fs.readFileSync(arquivo, "utf-8");
    const objetox = JSON.parse(data.toString());
    objetox.push(objeto);
    const objetoJson = JSON.stringify(objetox);
    fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
  } else {
    const objetoJson = JSON.stringify(objeto);
    fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
  }
  console.log("Arquivo ", arquivo.split(".")[1], " salvo.");
  console.log("Endereço :", pastalocal, arquivo);
};

