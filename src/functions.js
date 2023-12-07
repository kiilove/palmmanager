import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { Timestamp } from "firebase/firestore";

export const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
export const generateUUID = () => {
  const uuid = uuidv4();
  return uuid;
};

export const getDateFormat = (value) => {
  console.log(value);
  const currentDateTime = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
  return currentDateTime;
};

export const getToday = () => {
  const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  return currentDateTime;
};

export function getRandomNumber(min, max) {
  // min과 max 사이의 임의의 소수를 얻고, 그 소수를 min과 max 사이의 범위로 변환합니다.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatPhoneNumber(phoneNumber) {
  // 모든 "-"와 빈칸 제거
  let cleanNumber = phoneNumber.replace(/-|\s/g, "");
  if (cleanNumber.length < 7) {
    return;
  }
  // 휴대전화 번호 형식 확인 (010으로 시작하고 총 11자리)
  if (cleanNumber.startsWith("010") && cleanNumber.length === 11) {
    return (
      cleanNumber.substring(0, 3) +
      "-" +
      cleanNumber.substring(3, 7) +
      "-" +
      cleanNumber.substring(7)
    );
  }

  // 일반 전화번호 형식 (지역번호가 02인 경우와 그 외를 구분)
  else {
    // 서울 지역번호 (02)인 경우
    if (cleanNumber.startsWith("02")) {
      // 지역번호(2자리), 국번(3자리 또는 4자리), 고유번호(4자리)
      return (
        cleanNumber.substring(0, 2) +
        "-" +
        cleanNumber.substring(2, cleanNumber.length - 4) +
        "-" +
        cleanNumber.substring(cleanNumber.length - 4)
      );
    }
    // 그 외 지역번호인 경우
    else {
      // 지역번호(3자리), 국번(3자리 또는 4자리), 고유번호(4자리)
      return (
        cleanNumber.substring(0, 3) +
        "-" +
        cleanNumber.substring(3, cleanNumber.length - 4) +
        "-" +
        cleanNumber.substring(cleanNumber.length - 4)
      );
    }
  }
}

export const handleFilterdArray = (data = [], fieldName, queryString) => {
  // const groupedData = _.groupBy(data, "transplantingBlock");
  // console.log(groupedData);
  const filteredData = data.filter((f) => f[fieldName] === queryString);
  return filteredData;
};

export const encodeDate = (date) => {
  let newDate;
  if (!date) {
    return null; // date가 유효하지 않으면 null 반환
  }
  if (typeof date === "object") {
    const timestamp = new Timestamp(date.seconds, date.nanoseconds);
    newDate = dayjs(timestamp.toDate()).format("YYYY-MM-DD");
  } else {
    newDate = dayjs(date.toDate()).format("YYYY-MM-DD");
  }

  return newDate;
};
