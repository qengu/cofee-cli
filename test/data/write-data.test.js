import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { readAssignments, writeAssignments } from "../../data/write-data.js";
import Assignment from "../../src/assignment.js";
import { dateDifference, getDateInDashedFormat } from "../../lib/date-tools.js";

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

  describe("dueDateDifference tests", () => {

    const dateOne = new Date(1999, 0, 13, 23, 59);
    const dateTwo = new Date(2000, 1, 29, 12, 0);
    const dateThree = new Date(2199, 11, 31, 1, 0, 13);

    it("General tests", () => {
      assert.deepEqual(dateDifference(dateTwo, dateOne), { days: 411, hours: 12, minutes: 1, seconds: 0 });
      assert.deepEqual(dateDifference(dateThree, dateTwo), {days: 72988, hours: 13, minutes: 0, seconds: 13});
    })

  })

  describe("getDateInDashedFormat tests", () => {

    const dateOne = new Date(1999, 0, 13, 23, 59);
    const dateTwo = new Date(2000, 1, 29, 12, 0);
    const dateThree = new Date(2199, 11, 31, 0, 0);

    it("Date with single digit values", () => {
      assert.equal(getDateInDashedFormat(dateOne), "1999-01-13-23-59");
      assert.equal(getDateInDashedFormat(dateTwo), "2000-02-29-12-00");
      assert.equal(getDateInDashedFormat(dateThree), "2199-12-31-00-00");
    })

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
