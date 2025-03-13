const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//Example: returns date as YYYY-MM-DD-hh-mm format
export function getDateInDashedFormat(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`
}

export function isValidDateInput(dateInput) {
  const args = dateInput.split("-").map((value) => {
    if (/^\d+$/.test(value)) return parseInt(value);
    else return false;
  });

  if (args.includes(false)) return false;

  const [year, month, day, hour, minute] = args;
  const isLeap = new Date(year, 1, 29).getMonth() === 1;
  const date = new Date(year, month - 1, day, hour, minute);

  if (isNaN(date) || !(date instanceof Date)) {
    return false;
  }

  if (hour <= 0 || hour > 24 || minute <= 0 || minute >= 60) {
    return false;
  }

  if (month <= 0 || month > 12) {
    return false;
  }

  if (month !== 2 && (day <= 0 || day > daysByMonth[month - 1])) {
    return false;
  } else if (month === 2) {
    if (day <= 0) return false;
    if (!isLeap && day > 28) return false;
    if (isLeap && day > 29) return false;
  }

  return true;
}

export function dueDateDifference(dateOne, dateTwo) {
  const msDifference = dateOne - dateTwo;
  const secondsDifference = Math.round(msDifference / 1000);

  const secondsRemainder = secondsDifference % 60;
  const minutesDifference = (secondsDifference - secondsRemainder) / 60;

  const minutesRemainder = minutesDifference % 60;
  const hoursDifference = (minutesDifference - minutesRemainder) / 60;

  const hoursRemainder = hoursDifference % 24;
  const daysDifference = (hoursDifference - hoursRemainder) / 24;

  return {
    days: daysDifference,
    hours: hoursRemainder,
    minutes: minutesRemainder,
    seconds: secondsRemainder,
  };
}
