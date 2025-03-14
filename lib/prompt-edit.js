import { COLOURS } from "../data/styling.js";

import Assignment from "../src/assignment.js";
import { inputPrompt } from "./prompt-tools.js";
import { getDateInDashedFormat, isValidDateInput } from "./date-tools.js";

async function promptEditAssignmentIndex() {
  return inputPrompt(
    "Enter the index of entry you want to edit (The indexes are highlighted in" +
    COLOURS.RED +
    " pink" +
    COLOURS.RESET +
    "): ",
  );
}

async function promptEditAssignment(assignment) {
  const newName = await inputPrompt("Enter the new name: ", assignment.name);
  const newLecture = await inputPrompt(
    "Enter the new class: ",
    assignment.lecture,
  );
  const newDueDate = await inputPrompt(
    "Enter the new Due Date (in the form YYYY-MM-DD-hh-mm where hh is in 24 hours): ",
    getDateInDashedFormat(assignment.dueDate)
  );

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
