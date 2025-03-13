import readline from "node:readline/promises";
import Assignment from "../src/assignment.js";
import { isValidDateInput } from "./prompt.js";

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
        if (!isValidDateInput(dueDate)) reject("Due date input is not valid!");
        else {
          const [year, month, day, hour, minute] = dueDate.split("-");
          resolve(new Assignment(name, lecture, new Date(year, month - 1, day, hour, minute)));
        }
      });
    });
}
