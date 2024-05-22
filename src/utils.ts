import {spawn} from "child_process"

/**
 * Execute command on a terminal
 * @param command the command that have to be executed on terminal
 */
export const executeCommand = (command: string) => {
  const bat = spawn("cmd.exe", ["/c", command])

  bat.stderr.on("data", (data) => {
    console.log("bat.stderr.on", data.toString())
  });
};
