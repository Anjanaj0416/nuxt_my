export function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}


export function getDateFormat1(dt) {//18 February 2019    
    let date = parseDate(dt)    
    var curr_day = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();

    var curr_hour = date.getHours();
    var curr_min = date.getMinutes();
    var curr_sec = date.getSeconds();

    let arrMonthNames = getMonthNames();    
    return (formatdigit(curr_day) + " " + arrMonthNames[curr_month] + " " + curr_year);
}


export function formatdigit(d) {   
    var f =  d < 10 ? '0' + d.toString() : d.toString(); 
    return f;
}

// super simple pt-BR date format
export function formatDate(dt) {
    if (dt == null) return '';
    
    var f = function (d) { return d < 10 ? '0' + d : d; };
    return f(dt.getDate()) + '/' + f(dt.getMonth() + 1) + '/' + dt.getFullYear();
    
}

// is object a date?
export function isDate(d) {
    return Object.prototype.toString.call(d) === '[object Date]';
    return d;
}

export function getDateFormTS(timespan) {
    var dateString = timespan.substr(6);
    return new Date(parseInt(dateString));
}

export function parseDate(str) {
    try{
      
    if (str === null || isDate(str)) return str || null;
    var p = str.match(/^(\d{1,2})\/?(\d{1,2})?\/?(\d{2,4})?$/);
    if (!p) return null;
    return new Date(parseInt(p[3] || new Date().getFullYear()), parseInt(p[2] || (new Date().getMonth() + 1)) - 1, parseInt(p[1]), 0, 0, 0, 0);
    }
    catch (err) {return '' }
    
}

export function atob( str ) {
    return window.btoa(unescape(encodeURIComponent( str )))
 
}

export function btoa( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}


export function getYears( ) {
    let  alYears= [
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
        '2026',
        '2027',
        '2028',
        '2029',
        '2030',
        '2031',
        '2032',
        '2033',
        '2034',
        '2035',
      ]
    return alYears;
}

export function getMonthNames() {
  let  alMonths= [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
    return alMonths;
}

export function toLKR(value) {
  try {
    const num = Number(value)
    if (isNaN(num)) return 'Rs. 0.00'

    return `Rs. ${num.toLocaleString('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  } catch {
    return 'Rs. 0.00'
  }
}

