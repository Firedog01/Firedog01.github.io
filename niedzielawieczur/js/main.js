let c = {
    lat: 51.77058,
    long: 19.47395
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
    var times = SunCalc.getTimes(nextSunday, c.lat, c.long);
    let sunsetInt = times.sunset.getTime();

    let s_diff = Math.round((sunsetInt - now.getTime()) / 1000);

    if(s_diff < 0) {
        $('#counter').hide();
        $('#niedzielawieczur').show();
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

    let timeStr = `${day} - ${hour}:${min}:${sec}`;

    $('#counter').html(timeStr);
    setTimeout(counter, 10);
}

function updateCoords(px, py) {
    var image = document.getElementById('map-image');
    var position = image.getBoundingClientRect();
    let relative_x = px - position.left;
    let relative_y = py - position.top;
    console.log(relative_x, relative_y);
    let client_x = image.clientWidth;
    let client_y = image.clientHeight;
    console.log(client_x, client_y);
    let c_x = (relative_x / client_x) * 360 - 180;
    let c_y = -((relative_y / client_y) * 180 - 90);
    console.log(c_x, c_y);
    c.lat = c_y;
    c.long = c_x;
}

function drawDot() {

}



$('#map-image').click(function (e) { 
    updateCoords(e.pageX, e.pageY);
});

counter();
document.getElementById('map-image').ondragstart = function () { return false; };


