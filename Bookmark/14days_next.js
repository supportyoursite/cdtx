function calcWorkingDays(fromDate, days) {
    var count = 0;
    while (count < days) {
        fromDate.setDate(fromDate.getDate() + 1);
        if (fromDate.getDay() != 0 && fromDate.getDay() != 6) 
            count++;
    }
    return fromDate;
}; 

/* var _date_14day = (calcWorkingDays(new Date("2023/05/23"), 14)); */ 
var _date_14day = (calcWorkingDays(new Date(), 14));
var _date_key_format = [
("0" + _date_14day.getDate()).slice(-2),
("0" + (_date_14day.getMonth() + 1)).slice(-2),
_date_14day.getFullYear(),
];

alert(_date_key_format.join('/'))