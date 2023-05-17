import { atom } from 'recoil';

export const calendarDate = atom({
  key: 'calendarinput',
  default: {
    year: '',
    month: '',
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
