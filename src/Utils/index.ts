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

/**
 *
 * @param year current year
 * @param month current month (0 - 11)
 * @returns number of days in month of year
 */
export const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 0);

  if (!isNaN(date.getDate())) {
    return Array.from(Array(date?.getDate())?.keys());
  }
  return [];
};

/**
 *
 * @param year current year
 * @param month current month (0 - 11)
 * @param day current day
 * @returns day of the week of current day (0 - 6: SUN - MON - ... - SAT)
 */
export const getCurrentDayInWeek = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return date.getDay();
};
