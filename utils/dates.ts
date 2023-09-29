import {format} from "date-fns";

export const isLeapYear = (year) => {
    const feb29 = new Date(year,1,29);
    return format(feb29, "dd-MMM") === '29-Feb'
  }

export const getBirthdayContactDate = (birthdayDay, birthdayMonth)=>{
    const now = new Date();
    const year = now.getFullYear();
    if(!isLeapYear(year) && birthdayDay === '29' && birthdayMonth === '1'){
        return new Date(year, 1, 28);
    }
    return new Date(year, birthdayMonth, birthdayDay);
}

export const getBirthdayContactDatePretty = (birthdayDay, birthdayMonth)=>{
    return convertDateToPrettyShort(getBirthdayContactDate(birthdayDay, birthdayMonth))
}
    

const randomSundayWithinAQuarter = () => {
    return add(nextSunday(new Date()), {weeks: Math.floor(Math.random() * 13),});
}

const getNextSundayDate = () => {
    return format(nextSunday(new Date()), "yyyy-mm-dd");
}

const convertDateToPretty = (date) => {
    return format(date, "dd-MMM-yyyy");
}

const convertDateToPrettyShort = (date) => {
    return format(date, "dd-MMM");
}

const convertDBDateToPretty = (DBDate) => {
    const date = new Date(DBDate);
    return format(date, "dd-MMM-yyyy");
}

const convertDBDateToPrettyShort = (DBDate) => {
    const date = new Date(DBDate);
    return format(date, "dd-MMM");
}

const convertDateFromPrettyToDB = (datePretty) => {
    const date = new Date(datePretty);
    return format(date, "yyyy-mm-dd");
}