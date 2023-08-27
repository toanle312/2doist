export const PAGE_URL = {
  LOGIN: "/login",
  HOME: "/home",
}

export const NESTED_URL = {
  INBOX: "inbox",
  TODAY: "today",
  UPCOMING: "upcoming",
  FILTER_LABELS: "filter-labels"
}

// export const Crypto = {
//   enCode: (data: any) => {
//     var strToEncrypt = typeof data === "string" ? data : JSON.stringify(data);
//     var encrypted = CryptoJS.AES.encrypt(
//       strToEncrypt,
//       process.env.REA
//       process.env.REACT_APP_DOC_ENCODE_KEY
//     );
//     return encrypted.toString();
//   },

//   deCode: (str: any) => {
//     var decrypted = CryptoJS.AES.decrypt(
//       str,
//       process.env.REACT_APP_DOC_ENCODE_KEY
//     );
//     var decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
//     try {
//       return JSON.parse(decryptedStr);
//     } catch (error) {
//       return decryptedStr;
//     }
//   },
// };