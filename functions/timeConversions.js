

export const getTimeFromMilliseconds = (milliseconds) => {

    let secs = milliseconds / 1000;
    let mins = secs / 60;
    let hrs = mins / 60;

    hrs = Math.floor(mins / 60);
    mins -= (hrs * 60);
    secs = Math.round((1 - ((Math.floor(mins) + 1) - mins)) * 60);
    secs = (1 - ((Math.floor(mins) + 1) - mins)) * 60;
    mins = Math.floor(mins);

    let time = { seconds: Math.round(secs), minutes: mins, hours: hrs };

    if ((time.seconds === 60)) {

        time.seconds = 0
        time.minutes += 1
    };

    return time;
};

export const getTimeToMilliseconds = (secs, mins, hrs) => {
    const milliseconds = (hrs * 60 * 60 * 1000)
        + (mins * 60 * 1000)
        + (secs * 1000);

    return Math.round(milliseconds);
};


export const getNewTime = time => {

    if (time.seconds === 0 && time.minutes === 0 && time.hours === 0) {
        return { seconds: 0, minutes: 0, hours: 0 };
    };

    const newSeconds = getTimeToSeconds(time.seconds, time.minutes, time.hours) - 1;
    const newTime = getTimeFromSeconds(newSeconds);


    return newTime;
};

export const getTimeToSeconds = (seconds, minutes, hours) => {
    return seconds + (minutes * 60) + (hours * 60 * 60);
};

export const getHoursToSeconds = (hours) => {
    return (hours * 60) * 60;
};

export const getMinutesToSeconds = (minutes) => {
    return minutes * 60;
};

export const getTimeFromSeconds = (seconds) => {

    let hours = seconds / 60 / 60;
    let minutes = Math.floor((hours - Math.floor(hours)) * 60);
    hours = Math.floor(hours);
    let secs = seconds - (getMinutesToSeconds(minutes) + getHoursToSeconds(hours));

    if (secs === 60) {
        secs = 0
        minutes += 1
    }

    const time = {
        seconds: secs,
        minutes: minutes,
        hours: hours
    }

    return time;
};

export function getTimeFormat(t) {
    if (t !== null) {
        t = parseInt(t)
        return (t < 10 ? '0' : '') + t;
    }
}


