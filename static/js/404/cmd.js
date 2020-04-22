
// TODO
//  function which cleans white spaces before spliting.
//  make a parameter parser (which redirects to the command's help section when --help or -h, etc)
//  make arrow up / down search for last input
//  don't force focus the input but when character entered, put in the input.
//  ls -> make secret file? with meme inside?

class Cmd
{
    constructor() {
        this.Commands = new Commands();
        this.start();
        // this.searchCommands("help");
    }

    start()
    {
        // Gets the terminal input.
        let input = document.querySelector(".terminal-input");
        input.focus();

        // Listens to keyup events on the terminal input.
        input.addEventListener("keyup", (evt) => {

            // If enter key is pressed.
            if (evt["keyCode"] === 13) {

                // Gets the input value and resets it.
                let command = evt.target.value;
                input.value = "";

                // If input is empty, just write another line.
                if (!/\S/.test(command)) {
                    Output.writeCommand("");
                } // Otherwise, search for commands.
                else {
                    Output.writeCommand(command);
                    this.searchCommands(command);
                }
            }
        });
    }

    searchCommands(command)
    {
        // command = "help qsdf d";

        let split_command = command.split(" ");
        let args = [];

        // Gets the name of the command.
        command = split_command[0];
        split_command.shift();
        args = split_command;

        // If the command exists.
        if (typeof this.Commands[command] === "function") {
            // Dynamically call that method.
            this.Commands[command](args);
        } // If the command does not exit.
        else {
            Output.write("-bash: "+command+": command not found");
        }
    }
}

new Cmd();