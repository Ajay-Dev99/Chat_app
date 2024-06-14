import {  isToday, isYesterday, differenceInDays ,parse } from 'date-fns';

export const getRelativeDate = (dateString) => {
    const date = parse(dateString, 'dd-MM-yyyy', new Date());

    if (isToday(date)) {
        return 'Today';
    } else if (isYesterday(date)) {
        return 'Yesterday';
    } else {
        const daysDiff = differenceInDays(new Date(), date);
        if(daysDiff>5){
            return dateString
        }
        return `${daysDiff} days ago`;
    }
};
