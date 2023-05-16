import { atom } from 'recoil';

export const calendarDate = atom({
  key: 'calendarinput',
  default: {
    startDate: new Date().getDate(),
    endDate: new Date().getDate() + 1,
  },
});

export const calendarModal = atom({
  key: 'calendarshow',
  default: false,
});
