import readline from "node:readline/promises";

export default async function promptRemoveAssignment() {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }) 

  const name = await rl.question("Enter the name of the assignment: ");
  rl.close();
  return name;

} 
