var express = require('express');
var router = express.Router();
const fsPromise = require('fs/promises');
const path = require('path');

const TYPES_FILE_PATH = path.join(__dirname,'..','data','dataBase.json');

// =====    GETTERS      =====
router.get('/', async function(req, res) {
    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      const metodos = obj.types
      res.send(metodos);
    } catch (err) {
      res.router('error',{err});
    }
  });

// =====     ARTEFATOS     ===== 

router.get('/artifacts', async function(req, res, next) {
    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      const artefatos = obj.artifacts
      res.render('artefatos',{artefatos});
    } catch (err) {
      res.sendStatus(404);
      res.router('error',{err});
    }
  });
router.get('/artifacts/:id', async function(req, res, next) {
    const {id} = req.params
    parseInt(id,10)
    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      const artefatos = obj.artifacts
      if (id< artefatos.length){
        res.send(artefatos[id]);
      }
      else{
        res.sendStatus(404);
        res.router({err});
      }
    } catch (err) {
      res.render('error',{err});
      res.sendStatus(404);
    }
});
// =====     CIDADES     ===== 
router.get('/nations', async function(req, res, next) {
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const cidades = obj.nations
    res.send(cidades);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
router.get('/nations/:id', async function(req, res, next) {
    const {id} = req.params
    parseInt(id,10)
    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      const cidades = obj.nations
      if (id< cidades.length){
        res.send(cidades[id]);
      }
      else{
        res.sendStatus(404);
        res.router({err});
      }
    } catch (err) {
      res.router({err});
      res.sendStatus(404);
    }
});
router.get('/nations/:id/characters', async function(req, res, next) {
  const personagensDaCidade = []
  const {id} = req.params
  parseInt(id,10)
  function filtro(personagem,cidade){
    if (personagem.nation == cidade){
      return true
    }
    else{
      return false
    }

  }
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const cidades = obj.nations
    const cidade = cidades[id]
    const personagens = obj.characters
    const personagensDaCidade = personagens.filter(personagem => filtro(personagem,cidade))
    res.render('genshinNation',{personagensDaCidade,cidade});
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
// =====     PERSONAGENS     ===== 
router.get('/characters', async function(req, res, next) {
  const param = req.query
  if(Object.keys(param).length === 0 || param.name == ''){

    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      const personagens = obj.characters
      res.render('genshin',{personagens});
    } catch (err) {
      res.router('error',{err});
      res.sendStatus(404);
    }
  }
  else{
    try {
      const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
      const obj = JSON.parse(types)
      var personagens = obj.characters
      if (param.name){
        console.log(param.name)
        function filtroNome(obj,nome){
          console.log(obj)
          if (obj.name.startsWith(nome) ){
            return true
          }else{
            return false  
          }
        }
        console.log('passou pelo filtro de nome')
        personagens = personagens.filter(personagem => filtroNome(personagem,param.name))
       
      }
      if(param.weapon){
        function filtroWeapon(obj,arma){
          console.log(obj)
          if (obj.weapon.startsWith(arma) ){
            return true
          }else{
            return false  
          }
        }
        personagens = personagens.filter(personagem => filtroWeapon(personagem,param.weapon))
        
      }
      if(param.element){
        function filtroElement(obj,elemento){
          console.log(obj)
          if (obj.element.startsWith(elemento) ){
            return true
          }else{
            return false  
          }
        }
        personagens = personagens.filter(personagem => filtroElement(personagem,param.element))
      }
      if(param.nation){
        function filtroNation(obj,nation){
          console.log(obj)
          if (obj.nation.startsWith(nation) ){
            return true
          }else{
            return false  
          }
        }
        personagens = personagens.filter(personagem => filtroNation(personagem,param.nation))
        
      }
      if(param.limit){
        function filtroNation(obj,nation){
          console.log(obj)
          if (obj.nation.startsWith(nation) ){
            return true
          }else{
            return false  
          }
        }
        personagens = personagens.splice(0,param.limit)
        
      }
      res.render('genshin',{personagens});
      {
        console.log('nao existe')
      }
      // res.send(personagens);
      // console.log(param)
    } catch (err) {
      res.send('Algo Está Errado')
      // res.router('error',{err});
    }
  }
});
router.get('/characters/:id', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const personagens = obj.characters
    const personagem = personagens[id]
    res.render('genshinId',{personagem});
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
router.get('/characters/:id/weapon', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const personagens = obj.characters
    const personagem = personagens[id]
    res.send(personagem.weapon);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
router.get('/characters/:id/name', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const personagens = obj.characters
    const personagem = personagens[id]
    res.send(personagem.name);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
router.get('/characters/:id/weapon', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const personagens = obj.characters
    const personagem = personagens[id]
    res.send(personagem.weapon);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
router.get('/characters/:id/element', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const personagens = obj.characters
    const personagem = personagens[id]
    res.send(personagem.element);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
router.get('/characters/:id/nation', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const personagens = obj.characters
    const personagem = personagens[id]
    res.send(personagem.nation);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});

// =====    POSTS      =====

// PARA O POST
// const body = req.body;
// const bodyStr = JSON.stringify(body);
// =====     ARTEFATOS     ===== 
router.post('/artifacts', async function(req, res, next) {
  const body = req.body;
  const bodyStr = body.data;
  const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
  const obj = JSON.parse(types)
  obj.artifacts.push(bodyStr)
  const objStr = JSON.stringify(obj)
  await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
  const artefatosAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
  res.send(artefatosAtualizado.artifacts);
});
// =====     PERSONAGENS     ===== 
router.post('/characters', async function(req, res, next) {
  const body = req.body;
  const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
  const obj = JSON.parse(types)
  obj.characters.push(body)
  const objStr = JSON.stringify(obj)
  await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
  const personagensAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
  res.send(personagensAtualizado.characters);
});
// =====     CIDADES     ===== 
router.post('/nations', async function(req, res, next) {
  const body = req.body;
  const bodyStr = body.data;
  const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
  const obj = JSON.parse(types)
  obj.nations.push(bodyStr)
  const objStr = JSON.stringify(obj)
  await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
  const nationsAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
  res.send(nationsAtualizado.nations);
});

// =====    DELETES      =====
// =====     CIDADES     ===== 
router.delete('/nations/:id', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  function filtro(nation,apagada){
    if (nation == apagada){
      return false
    }else{
      return true
    }
  }
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const apagada = obj.nations[id]
    const newNation = obj.nations.filter(nation => filtro(nation,apagada))
    obj.nations = newNation
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const nationsAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(nationsAtualizado.nations);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
// =====     ARTEFATOS     ===== 
router.delete('/artifacts/:id', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  function filtro(artifact,apagada){
    if (artifact == apagada){
      return false
    }else{
      return true
    }
  }
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const apagada = obj.artifacts[id]
    const newartifact = obj.artifacts.filter(artifact => filtro(artifact,apagada))
    obj.artifacts = newartifact
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const artifactsAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(artifactsAtualizado.artifacts);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
// =====     PERSONAGENS     ===== 
router.delete('/characters/:id', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  function filtro(character,apagada){
    if (character == apagada){
      return false
    }else{
      return true
    }
  }
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const apagada = obj.characters[id]
    const newcharacter = obj.characters.filter(character => filtro(character,apagada))
    obj.characters = newcharacter
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const charactersAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(charactersAtualizado.characters);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});

// =====    PUTS      =====
// =====     CIDADES     ===== 
router.put('/nations/:id', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  const body = req.body;
  const bodyStr = body.data;
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    obj.nations[id] = bodyStr
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const nationsAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(nationsAtualizado.nations);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
// =====     ARTEFATOS     ===== 
router.put('/artifacts/:id', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  const body = req.body;
  const bodyStr = body.data;
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    obj.artifacts[id] = bodyStr
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const artifactsAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(artifactsAtualizado.artifacts);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
// =====     PERSONAGENS     ===== 
router.put('/characters/:id/name', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  const body = req.body;
  const bodyStr = body.name;
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    obj.characters[id].name = bodyStr
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const charactersAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(charactersAtualizado.characters);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});

router.put('/characters/:id/weapon', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  const body = req.body;
  const bodyStr = body.weapon;
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    obj.characters[id].weapon = bodyStr
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const charactersAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(charactersAtualizado.characters);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});

router.put('/characters/:id/nation', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  const body = req.body;
  const bodyStr = body.nation;
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    obj.characters[id].nation = bodyStr
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const charactersAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(charactersAtualizado.characters);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});

router.put('/characters/:id/element', async function(req, res, next) {
  const {id} = req.params
  parseInt(id,10)
  const body = req.body;
  const bodyStr = body.element;
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    obj.characters[id].element = bodyStr
    const objStr = JSON.stringify(obj)
    await fsPromise.writeFile(TYPES_FILE_PATH, objStr, 'utf8');
    const charactersAtualizado = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    res.send(charactersAtualizado.characters);
  } catch (err) {
    res.router('error',{err});
    res.sendStatus(404);
  }
});
module.exports = router;


