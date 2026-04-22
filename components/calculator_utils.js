const time_zones = [
    { name: "UTC", offset: 0 },
    { name: "EST", offset: -5 },
    { name: "CST", offset: -6 },
    { name: "MST", offset: -7 },
    { name: "PST", offset: -8 },
    { name: "GMT", offset: 0 },
    { name: "CET", offset: 1 },
    { name: "EET", offset: 2 },
    { name: "JST", offset: 9 },
    { name: "AEST", offset: 10 },
    { name: "IST", offset: 5.5 },
    { name: "BST", offset: 1 }
];

function calculate_age(birth_date) {
    const today = new Date();
    const birth = new Date(birth_date);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        const prev_month = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prev_month.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years: years, months: months, days: days };
}

function date_difference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff_ms = Math.abs(d2 - d1);
    const diff_days = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
    return diff_days;
}

function add_days_to_date(date_str, days) {
    const date = new Date(date_str);
    date.setDate(date.getDate() + parseInt(days));
    return date.toISOString().split('T')[0];
}

function subtract_days_from_date(date_str, days) {
    const date = new Date(date_str);
    date.setDate(date.getDate() - parseInt(days));
    return date.toISOString().split('T')[0];
}

function convert_time(value, from_unit, to_unit) {
    const to_seconds = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400
    };
    
    const seconds = value * to_seconds[from_unit];
    const result = seconds / to_seconds[to_unit];
    
    return result;
}

function calculate_hours(start_time, end_time, break_minutes) {
    const start = new Date("2000-01-01T" + start_time);
    const end = new Date("2000-01-01T" + end_time);
    
    let diff_ms = end - start;
    if (diff_ms < 0) {
        diff_ms += 24 * 60 * 60 * 1000;
    }
    
    const total_minutes = (diff_ms / (1000 * 60)) - parseInt(break_minutes);
    const hours = Math.floor(total_minutes / 60);
    const mins = total_minutes % 60;
    
    return { hours: hours, minutes: mins };
}

function calculate_time_duration(start_datetime, end_datetime) {
    const start = new Date(start_datetime);
    const end = new Date(end_datetime);
    const diff_ms = Math.abs(end - start);
    
    const days = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff_ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff_ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff_ms % (1000 * 60)) / 1000);
    
    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
}

function count_days(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diff_ms = Math.abs(end - start);
    const diff_days = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
    return diff_days;
}

function get_day_of_week(date_str) {
    const date = new Date(date_str);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

function convert_timezone(time_str, date_str, from_zone_name, to_zone_name) {
    const from_zone = time_zones.find(z => z.name === from_zone_name);
    const to_zone = time_zones.find(z => z.name === to_zone_name);
    
    if (!from_zone || !to_zone) {
        return null;
    }
    
    const [hours, minutes] = time_str.split(':').map(Number);
    const date_parts = date_str.split('-');
    const year = parseInt(date_parts[0]);
    const month = parseInt(date_parts[1]) - 1;
    const day = parseInt(date_parts[2]);
    
    let total_minutes = hours * 60 + minutes;
    const offset_diff = (to_zone.offset - from_zone.offset) * 60;
    total_minutes += offset_diff;
    
    let new_day = day;
    while (total_minutes < 0) {
        total_minutes += 24 * 60;
        new_day--;
    }
    while (total_minutes >= 24 * 60) {
        total_minutes -= 24 * 60;
        new_day++;
    }
    
    const new_date = new Date(year, month, new_day);
    const new_hours = Math.floor(total_minutes / 60);
    const new_mins = total_minutes % 60;
    
    const formatted_hours = String(new_hours).padStart(2, '0');
    const formatted_mins = String(new_mins).padStart(2, '0');
    const formatted_date = new_date.toISOString().split('T')[0];
    
    return {
        time: formatted_hours + ':' + formatted_mins,
        date: formatted_date
    };
}

function format_timecard_total(total_minutes) {
    const hours = Math.floor(total_minutes / 60);
    const mins = total_minutes % 60;
    return { hours: hours, minutes: mins };
}
