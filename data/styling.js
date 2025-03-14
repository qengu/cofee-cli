const colourWithID = (id) => "\x1b[38;5;" + id.toString() + "m";

export const COLOURS = {
  RESET: "\x1b[000m",
  RED: colourWithID(31),
  ORANGE: colourWithID(214),
  DREAM: colourWithID(219),
  MAGENTA: colourWithID(104),
  REDHIGHLIGHT: colourWithID(203),
}

export function formatAssignmentForDisplay(name, lecture, formattedDueDate, timeUntilDueDate) {

  const [dueDays, dueHours, dueMinutes, dueSeconds] = 
    [timeUntilDueDate.days, timeUntilDueDate.hours, timeUntilDueDate.minutes, timeUntilDueDate.seconds];

  const formattedAssignment = [
    "[" + COLOURS.MAGENTA + lecture + COLOURS.RESET + "]", 
    COLOURS.DREAM + name + COLOURS.RESET,
    "",
    "Due By: " + formattedDueDate,
    "Due In: " + COLOURS.REDHIGHLIGHT + dueDays + " days, " + dueHours + " hours, "
    + dueMinutes + " minutes, " + dueSeconds + " seconds" + COLOURS.RESET
  ]

  return formattedAssignment.join("\n");

}
