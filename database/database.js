const fs = require("fs");
const pastalocal = "database/";
class Dbase {
  ler = (arquivo) => {
    console.log(arquivo);
    if (!fs.existsSync(pastalocal + arquivo)) return "Arquivo não existe.";
    const data = fs.readFileSync(pastalocal + arquivo, "utf-8");
    const objeto = JSON.parse(data.toString());
    return objeto;
  };

  salvar = (arquivo, objeto) => {
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
  existe = (arquivo) => {
    if (fs.existsSync(`${pastalocal}${arquivo}`)) {
      console.log('Arquivo existe')
      return true;
    } else if (fs.existsSync(`${pastalocal}${arquivo.split("/")[0]}`)) {
      console.log('Somente pasta existe')
      return false;
    }
    console.log('Não existe arquivo nem pasta')
    return false;
  };

  buscar = (arquivo, busca) => {
    let newobjeto = []
    if (!fs.existsSync(pastalocal + arquivo)) return "Arquivo não existe.";
    const data = fs.readFileSync(pastalocal + arquivo, "utf-8");
    const objeto = JSON.parse(data.toString());
    newobjeto = objeto.filter(objeto => objeto.nome.toLowerCase().indexOf(busca.toLowerCase()) > -1);
    console.log('Foram encontrados ',newobjeto.length,' items')
    return newobjeto.slice(0, 25);;
  }
  
}

module.exports = Dbase;
