import { COLOURS } from "../data/styling.js";

import { tryRemoveAssignment, tryAddAssignment, tryEditAssignment, 
  isValidIndex, sortAssignmentsByDueDate } from "./assignment-list.js";
import promptRemoveAssignment from "../lib/prompt-remove-assignment.js";
import promptAddAssignment from "../lib/prompt-add-assignment.js";
import { readAssignments } from "../data/write-data.js";
import { promptEditAssignment, promptEditAssignmentIndex } from "../lib/prompt-edit.js";
import { formatAssignmentDifferences, formatAssignmentForDisplay } from "../data/styling.js";

export async function editAssignment() {

  const assignments = sortAssignmentsByDueDate(readAssignments());

  printAssignments(true);

  const index = await promptEditAssignmentIndex();

  if (!isValidIndex(index - 1)) {
    console.log("Entry is not valid!");
    return;
  }

  const assignmentBeforeEdit = assignments[index - 1];

  promptEditAssignment(assignmentBeforeEdit)
    .then((value) => {
      if (tryEditAssignment(index, value)) {
        console.log(
          formatAssignmentDifferences(
            formatAssignmentForDisplay(assignmentBeforeEdit),
            formatAssignmentForDisplay(value),
          ),
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function addAssignment() {
  promptAddAssignment()
    .then((value) => tryAddAssignment(value))
    .catch((error) => console.log(error));
}

export async function removeAssignment() {
  const assignmentName = await promptRemoveAssignment();
  const successfulRemoval = tryRemoveAssignment(assignmentName);

  if (successfulRemoval) {
    console.log(`Assignment [${assignmentName}] has been removed`);
  } else {
    console.log("Assignment with given name could not be found!");
  }
}

export function printAssignments(indexed = false) {
  console.log(COLOURS.ORANGE + "Assignments:" + COLOURS.RESET);
  console.log("\n");

  const sortedAssignments = sortAssignmentsByDueDate(readAssignments());

  let i = 1;
  for (const assignment of sortedAssignments) {
    if (indexed)
      process.stdout.write(
        "[" + COLOURS.RED + i.toString() + COLOURS.RESET + "] ",
      );
    console.log(formatAssignmentForDisplay(assignment));
    i++;
    console.log("\n");
  }
}
