import Assignment from "../src/assignment.js";
import { isValidDateInput } from "./date-tools.js";
import { inputPrompt } from "./prompt-tools.js";

export default async function promptAssignment() {
  const name = await inputPrompt("Name: ");
  const lecture = await inputPrompt("Lecture: ");
  const dueDate = await inputPrompt("Due Date: ");

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
