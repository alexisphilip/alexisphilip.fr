class Commands {


    // help
    help(args) {
        Output.write("Type any command followed by <strong>-h</strong> or <strong>--help</strong> to get its manual.");
        Output.write("");
        Output.smartWrite([
            ["cat", "- Concatenates a file to standard output."],
            ["dcrypt", "- Decrypts, something. You find out..."],
            ["hi", "- Says hi."],
            ["ls", "- Lists directory content alphabetically."],
            ["ping", "- Pong."],
            ["redirect", "- Redirects to another page on this site."]]);
    }

    isHelp(args) {
        if (["-h", "--help", "?"].includes(args[0])) {
            return true;
        } else {
            return false;
        }
    }

    cat(args) {
        Output.write();
    }

    dcrypt(args) {
        let answer = "Answer to the Ultimate Question of Life, the Universe, and Everything",
            link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

    hi(args) {
        Output.write("hi");
    }

    ls(args) {
        // If first arg is help.
        if (this.isHelp(args)) {
            Output.write("Lists directory content alphabetically.");
            Output.write("USAGE: ls [OPTION]");
            Output.write("");
            Output.write("Mandatory argument");
            Output.smartWrite([
                ["-l", "- Shows rights, owners, size, name."]
            ]);
        } // If no args.
        else if (args.length === 0) {
            let files = FakeDirectory.getFiles(),
                output = "";

            for (let i = 0; i < files.length; i++) {
                output += files[i].name + "&nbsp;&nbsp;&nbsp;";
            }

            Output.write(output);
        } // If first arg is -l
        else if (["-l"].includes(args[0])) {
            let files = FakeDirectory.getFiles(),
                output = [];

            files.forEach(function (file, key) {
                let size = file.content.length * 2;
                output.push([file.rights + " " + file.owner + " " + size, file.name]);
            });

            Output.smartWrite(output);
        } // If arg is not recognized
        else {
            Output.write("ls: invalid option '" + args[0] + "'");
            Output.write("Try 'ls --help' for more information.");
        }
    }

    ping(args) {
        Output.write("pong");
    }

    redirect(args) {
        if (this.isHelp(args)) {
            Output.write("Redirects to a web page.");
            Output.write("E.g.: <strong>redirect /blog</strong>");
            return 0;
        } else if (typeof args[0] === "undefined") {
            Output.write("Missing one argument \"location\".");
            Output.write("E.g.: <strong>redirect /blog</strong>");
        } else {
            window.location.replace(args[0]);
        }
    }
}