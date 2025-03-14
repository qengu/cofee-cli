import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isValidDateInput } from "../../lib/date-tools.js";
import { dateDifference, getDateInDashedFormat } from "../../lib/date-tools.js";

describe("Date tests", () => {

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

  describe("isValidDateInput tests", () => {

    it("Random string", () => {
      assert.equal(isValidDateInput("axcv9230"), false);
      assert.equal(isValidDateInput("19f8-06-11-15-09"), false);
      assert.equal(isValidDateInput("2000-05-12-k-59"), false);
      assert.equal(isValidDateInput(" "), false);
      assert.equal(isValidDateInput(""), false);
    })

    it("Date input contains negative", () => {
      assert.equal(isValidDateInput("2024-04-01-03--59"), false);
      assert.equal(isValidDateInput("1988-06-11--15-09"), false);
      assert.equal(isValidDateInput("2000-05--12-13-59"), false);
      assert.equal(isValidDateInput("2000--04-11-21-39"), false);
      assert.equal(isValidDateInput("-2000--04-11-21-39"), false);
    })

    it("Date input is too large, not testing for day not in month", () => {
      assert.equal(isValidDateInput("2024-13-01-03-59"), false);
      assert.equal(isValidDateInput("1988-06-32-15-09"), false);
      assert.equal(isValidDateInput("2000-05-12-25-59"), false);
      assert.equal(isValidDateInput("2000-04-11-21-60"), false);
    })

    it("Month is feburary, day is less than 28 for non-leap year, and less than 29 for lear year", () => {
      assert.equal(isValidDateInput("2001-02-29-21-59"), false);
      assert.equal(isValidDateInput("2004-02-30-20-59"), false);
      assert.equal(isValidDateInput("2002-02-28-18-01"), true);
      assert.equal(isValidDateInput("2008-02-29-03-59"), true);
      assert.equal(isValidDateInput("2002-02-28-21-35"), true);
    })

    it("Month not feburary, day is not less than the number of days in the month", () => {
      assert.equal(isValidDateInput("2001-01-32-21-59"), false);
      assert.equal(isValidDateInput("2001-01-31-21-59"), true);
      assert.equal(isValidDateInput("2001-03-32-21-59"), false);
      assert.equal(isValidDateInput("2001-03-31-21-59"), true);
      assert.equal(isValidDateInput("2001-04-31-21-59"), false);
      assert.equal(isValidDateInput("2001-04-30-21-59"), true);
      assert.equal(isValidDateInput("2001-05-32-21-59"), false);
      assert.equal(isValidDateInput("2001-05-31-21-59"), true);
      assert.equal(isValidDateInput("2001-06-31-21-59"), false);
      assert.equal(isValidDateInput("2001-06-30-21-59"), true);
      assert.equal(isValidDateInput("2001-07-32-21-59"), false);
      assert.equal(isValidDateInput("2001-07-31-21-59"), true);
      assert.equal(isValidDateInput("2001-08-32-21-59"), false);
      assert.equal(isValidDateInput("2001-08-31-21-59"), true);
      assert.equal(isValidDateInput("2001-09-31-21-59"), false);
      assert.equal(isValidDateInput("2001-09-30-21-59"), true);
      assert.equal(isValidDateInput("2001-10-32-21-59"), false);
      assert.equal(isValidDateInput("2001-10-31-21-59"), true);
      assert.equal(isValidDateInput("2001-11-31-21-59"), false);
      assert.equal(isValidDateInput("2001-11-30-21-59"), true);
      assert.equal(isValidDateInput("2001-12-32-21-59"), false);
      assert.equal(isValidDateInput("2001-12-31-21-59"), true);
    })

  })

})
