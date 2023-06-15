import CryptoJS from "crypto-js"
const { AES, enc } = CryptoJS

export const encryptString = (text, key) => AES.encrypt(text, key).toString()

export const decryptString = (encryptedText, key) =>
  AES.decrypt(encryptedText, key).toString(enc.Utf8)
