import Assignment from "../src/assignment.js";
import { writeFileSync, readFileSync } from "node:fs";

const ASSIGNMENTS_DIR = import.meta.dirname + "/assignments.json";

function readAssignments() {
  const assignmentObject = JSON.parse(
    readFileSync(ASSIGNMENTS_DIR, { encoding: "utf-8" }),
  );

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

function writeAssignments(assignments) {
  writeFileSync(ASSIGNMENTS_DIR, JSON.stringify(assignments, null, 4));
}

function appendAssignment(assignment) {
  let currentAssignments = readAssignments();

  currentAssignments.push(assignment);
  writeFileSync(ASSIGNMENTS_DIR, JSON.stringify(currentAssignments, null, 4));
}

function clearAssignments() {
  writeFileSync(ASSIGNMENTS_DIR, "[]");
}

export { appendAssignment, writeAssignments, readAssignments, clearAssignments };
