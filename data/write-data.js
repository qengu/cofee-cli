import Assignment from "../src/assignment.js";
import { writeFileSync, readFileSync } from "node:fs";

const ASSIGNMENTS_DIR = import.meta.dirname + "/assignments.json";

function readAssignments(dir = ASSIGNMENTS_DIR) {
  let fileContents = readFileSync(dir, { encoding: "utf-8" });

  if (fileContents === ""){
    clearAssignments(dir);
  }

  const assignmentObject = fileContents === "" ? [] : JSON.parse(fileContents);
  const assignments = [];

  for (const assignment of assignmentObject) {
    assignments.push(
      new Assignment(
        assignment.name,
        assignment.lecture,
        new Date(assignment.dueDate),
      ),
    );
  }

  return assignments;
}

function writeAssignments(assignments, dir = ASSIGNMENTS_DIR) {
  writeFileSync(dir, JSON.stringify(assignments, null, 4));
}

function appendAssignment(assignment) {
  let currentAssignments = readAssignments();

  currentAssignments.push(assignment);
  writeFileSync(ASSIGNMENTS_DIR, JSON.stringify(currentAssignments, null, 4));
}

function clearAssignments(dir) {
  writeFileSync(dir, JSON.stringify([]));
}

export {
  appendAssignment,
  writeAssignments,
  readAssignments,
  clearAssignments,
};
