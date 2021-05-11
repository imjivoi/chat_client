const randomWords = require('random-words')
const cryptoJS = require("crypto-js");
export default async (privateJwkKey: JsonWebKey, publicJwkKey: JsonWebKey) => {
  const privateJwkKeyString = JSON.stringify(privateJwkKey)
  const publicJwkKeyString = JSON.stringify(publicJwkKey)

  const keyForPrivate = randomWords(6)
  const keyForPublic = randomWords(6)

  const encryptedPrivate = {
    data: await encryptData(privateJwkKeyString, keyForPrivate.join(',')),
    words: keyForPrivate
  }
  const encryptedPublic = {
    data: await encryptData(publicJwkKeyString, keyForPublic.join(',')),
    words: keyForPublic
  }

  return {encryptedPrivate, encryptedPublic}

}


function encryptData(data: string, key: any) {
  return cryptoJS.AES.encrypt(data, key);
}
