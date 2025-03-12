const BROWN = "\x1b[38;5;130m";
const SECTION = "\x1b[38;5;135m";
const LIGHTBROWN = "\x1b[38;5;172m";
const EXAMPLECOMMAND = "\x1b[38;5;159m";
const COMMANDS = "\x1b[38;5;177m";
const RESET = "\x1b[0m";

export const helpMessage = 
LIGHTBROWN + "Welcome to" + BROWN + " cofe!\n" + RESET + "\n\n" +  
`   I made this CLI utility to help with my school tasks. It currently
only has the ability to manage assignments, hopefully more features will
be added!

${SECTION}Current Features${RESET}(Brief overview):
  Will help keep track of your assignments, and when they are due, with the ability
  to add assignments, remove them, edit them, and list all your assignments out in the
  order in which they are due.

${SECTION}Commands${RESET}:
The prefix of cofe is \"cofe\"

  ${COMMANDS}--version, -v${RESET} : Shows the version of the CLI

  ${COMMANDS}--help, -h, help${RESET} : Open this menu

  ${COMMANDS}  list${RESET} :   Displays a list of the assignments you currently have, in order of due date.

  ${COMMANDS}  add${RESET} :    Opens an interface to add an assignment to the list of assignments
            you currently have and will prompt you for the name of the assignment, the class to
            which this assignment belongs, and a due date (Format of date specified in interface):
              (e.g. Name: Math HW 3, Class: MATH 1001, Due Date: 2025-03-15-23-59)

  ${COMMANDS}  remove${RESET} : Will prompt you to type in the name of the assignment you want 
            to remove from your list

  ${COMMANDS}  edit${RESET} :   Will list out all your assignments with indexes, then open an interface
            for you to edit your assignment of your selection. Similar to the interface for adding an
            assignment,  except it will prompt you to type in the index of the assignment you want to 
            edit.

${SECTION}Example${RESET}: type \"${EXAMPLECOMMAND}cofe help${RESET}\" or \"${EXAMPLECOMMAND}cofe -h${RESET}\" 
            to open this menu, or type \"${EXAMPLECOMMAND}cofe list${RESET}\" to list out all your assignments, 
            in order of due date!` + "\n\n";
