let c = {
    x: 51.77058,
    y: 19.47395
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
    var times = SunCalc.getTimes(nextSunday, c.x, c.y);
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
    var x = position.left;
    var y = position.top;
    let ix = px - x;
    let iy = py - y;
    console.log(ix, iy);
    let cx = image.clientWidth;
    let cy = image.clientHeight;
    console.log(cx, cy);
    let rel_x = (ix / cx) * 360 - 180;
    let rel_y = (iy / cy) * 360 - 180;
    console.log(rel_x, rel_y);
}

function drawDot() {

}

$('#map-image').click(function (e) { 
    updateCoords(e.pageX, e.pageY);
});

counter();


