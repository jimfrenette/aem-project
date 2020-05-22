function getCookie(name) {
    var val = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return val ? val[2] : null;
}

function setCookie(name, value, days) {
    var date = new Date;
    date.setTime(date.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + date.toGMTString();
}

export {
    getCookie,
    setCookie
};
