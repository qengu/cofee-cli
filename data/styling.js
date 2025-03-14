import { dateDifference } from "../lib/date-tools.js";

const colourWithID = (id) => "\x1b[38;5;" + id.toString() + "m";

export const COLOURS = {
  RESET: "\x1b[000m",
  RED: colourWithID(31),
  ORANGE: colourWithID(214),
  DREAM: colourWithID(219),
  MAGENTA: colourWithID(104),
  REDHIGHLIGHT: colourWithID(203),
}

export function formatAssignmentDifferences(assignmentOneFormatted, assignmentTwoFormatted) {

  const formattedDifferences = [
    "",
    COLOURS.ORANGE + "Before Change:" + COLOURS.RESET,
    assignmentOneFormatted,
    COLOURS.ORANGE + "After Change:" + COLOURS.RESET,
    "",
    assignmentTwoFormatted,
  ]

  return formattedDifferences.join("\n")

}
 
export function formatAssignmentForDisplay(assignment) {

  const name = assignment.name;
  const lecture = assignment.lecture;
  const dueDate = assignment.dueDate;
  const timeUntilDueDate = dateDifference(dueDate, Date.now());

  const formattedDueDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    hour12: true,
  }).format(dueDate);

  return formatAssignmentElements(
    name,
    lecture,
    formattedDueDate,
    timeUntilDueDate,
  );

}

function formatAssignmentElements(name, lecture, formattedDueDate, timeUntilDueDate) {

  const [dueDays, dueHours, dueMinutes, dueSeconds] = 
    [timeUntilDueDate.days, timeUntilDueDate.hours, timeUntilDueDate.minutes, timeUntilDueDate.seconds];

  const formattedAssignment = [
    "[" + COLOURS.MAGENTA + lecture + COLOURS.RESET + "] " + COLOURS.DREAM + name + COLOURS.RESET,
    "",
    "Due By: " + formattedDueDate,
    "Due In: " + COLOURS.REDHIGHLIGHT + dueDays + " days, " + dueHours + " hours, "
    + dueMinutes + " minutes, " + dueSeconds + " seconds" + COLOURS.RESET
  ]

  return formattedAssignment.join("\n");

}
