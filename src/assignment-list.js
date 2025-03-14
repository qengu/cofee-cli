import { COLOURS, formatAssignmentForDisplay } from "../data/styling.js";

import {
  readAssignments,
  appendAssignment,
  writeAssignments,
} from "../data/write-data.js";
import { dateDifference } from "../lib/date-tools.js";
import {
  promptEditAssignment,
  promptEditAssignmentIndex,
} from "../lib/prompt-edit.js";
import promptRemoveAssignment from "../lib/prompt-remove-assignment.js";

function addAssignment(assignment) {
  appendAssignment(assignment);
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

// returns false if assignment with given name not found, true otherwise
export function tryRemoveAssignment(assignmentName, dir = "") {
  const assignments = dir === "" ? readAssignments() : readAssignments(dir);
  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i].name === assignmentName) {
      assignments.splice(i, 1);
      dir === ""
        ? writeAssignments(assignments)
        : writeAssignments(assignments, dir);
      return true;
    }
  }
  return false;
}

async function editAssignment() {
  printAssignments(true);

  const index = await promptEditAssignmentIndex();
  const assignments = sortByDueDate(readAssignments());

  if (index > assignments.length || index <= 0) {
    console.log("That index does not exist!");
    return;
  }

  const assignmentBeforeEdit = assignments[index - 1];

  promptEditAssignment(assignmentBeforeEdit)
    .then((value) => {
      assignments.splice(index - 1, 1);
      assignments.push(value);
      writeAssignments(assignments);

      console.log(
        "\n" + COLOURS.ORANGE + "Before Change:" + COLOURS.RESET + "\n",
      );
      printAssignment(assignmentBeforeEdit);
      console.log(
        "\n\n" + COLOURS.ORANGE + "After Change:" + COLOURS.RESET + "\n",
      );
      printAssignment(value);
      console.log("\n\n");
    })
    .catch((error) => {
      console.log(error);
    });
}

function printAssignments(indexed = false) {
  console.log(COLOURS.ORANGE + "Assignments:" + COLOURS.RESET);
  console.log("\n");

  const assignments = readAssignments().sort(
    (assignmentOne, assignmentTwo) =>
      assignmentOne.dueDate.getTime() - assignmentTwo.dueDate.getTime(),
  );

  let i = 1;
  for (const assignment of assignments) {
    if (indexed)
      process.stdout.write(
        "[" + COLOURS.RED + i.toString() + COLOURS.RESET + "] ",
      );
    printAssignment(assignment);
    i++;
    console.log("\n");
  }
}

function printAssignment(assignment) {
  const name = assignment.name;
  const lecture = assignment.lecture;
  const dueDate = assignment.dueDate;
  const timeUntilDueDate = dateDifference(dueDate, Date.now());

  const formattedDueDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    hour12: true,
  }).format(dueDate);

  const assignmentFormatted = formatAssignmentForDisplay(
    name,
    lecture,
    formattedDueDate,
    timeUntilDueDate,
  );

  console.log(assignmentFormatted);
}

export { addAssignment, printAssignments, editAssignment };
