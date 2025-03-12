import {
  readAssignments,
  appendAssignment,
  writeAssignments,
} from "../data/write-data.js";
import {
  promptEditAssignment,
  promptEditAssignmentIndex,
} from "../lib/prompt-edit.js";

const colour = (id) => "\x1b[" + id + "m";

export const RED = colour("31");
const MAGENTA = "\x1b[38;5;104m";
const REDHIGHLIGHT = "\x1b[38;5;203m"
const ORANGE = "\x1b[38;5;214m"
export const RESET = "\x1b[0m";

function addAssignment(assignment) {
  appendAssignment(assignment);
}

function removeAssignment(assignmentName) {
  const assignments = readAssignments();
  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i].name === assignmentName) {
      assignments.splice(i, 1);
      writeAssignments(assignments);
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

      console.log("\n" + ORANGE + "Before Change:" + RESET + "\n");
      printAssignment(assignmentBeforeEdit);
      console.log("\n\n" + ORANGE + "After Change:" + RESET + "\n");
      printAssignment(value);
      console.log("\n\n");

    })
    .catch((error) => {
      console.log(error);
    });
}

function printAssignments(indexed = false) {
  console.log(ORANGE + "Assignments:" + RESET);
  console.log("\n");

  const assignments = sortByDueDate(readAssignments());
  let i = 1;
  for (const assignment of assignments) {
    if (indexed) process.stdout.write("[" + RED + i.toString() + RESET + "] ");
    printAssignment(assignment);
    i++;
    console.log("\n");
  }
}

function printAssignment(assignment) {
  const name = assignment.name;
  const lecture = assignment.lecture;
  const dueDate = assignment.dueDate;

  const timeUntilDueDate = dueDateDifferenceInDays(dueDate, Date.now());

  const formatDueDate = (dueDate) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      hour12: true
    }).format(dueDate);
  };

  let assignmentFormatted = "[" + MAGENTA + lecture + RESET + "] \n";
  assignmentFormatted +=
    `${name} \nDue By: ${formatDueDate(assignment.dueDate)}\n` +
    "Due In: " + REDHIGHLIGHT + 
    `${timeUntilDueDate.days} days, ${timeUntilDueDate.hours} hours, ${timeUntilDueDate.minutes} minutes, ${timeUntilDueDate.seconds} seconds`
  + RESET;
  console.log(assignmentFormatted);
}

function sortByDueDate(assignments) {
  assignments.sort((assignmentOne, assignmentTwo) => {
    return assignmentOne.dueDate.getTime() - assignmentTwo.dueDate.getTime();
  });
  return assignments;
}

function dueDateDifferenceInDays(dateOne, dateTwo) {
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

export { addAssignment, removeAssignment, printAssignments, editAssignment };
