import { inputPrompt } from "./prompt-tools.js";

export default async function promptRemoveAssignment() {
  return inputPrompt("Enter the name of the assignment: ");
}
