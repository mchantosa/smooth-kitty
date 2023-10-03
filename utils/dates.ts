import { add, format, nextSunday } from "date-fns";

export const isLeapYear = (year: number) => {
  const feb29 = new Date(year, 1, 29);
  return format(feb29, "dd-MMM") === "29-Feb";
};

export const getBirthdayContactDate = (
  birthdayDay: number,
  birthdayMonth: number,
) => {
  const now = new Date();
  const year = now.getFullYear();
  if (!isLeapYear(year) && birthdayDay === 29 && birthdayMonth === 1) {
    return new Date(year, 1, 28);
  }
  return new Date(year, birthdayMonth, birthdayDay);
};

export const getBirthdayContactDatePretty = (
  birthdayDay: number,
  birthdayMonth: number,
) => {
  return convertDateToPrettyShort(
    getBirthdayContactDate(birthdayDay, birthdayMonth),
  );
};

export const getRandomSundayWithinAQuarterDBDate = () => {
  return format(
    add(nextSunday(new Date()), { weeks: Math.floor(Math.random() * 13) }),
    "yyyy/MM/dd",
  );
};

export const getRandomDayWithinThePastMonthDBDate = () => {
  return format(
    add(new Date(), { days: -Math.floor(Math.random() * 30) }),
    "yyyy/MM/dd",
  );
};

export const getNextSundayDateDB = () => {
  return format(nextSunday(new Date()), "yyyy/MM/dd");
};

const convertDateToPretty = (date: Date) => {
  return format(date, "dd-MMM-yyyy");
};

const convertDateToPrettyShort = (date: Date) => {
  return format(date, "dd-MMM");
};

export const convertDBDateToPretty = (DBDate: string) => {
  if (!DBDate) return "";
  const date = new Date(DBDate);
  return format(date, "dd-MMM-yyyy");
};

export const convertDateToDB = (date: Date) => {
  if (!date) return "";
  return format(date, "yyyy/MM/dd");
};

export const getNextSundayDateToPretty = () => {
  return format(nextSunday(new Date()), "yyyy/MM/dd");
};

export const getLastSundayOrTodayDate = () => {
  //is today sunday
  const today = new Date();
  const day = today.getDay();
  if (day === 0) {
    return today;
  } else {
    return add(nextSunday(new Date()), { weeks: -1 });
  }
};

export const getLastSundayOrTodayDatePretty = () => {
  return convertDateToPretty(getLastSundayOrTodayDate());
};

export const getLastSundayOrTodayDateDB = () => {
  return convertDateToDB(getLastSundayOrTodayDate());
};

export const getNextSaturdayOrTodayDate = () => {
  //is today Saturday
  const today = new Date();
  const day = today.getDay();
  if (day === 6) {
    return today;
  } else {
    return add(today, { days: 6 - day });
  }
};

export const getNextSaturdayOrTodayDatePretty = () => {
  return convertDateToPretty(getNextSaturdayOrTodayDate());
};
