export default {
  save(key:string,value:JSON | JsonWebKey ){
    localStorage.setItem(key,JSON.stringify(value))
  },

  get(key:string){
    localStorage.getItem(key)
  },
  delete(key:string){
    localStorage.removeItem(key)
  },
  deleteAll(){
    localStorage.clear()
  }
}
