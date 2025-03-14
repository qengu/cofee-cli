import {
  readAssignments,
  appendAssignment,
  writeAssignments,
} from "../data/write-data.js";

export function tryAddAssignment(assignment) {
  appendAssignment(assignment);
  return true;
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

export function isValidIndex(index) {
  return (index < readAssignments().length && index >= 0);
}

export async function tryEditAssignment(entry, assignment) {

  const assignments = sortAssignmentsByDueDate(readAssignments());

  assignments.splice(entry - 1, 1);
  assignments.push(assignment);
  writeAssignments(assignments);

  return true;

}

export function sortAssignmentsByDueDate(assignments) {
  return assignments.sort(
    (assignmentOne, assignmentTwo) =>
      assignmentOne.dueDate.getTime() - assignmentTwo.dueDate.getTime(),
  );
}
