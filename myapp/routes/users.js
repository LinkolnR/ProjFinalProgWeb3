var express = require('express');
var router = express.Router();
const fsPromise = require('fs/promises');
const path = require('path');

const TYPES_FILE_PATH = path.join(__dirname,'..','data','dataBase.json');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const metodos = obj.types
    res.send(metodos);
  } catch (err) {
    res.send(err);
  }
});

router.get('/characters', async function(req, res, next) {
  try {
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const metodos = obj.characters
    res.send(metodos);
  } catch (err) {
    res.send(err);
  }
});

router.get('/characters/:nome', async function(req, res, next) {
  try {
    const {nome} = req.params;
    const types = await fsPromise.readFile(TYPES_FILE_PATH, 'utf8');
    const obj = JSON.parse(types)
    const metodos = obj.carac
    const personagem = metodos[nome]
    res.send(personagem);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
