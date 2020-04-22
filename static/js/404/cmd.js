
// TODO
//  function which cleans white spaces before testing the command (in the first addEventListener).
//  make a parameter parser (which redirects to the command's help section when --help or -h, etc)
//  make arrow up / down search for last input
//  don't force focus the input but when character entered, put in the input.
//  ls -> make secret file? with meme inside?
//  chown, chmod?
//  dcrypt -> déchiffre l'algo de César
//  ping... replies ... pong with typewriter effect

class Cmd
{
    constructor() {
        this.Commands = new Commands();
        this.start();
    }

    start()
    {
        // Gets the terminal input.
        let input = document.querySelector(".terminal-input");
        input.focus();

        // Defines the bash history.
        let bash_history = [];
        // Defines the current position in the history.
        // -1 is empty terminal input "",
        // 0 is the last terminal entry,
        // 1 is the second terminal entry, and so on.
        let bash_position = -1;

        // Listens to keyup events on the terminal input.
        input.addEventListener("keyup", (evt) => {

            // If enter key is pressed.
            if (evt["keyCode"] === 13) {

                // Gets the input value and resets it.
                let command = evt.target.value;
                input.value = "";

                // Resets the bash position.
                bash_position = -1;

                // If input is empty, just write another line.
                if (!/\S/.test(command)) {
                    Output.writeCommand("");
                } // Otherwise...
                else {
                    // If the bash history has one element OR
                    // if it has at least one element AND the current
                    // command is different from the last command (so it
                    // does not add the same command multiple times in a row).
                    if (bash_history.length === 0 || (bash_history.length > 0 && bash_history[0] !== command)) {
                        // Add the command to the history (in first position).
                        bash_history.unshift(command);
                    }

                    // Outputs the command.
                    Output.writeCommand(command);
                    // Search if the command exists.
                    this.searchCommands(command);
                }
            }

            // If up arrow is pressed.
            if (evt["keyCode"] === 38) {
                if (bash_position < bash_history.length - 1)
                    bash_position++;
                if (bash_history.length > 0) {
                    Output.writeInput(bash_history[bash_position]);
                }
            }
            // If down arrow is pressed.
            if (evt["keyCode"] === 40) {
                if (bash_position >= 0)
                    bash_position--;
                if (bash_position === -1 || bash_history.length === 0) {
                    Output.writeInput("");
                } else {
                    Output.writeInput(bash_history[bash_position]);
                }
            }
        });
    }

    searchCommands(command)
    {
        let split_command = command.split(" ");
        let args = [];

        // Gets the name of the command.
        command = split_command[0];
        split_command.shift();
        args = split_command;

        // If help command.
        if (["?", "-h", "--help", "help"].includes(command)) {
            this.Commands.help(args);
        }
        // If the command exists.
        else if (typeof this.Commands[command] === "function") {
            // Dynamically call that method.
            this.Commands[command](args);
        } // If the command does not exit.
        else {
            Output.write("-bash: "+command+": command not found");
        }
    }
}

new Cmd();