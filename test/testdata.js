const fs = require("fs");
const pastalocal = "test/";

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
    console.log(arquivo);
    const data = fs.readFileSync(`${pastalocal}${arquivo}`, "utf-8");
    const objetox = JSON.parse(data.toString());
    objetox.push(objeto);
    const objetoJson = JSON.stringify(objetox);
    fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
    console.log("Seus dados foram incrementados");
  } else {
    let home = [objeto];
    const objetoJson = JSON.stringify(home);
    fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
    console.log("Seu arquivo foi salvo");
  }
  console.log("Arquivo ", arquivo.split(".")[1], " salvo.");
  console.log("Endereço :", pastalocal, arquivo);
};

var deletar = (arquivo,deletar) => {
  const data = fs.readFileSync(`${pastalocal}${arquivo}`, "utf-8");
  const objeto = JSON.parse(data.toString());
  console.log(objeto.length);
  //newobjeto = objeto.filter(objeto => !objeto.imgULR.toLowerCase().indexOf('data:image'.toLowerCase()) > -1);
  //return el.imgULR != "data:image"; });
  let newobjeto = [];
  objeto.forEach((element) => {
    if (
      !(element.imgULR.toLowerCase().indexOf(deletar.toLowerCase()) > -1)
    ) {
      newobjeto.push(element);
    }
  });
  const objetoJson = JSON.stringify(newobjeto);
  fs.writeFileSync(`${pastalocal}${arquivo}`, objetoJson);
  console.log("Seu arquivo foi salvo");
  console.log(newobjeto.length);
};

deletar('dia/Filmes.json','data:image');
