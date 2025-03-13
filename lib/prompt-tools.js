import readline from "node:readline";

const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function inputPrompt(query, defaultInput = "", rejectCondition = () => false, rejectMessage = "") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(query, (answer) => {
      rl.close();
      if (rejectCondition(answer)) reject(rejectMessage);
      else resolve(answer);
    });
    rl.write(defaultInput);
  });
}

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
