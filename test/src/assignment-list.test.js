import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { tryRemoveAssignment } from "../../src/assignment-list.js";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const ASSIGNMENTS_READASSIGNMENTS_DIR = import.meta.dirname + "/data_files";
const emptyFilePath = ASSIGNMENTS_READASSIGNMENTS_DIR + "/empty-file.test.json";
const oneAssignmentFilePath = ASSIGNMENTS_READASSIGNMENTS_DIR + "/one-assignment.test.json";
const multipleAssignmentsFilePath = ASSIGNMENTS_READASSIGNMENTS_DIR + "/multiple-assignments.test.json"

describe("assignment-list tests", () => {

  let fileNames = [];
  let fileContentsBeforeTest = [];

  beforeEach(() => {

    fileNames = [];
    fileContentsBeforeTest = [];

    fileNames = readdirSync(ASSIGNMENTS_READASSIGNMENTS_DIR);
    for (const fileName of fileNames) {
      fileContentsBeforeTest.push(readFileSync(ASSIGNMENTS_READASSIGNMENTS_DIR + "/" + fileName,
        { encoding: "utf-8" }));
    }
  })

  afterEach(() => {
    for (let i = 0; i < fileContentsBeforeTest.length; i++) {
      writeFileSync(ASSIGNMENTS_READASSIGNMENTS_DIR + "/" + fileNames[i], fileContentsBeforeTest[i]);
    }

  })

  describe("tryRemoveAssignment tests", () => {

    it("Given assignment name does not exist", () => {
      const oneAssignmentFileContents = readFileSync(oneAssignmentFilePath, { encoding: "utf-8" });
      assert.equal(tryRemoveAssignment("testName", emptyFilePath), false);
      assert.equal(tryRemoveAssignment("Math assignment #1", oneAssignmentFilePath), false);
      assert.equal(readFileSync(emptyFilePath, { encoding: "utf-8" }), "[]");
      assert.equal(readFileSync(oneAssignmentFilePath, { encoding: "utf-8" }), oneAssignmentFileContents);
    })

    it("Given assignment name that exists", () => {
      assert.equal(tryRemoveAssignment("Math Assignment #1", oneAssignmentFilePath), true);
      assert.deepEqual(JSON.parse(readFileSync(oneAssignmentFilePath, { encoding: "utf-8" })), []);

      assert.equal(tryRemoveAssignment("POLISCI", multipleAssignmentsFilePath), true);
      assert.deepEqual(JSON.parse(readFileSync(multipleAssignmentsFilePath, { encoding: "utf-8" })), [{
        "name": "English Essay",
        "lecture": "English 30000",
        "dueDate": "2000-12-31T23:59:00.000Z"
      }]);
  })

})

})
