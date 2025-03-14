#!/usr/bin/env node

import { helpMessage } from "../data/display-messages.js";
import packageInfo from "../package.json" with { type: "json" };
import { addAssignment, editAssignment, printAssignments, removeAssignment } from "../src/assignment-actions.js";

const argv = process.argv.slice(2);

switch (argv[0]) {
  case "add":
    addAssignment();
    break;
  case "list":
    console.clear();
    printAssignments();
    break;
  case "edit":
    console.clear();
    editAssignment();
    break;
  case "remove":
    removeAssignment();
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
