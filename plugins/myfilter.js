import Vue from 'vue'
import moment from 'moment'

export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

export function toFullDate(date) {
    if (date) {
        return moment(String(date)).format('MM/DD/YYYY hh:mm')
    }
}

export function toShortDate(date) {
    if (date) {
        return moment(String(date)).format('MM/DD/YY')
    }
}

export function toInputTypeDate(date) {
    if (date) {
        var formated = moment(String(date)).format('YYYY-MM-DD')
        return (formated == '1900-01-01') ? '' : formated
    }
}
export function toReadableDate(date) {

    try {
        return date.split("T")[0];
    }
    catch { return ''; }

}

export function toLKR(value) {
    var pricestr = ''
    try {
        pricestr = `Rs.${ (parseFloat(value.toFixed(2))).toLocaleString()}`;
    }
    catch { }
    return pricestr
}

export function toLKR1(value) {
    var pricestr = ''
    try {
        pricestr = (parseFloat(value.toFixed(2))).toLocaleString();
    }
    catch { }
    return pricestr
}



const filters = { timeAgo, toLKR,toLKR1, toFullDate, toShortDate, toInputTypeDate, toReadableDate}


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//$options.filters.toLKR(reservedaddetail.amount)
