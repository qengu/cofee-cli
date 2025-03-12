import readline from "node:readline/promises";
import Assignment from "../src/assignment.js";

export default async function promptAssignment() {
  let name;
  let lecture;
  let dueDate;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await rl
    .question("Name: ")
    .then((value) => {
      name = value;
      return rl.question("Class: ");
    })
    .then((value) => {
      lecture = value;
      return rl.question("Due Date (Write in the form YYYY-MM-DD-hh-mm): ");
    })
    .then((value) => {
      dueDate = value;
      rl.close();
      return new Promise((resolve, reject) => {
        try {
          const [year, month, day, hour, minute] = dueDate.split("-");
          const dateIsWithinValidDateBounds =
            year >= 1970 &&
            month >= 1 &&
            month <= 12 &&
            day >= 0 &&
            day <= 31 &&
            hour >= 0 &&
            hour <= 24 &&
            minute >= 0 &&
            minute <= 60;
          const newDate = new Date(year, month, day, hour, minute);
          if (
            !dateIsWithinValidDateBounds ||
            isNaN(newDate) ||
            !(newDate instanceof Date)
          ) {
            reject("Invalid Date Entered!");
          } else {
            resolve(
              new Assignment(
                name,
                lecture,
                new Date(year, month - 1, day, hour, minute),
              ),
            );
          }
        } catch (e) {
          reject("Cannot make sense of date entered!");
        }
      });
    });
}
