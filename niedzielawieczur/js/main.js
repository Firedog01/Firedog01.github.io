function getTimeStr(time) {
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

function nextDate(dayIndex) {
    var today = new Date();
    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
    return today;
}

function prependZero(num) {
    if(num < 10) return '0' + num;
    else return num;
}

function counter() {
    let now = new Date();
    let nextSunday = nextDate(0);
    var times = SunCalc.getTimes(nextSunday, 51.77058, 19.47395);
    let sunsetInt = times.sunset.getTime();

    let s_diff = Math.round((sunsetInt - now.getTime()) / 1000);

    if(s_diff < 0) {
        $('#counter').html('jest niedzielawieczur');
    }
    let sec = s_diff % 60;
    sec = prependZero(sec);
    s_diff = Math.floor(s_diff / 60);
    let min = s_diff % 60;
    min = prependZero(min);
    s_diff = Math.floor(s_diff / 60);
    let hour = s_diff % 24;
    hour = prependZero(hour);
    s_diff = Math.floor(s_diff / 24);
    let day = s_diff;

    let timeStr = `${day} ${hour}:${min}:${sec}`;
    
    $('#counter').html(timeStr);
    setTimeout(counter, 10);
}

counter();


