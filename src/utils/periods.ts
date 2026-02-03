export const getWeekKey = (date = new Date()) => {
    const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNr = (target.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNr + 3);
    const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
    const diff = target.getTime() - firstThursday.getTime();
    const week = 1 + Math.round(diff / 604800000);
    return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
};

export const getSeasonKey = (date = new Date()) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
};
