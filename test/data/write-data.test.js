import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { readAssignments, writeAssignments } from "../../data/write-data.js";
import Assignment from "../../src/assignment.js";

const ASSIGNMENTS_READASSIGNMENTS_DIR = import.meta.dirname + "/data_files";

describe("Writing and reading data tests", () => {

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

  describe("readAssignments tests", () => {
    it("Empty file", () => {
      const emptyFilePath = ASSIGNMENTS_READASSIGNMENTS_DIR + "/empty-file.test.json";
      assert.deepEqual(readAssignments(emptyFilePath), []);
    });
    it("Empty array", () => {
      assert.deepEqual(readAssignments(ASSIGNMENTS_READASSIGNMENTS_DIR + "/empty-array.test.json"), []);
    });
    it("One assignment", () => {
      const assignments = 
        [new Assignment("Math Assignment #1", "Math \"1001\"", new Date("2025-03-29T19:13:00.000Z"))];
      assert.deepEqual(readAssignments(ASSIGNMENTS_READASSIGNMENTS_DIR + "/one-assignment.test.json"), assignments);
    });
    it("Multiple assignments", () => {
      const assignments = 
        [new Assignment("POLISCI", "POLISCI", new Date("2222-12-22T22:22:00.000Z")),
         new Assignment("English Essay", "English 30000", new Date("2000-12-31T23:59:00.000Z"))];
      assert.deepEqual(readAssignments(ASSIGNMENTS_READASSIGNMENTS_DIR + "/multiple-assignments.test.json"), assignments);
    });
  });

});
