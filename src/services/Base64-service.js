import { Base64 } from 'js-base64';

class Base64Service {
  constructor() {

  }

  //Base64 加密
  encryption(privatekey,password){
    let encryption = [];
    encryption.privatekey = Base64.encode(privatekey)
    encryption.password = Base64.encode(password)
    return encryption
  }


  //Base64 解密
  Decrypt(privatekey,password){
    let Decrypt = []
    Decrypt.privatekey = Base64.decode(privatekey)
    Decrypt.password = Base64.decode(password)
    return Decrypt
  }
 }


const base64Service = new Base64Service()
export default Base64Service