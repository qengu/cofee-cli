import readline from "node:readline";

export async function inputPrompt(query, defaultInput = "", rejectCondition = () => false, rejectMessage = "") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(query, (answer) => {
      rl.close();
      if (rejectCondition(answer)) reject(rejectMessage);
      else resolve(answer);
    });
    rl.write(defaultInput);
  });
}
