import { atom } from 'recoil';

export const calendarDate = atom({
  key: 'calendarinput',
  default: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    startDate: new Date().getDate(),
    endDate: new Date().getDate() + 1,
  },
});

export const calendarModal = atom({
  key: 'calendarshow',
  default: false,
});

const filterDate = atom({
  key: 'filterData',
  default: false,
});

export const filterResponse = atom({
  key: 'filterRes',
  default: [],
});

export const resetBtnCheck = atom({
  key: 'resetcheck',
  default: true,
});

export const filterInput = atom({
  key: 'filterInput',
  default: {
    amenityCategory: '', //유형
    amenityPeople: '', //인원
    amenityVal: '', //호텔:베드타입 , 펜션:금액
    amenityCommon: [], //공용시설
    amenityIn: [], //객실 내 시설
    amenityEtc: [], // 기타
  },
});

export const reserveData = atom({
  key: 'reserveData',
  default: {
    amenityNm: '', //숙소이름
    roomNm: '', //룸이름
    roomPrice: '', //1박 가격
    startDate: '', //체크인날짜
    endDate: '', //체크아웃날짜
  },
});

export const reserverT = atom({
  key: 'reserveD',
  default: [],
});
export const roomIdcheck = atom({
  key: 'roomIdch',
  default: 0,
});
