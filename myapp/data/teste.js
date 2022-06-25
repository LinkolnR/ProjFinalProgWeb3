const fsPromise = require('fs/promises');
const aux = require('./auxiliar');
const path = require('path');
// console.log(__dirname)
const TYPES_FILE_PATH = path.join(__dirname, 'dataBase.json');

const memory = new Map();

async function nome(req, res) {
    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      const nomes = obj.carac
      console.log(typeof nomes)
      return nomes
    } catch (err) {
      console.log('erro');
    }

}
async function rodar(){
    
    // const memory = new Map();

    const nomes = await nome()
    // console.log(nomes)
    // nomes.map(async (personagem)=>{
    //     // let persoObj = await aux.fetchPerso(personagem)
    //     // console.log(persoObj
    //     console.log(personagem)
    //     // console.log('{\"' +personagem + '\"' + ':',persoObj.string + "}," )
    //         // memory.set(personagem,persoObj)
    // for (var [key, value] of nomes) {
    //     console.log(key) 
    //   }
    // })
    
    // //   for (personagem of nomes){
    // //     let persoObj = await aux.fetchPerso(personagem)
    // //     // memory.set(personagem,persoObj)
    // //     // console.log(persoObj)
    // //     // console.log('esse é o personagem ', personagem)
    // }
}

// async function rodar(){
//     await nome()
// }
rodar()