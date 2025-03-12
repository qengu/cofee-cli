#!/usr/bin/env node

import { helpMessage } from "../data/display-messages.js";
import promptAssignment from "../lib/prompt-assignment.js";
import promptRemoveAssignment from "../lib/prompt-remove-assignment.js";
import packageInfo from "../package.json" with { type: "json" };
import {
  addAssignment,
  editAssignment,
  printAssignments,
  removeAssignment,
} from "../src/assignment-list.js";

const argv = process.argv.slice(2);

switch (argv[0]) {
  case "add":
    promptAssignment()
      .then((value) => addAssignment(value))
      .catch((error) => console.log(error));
    break;
  case "list":
    console.clear();
    printAssignments();
    break;
  case "edit":
    console.clear();
    await editAssignment();
    break;
  case "remove":
    const assignmentName = await promptRemoveAssignment();
    if (removeAssignment(assignmentName)) {
      console.log("Successfully removed assignment: " + assignmentName);
    } else {
      console.log("Could not find assignment with name: " + assignmentName);
    }
    break;
  case "--help":
  case "help":
  case "-h":
    console.clear();
    console.log(helpMessage);
    break;
  case "--version":
  case "-v":
    console.log(packageInfo.version);
    break;
  default:
    console.log('This command does not exist. Type "cofe -h" for help.');
}
