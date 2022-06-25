const personagem = {
    "name": "Ningguang",
    "element": "Geo",
    "weapon": "Catalyst",
    "nation": "Liyue"
}
function filtroNome(obj,nome){
    if (obj.name.startsWith(nome) ){
      console.log('passou')
      return true
    }else{
      console.log(obj.name)
      console.log(nome)
      console.log(obj.name.startsWith(nome))
      console.log('passou no false')
      return false
    }
  }
console.log(filtroNome(personagem,"A"))



      // if(param.weapon){
        // function filtroWeapon(obj,arma){
        //   console.log(obj)
        //   if (obj.weapon.startsWith(arma) ){
        //     return true
        //   }else{
        //     return false  
        //   }
        // }
        // personagensFinal = personagensFinal.filter(personagem => filtroWeapon(personagem,param.weapon))
      // }
      // if(param.element){
        function filtroElement(obj,elemento){
          console.log(obj)
          if (obj.element.startsWith(elemento) ){
            return true
          }else{
            return false  
          }
        }
        personagensFinal = personagensFinal.filter(personagem => filtroElement(personagem,param.element))
      // }
      // if(param.nation){
        function filtroNation(obj,nation){
          console.log(obj)
          if (obj.nation.startsWith(nation) ){
            return true
          }else{
            return false  
          }
        }
        personagensFinal = personagensFinal.filter(personagem => filtroNation(personagem,param.nation))
      // }