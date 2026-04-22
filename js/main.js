let timecard_entry_count = 0;

function init_calculators() {
    setup_navigation();
    setup_age_calculator();
    setup_date_calculator();
    setup_time_calculator();
    setup_hours_calculator();
    setup_timecard_calculator();
    setup_timezone_calculator();
    setup_duration_calculator();
    setup_daycounter_calculator();
    setup_dayofweek_calculator();
}

function setup_navigation() {
    const nav_buttons = document.querySelectorAll('.calculator-nav button');
    const sections = document.querySelectorAll('.calculator-section');
    const site_title = document.getElementById('site-title');
    
    nav_buttons.forEach(button => {
        button.addEventListener('click', function() {
            const calc_type = this.getAttribute('data-calc');
            
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            const target_section = document.getElementById(calc_type + '-calculator');
            if (target_section) {
                target_section.classList.remove('hidden');
            }
        });
    });
    
    site_title.addEventListener('click', function() {
        reset_all_calculators();
    });
}

function reset_all_calculators() {
    const sections = document.querySelectorAll('.calculator-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const age_inputs = document.querySelectorAll('#age-calculator input');
    age_inputs.forEach(input => input.value = '');
    document.getElementById('age-result').textContent = '';
    
    document.getElementById('date-start').value = '';
    document.getElementById('date-end').value = '';
    document.getElementById('date-operation').value = 'diff';
    document.getElementById('date-days').value = '0';
    document.getElementById('date-days-input').style.display = 'none';
    document.getElementById('date-result').textContent = '';
    
    document.getElementById('time-value').value = '0';
    document.getElementById('time-from').value = 'seconds';
    document.getElementById('time-to').value = 'seconds';
    document.getElementById('time-result').textContent = '';
    
    document.getElementById('hours-start').value = '';
    document.getElementById('hours-end').value = '';
    document.getElementById('hours-break').value = '0';
    document.getElementById('hours-result').textContent = '';
    
    timecard_entry_count = 0;
    const timecard_entries = document.getElementById('timecard-entries');
    timecard_entries.innerHTML = '';
    document.getElementById('timecard-result').textContent = '';
    
    const now = new Date();
    const current_time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const current_date = now.toISOString().split('T')[0];
    document.getElementById('timezone-time').value = current_time;
    document.getElementById('timezone-date').value = current_date;
    document.getElementById('timezone-result').textContent = '';
    
    document.getElementById('duration-start').value = '';
    document.getElementById('duration-end').value = '';
    document.getElementById('duration-result').textContent = '';
    
    document.getElementById('daycounter-start').value = '';
    document.getElementById('daycounter-end').value = '';
    document.getElementById('daycounter-result').textContent = '';
    
    document.getElementById('dayofweek-date').value = '';
    document.getElementById('dayofweek-result').textContent = '';
}

function setup_age_calculator() {
    const btn = document.getElementById('age-calculate-btn');
    btn.addEventListener('click', function() {
        const birth_date = document.getElementById('age-birth-date').value;
        
        if (!birth_date) {
            document.getElementById('age-result').textContent = 'Please select a birth date.';
            return;
        }
        
        const age_data = calculate_age(birth_date);
        document.getElementById('age-result').textContent = 
            'Age: ' + age_data.years + ' years, ' + age_data.months + ' months, ' + age_data.days + ' days';
    });
}

function setup_date_calculator() {
    const operation_select = document.getElementById('date-operation');
    const days_input = document.getElementById('date-days-input');
    const btn = document.getElementById('date-calculate-btn');
    
    operation_select.addEventListener('change', function() {
        if (this.value === 'diff') {
            days_input.style.display = 'none';
        } else {
            days_input.style.display = 'block';
        }
    });
    
    btn.addEventListener('click', function() {
        const start_date = document.getElementById('date-start').value;
        const end_date = document.getElementById('date-end').value;
        const operation = document.getElementById('date-operation').value;
        
        if (!start_date) {
            document.getElementById('date-result').textContent = 'Please select a start date.';
            return;
        }
        
        let result_text = '';
        
        if (operation === 'diff') {
            if (!end_date) {
                document.getElementById('date-result').textContent = 'Please select an end date.';
                return;
            }
            const diff = date_difference(start_date, end_date);
            result_text = 'Difference: ' + diff + ' days';
        } else if (operation === 'add') {
            const days = document.getElementById('date-days').value;
            const new_date = add_days_to_date(start_date, days);
            result_text = 'Result: ' + new_date;
        } else if (operation === 'subtract') {
            const days = document.getElementById('date-days').value;
            const new_date = subtract_days_from_date(start_date, days);
            result_text = 'Result: ' + new_date;
        }
        
        document.getElementById('date-result').textContent = result_text;
    });
}

function setup_time_calculator() {
    const btn = document.getElementById('time-calculate-btn');
    btn.addEventListener('click', function() {
        const value = parseFloat(document.getElementById('time-value').value);
        const from_unit = document.getElementById('time-from').value;
        const to_unit = document.getElementById('time-to').value;
        
        if (isNaN(value)) {
            document.getElementById('time-result').textContent = 'Please enter a valid number.';
            return;
        }
        
        const result = convert_time(value, from_unit, to_unit);
        document.getElementById('time-result').textContent = 
            value + ' ' + from_unit + ' = ' + result.toFixed(4) + ' ' + to_unit;
    });
}

function setup_hours_calculator() {
    const btn = document.getElementById('hours-calculate-btn');
    btn.addEventListener('click', function() {
        const start_time = document.getElementById('hours-start').value;
        const end_time = document.getElementById('hours-end').value;
        const break_minutes = document.getElementById('hours-break').value || 0;
        
        if (!start_time || !end_time) {
            document.getElementById('hours-result').textContent = 'Please select start and end times.';
            return;
        }
        
        const result = calculate_hours(start_time, end_time, break_minutes);
        document.getElementById('hours-result').textContent = 
            'Total: ' + result.hours + ' hours and ' + result.minutes + ' minutes';
    });
}

function setup_timecard_calculator() {
    const add_btn = document.getElementById('timecard-add-entry');
    const calc_btn = document.getElementById('timecard-calculate-btn');
    
    add_btn.addEventListener('click', function() {
        timecard_entry_count++;
        const entries_div = document.getElementById('timecard-entries');
        
        const entry_div = document.createElement('div');
        entry_div.className = 'timecard-entry';
        entry_div.id = 'timecard-entry-' + timecard_entry_count;
        
        entry_div.innerHTML = 
            '<div class="input-group">' +
                '<label>Start Time:</label>' +
                '<input type="time" class="timecard-start">' +
            '</div>' +
            '<div class="input-group">' +
                '<label>End Time:</label>' +
                '<input type="time" class="timecard-end">' +
            '</div>' +
            '<div class="input-group">' +
                '<label>Break (minutes):</label>' +
                '<input type="number" class="timecard-break" value="0" min="0">' +
            '</div>' +
            '<button class="timecard-remove">Remove</button>';
        
        entries_div.appendChild(entry_div);
        
        const remove_btn = entry_div.querySelector('.timecard-remove');
        remove_btn.addEventListener('click', function() {
            entry_div.remove();
        });
    });
    
    calc_btn.addEventListener('click', function() {
        const entries = document.querySelectorAll('.timecard-entry');
        let total_minutes = 0;
        
        entries.forEach(entry => {
            const start_time = entry.querySelector('.timecard-start').value;
            const end_time = entry.querySelector('.timecard-end').value;
            const break_mins = entry.querySelector('.timecard-break').value || 0;
            
            if (start_time && end_time) {
                const result = calculate_hours(start_time, end_time, break_mins);
                total_minutes += result.hours * 60 + result.minutes;
            }
        });
        
        const formatted = format_timecard_total(total_minutes);
        document.getElementById('timecard-result').textContent = 
            'Total: ' + formatted.hours + ' hours and ' + formatted.minutes + ' minutes';
    });
}

function setup_timezone_calculator() {
    const from_select = document.getElementById('timezone-from');
    const to_select = document.getElementById('timezone-to');
    
    time_zones.forEach(zone => {
        const option1 = document.createElement('option');
        option1.value = zone.name;
        option1.textContent = zone.name + ' (UTC' + (zone.offset >= 0 ? '+' : '') + zone.offset + ')';
        from_select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = zone.name;
        option2.textContent = zone.name + ' (UTC' + (zone.offset >= 0 ? '+' : '') + zone.offset + ')';
        to_select.appendChild(option2);
    });
    
    const now = new Date();
    const current_time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const current_date = now.toISOString().split('T')[0];
    document.getElementById('timezone-time').value = current_time;
    document.getElementById('timezone-date').value = current_date;
    
    const btn = document.getElementById('timezone-calculate-btn');
    btn.addEventListener('click', function() {
        const time_val = document.getElementById('timezone-time').value;
        const date_val = document.getElementById('timezone-date').value;
        const from_zone = document.getElementById('timezone-from').value;
        const to_zone = document.getElementById('timezone-to').value;
        
        if (!time_val || !date_val) {
            document.getElementById('timezone-result').textContent = 'Please enter time and date.';
            return;
        }
        
        const result = convert_timezone(time_val, date_val, from_zone, to_zone);
        if (result) {
            document.getElementById('timezone-result').textContent = 
                'Converted: ' + result.time + ' on ' + result.date;
        } else {
            document.getElementById('timezone-result').textContent = 'Error converting timezone.';
        }
    });
}

function setup_duration_calculator() {
    const btn = document.getElementById('duration-calculate-btn');
    btn.addEventListener('click', function() {
        const start_dt = document.getElementById('duration-start').value;
        const end_dt = document.getElementById('duration-end').value;
        
        if (!start_dt || !end_dt) {
            document.getElementById('duration-result').textContent = 'Please select start and end dates/times.';
            return;
        }
        
        const result = calculate_time_duration(start_dt, end_dt);
        document.getElementById('duration-result').textContent = 
            'Duration: ' + result.days + ' days, ' + result.hours + ' hours, ' + 
            result.minutes + ' minutes, ' + result.seconds + ' seconds';
    });
}

function setup_daycounter_calculator() {
    const btn = document.getElementById('daycounter-calculate-btn');
    btn.addEventListener('click', function() {
        const start_date = document.getElementById('daycounter-start').value;
        const end_date = document.getElementById('daycounter-end').value;
        
        if (!start_date || !end_date) {
            document.getElementById('daycounter-result').textContent = 'Please select start and end dates.';
            return;
        }
        
        const days = count_days(start_date, end_date);
        document.getElementById('daycounter-result').textContent = 'Days between: ' + days + ' days';
    });
}

function setup_dayofweek_calculator() {
    const btn = document.getElementById('dayofweek-calculate-btn');
    btn.addEventListener('click', function() {
        const date_val = document.getElementById('dayofweek-date').value;
        
        if (!date_val) {
            document.getElementById('dayofweek-result').textContent = 'Please select a date.';
            return;
        }
        
        const day_name = get_day_of_week(date_val);
        document.getElementById('dayofweek-result').textContent = 'Day of week: ' + day_name;
    });
}

document.addEventListener('DOMContentLoaded', init_calculators);
