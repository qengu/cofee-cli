import Assignment from "../src/assignment.js";
import { isValidDateInput } from "./date-tools.js";
import { inputPrompt } from "./prompt-tools.js";

export default async function promptAddAssignment() {
  const name = await inputPrompt("Name: ");
  const lecture = await inputPrompt("Class: ");
  const dueDate = await inputPrompt("Due Date (Enter in the form YYYY-MM-DD-hh-mm): ");

  return new Promise((resolve, reject) => {
    if (!isValidDateInput(dueDate)) reject("Due date is not valid!");
    else {
      const [year, month, day, hour, minute] = dueDate.split("-");
      resolve(
        new Assignment(
          name,
          lecture,
          new Date(year, month - 1, day, hour, minute),
        ),
      );
    }
  });
}
