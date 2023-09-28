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
    const contactDate = getBirthdayContactDate(birthdayDay, birthdayMonth)
    return format(contactDate, "dd-MMM");
}