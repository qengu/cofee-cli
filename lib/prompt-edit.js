import readline from "node:readline";
import readlinePromise from "node:readline/promises";
import Assignment from "../src/assignment.js";
import { RED, RESET } from "../src/assignment-list.js";
import { isValidDateInput } from "./prompt.js";

async function promptEditAssignmentIndex() {
  const rl = readlinePromise.createInterface(process.stdin, process.stdout);

  return await rl
    .question(
      "Enter the index of entry you want to edit (The indexes are highlighted in" +
      RED +
      " pink" +
      RESET +
      "): ",
    )
    .then((value) => {
      rl.close();
      return value;
    });
}

async function promptEditAssignment(assignment) {
  const rl = readline.createInterface(process.stdin, process.stdout);
  const prompt = (query, defaultInput) =>
    new Promise((resolve) => {
      rl.question(query, resolve);
      rl.write(defaultInput);
    });

  const getDateAsReadable = (date) => {
    let result = "";
    const dateValues = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];
    for (let dateValue of dateValues) {
      result += dateValue + "-";
    }
    return result.substring(0, result.length - 1);
  };

  const newName = await prompt("Enter the new name: ", assignment.name);
  const newLecture = await prompt("Enter the new class: ", assignment.lecture);
  const newDueDate = await prompt(
    "Enter the new Due Date (in the form YYYY-MM-DD-hh-mm where hh is in 24 hours): ",
    getDateAsReadable(assignment.dueDate),
  );

  rl.close();

  return new Promise((resolve, reject) => {
    if (!isValidDateInput(newDueDate)) reject("Due Date input is not valid!");
    else {
      const [year, month, day, hour, minute] = newDueDate.split("-");
      resolve(
        new Assignment(
          newName,
          newLecture,
          new Date(year, month - 1, day, hour, minute),
        ),
      );
    }
  });
}

export { promptEditAssignment, promptEditAssignmentIndex };
