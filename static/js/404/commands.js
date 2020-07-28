class Commands {

    // help
    help(args) {
        Output.write("Type any command followed by <strong>-h</strong> or <strong>--help</strong> to get its manual.");
        Output.write("");
        Output.smartWrite([
            ["cat", "- Concatenates a file to standard output."],
            ["decrypt", "- Decrypts something. You find out..."],
            ["hi", "- Says hi."],
            ["ls", "- Lists directory content alphabetically."],
            ["ping", "- Pong."],
            ["redirect", "- Redirects to another page on this site."]]);
    }

    isHelp(args) {
        return ["-h", "--help", "?"].includes(args[0]);
    }

    cat(args) {

        if (this.isHelp(args)) {
            Output.write("Concatenates a file to standard output.");
            Output.write("USAGE: cat [FILE_NAME]");
        } else if (args[0]) {
            let file = FakeDirectory.getFile(args[0]);
            // If a file exits.
            if (file) {
                Output.write(file.content);
            } else {
                Output.write("cat: " + args[0] + ": No such file or directory");
            }
        } else {
            Output.write("cat: no file given");
            Output.write("Try 'cat --help' for more information.");
        }

        // Output.write();
    }

    decrypt(args) {
        let answer = "Answer to the Ultimate Question of Life, the Universe, and Everything",
            link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        // If first arg is help.
        if (this.isHelp(args)) {
            Output.write("Decrypts, something. You find out...")
            Output.write("USAGE: decrypt -m [phrase] -k [KEY]");
            Output.write("");
            Output.write("Mandatory arguments");
            Output.smartWrite([
                ["-m", "- Encrypted message."],
                ["-k", "- Decrypting key."]
            ]);
        } // If no args.
        else if (args.length < 4) {
            Output.write("decrypt: missing arguments");
            Output.write("Try 'decrypt --help' for more information.");
        } // If other args are correct.
        else if (args[0] === "-m" && args[2] === "-k") {
            // Is decrypting is correct
            if (args[1] === "eiH3aeL2am9ieri3" && args[3] === "42") {
                // TODO: make animation when message being decrypted, with ... and wait...
                Output.write("<a href='" + link + "'>" + answer + "</a>");
                Output.write('<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            } else {
                Output.write("Decryption failed : wrong key or phrase.");
            }
        } else {

        }
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
            Output.write("Non-mandatory argument");
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
        } // If arg is not recognized.
        else {
            Output.write("ls: invalid option '" + args[0] + "'");
            Output.write("Try 'ls --help' for more information.");
        }
    }

    ping(args) {
        Output.write("pong");
    }

    redirect(args) {
        // If first arg is help.
        if (this.isHelp(args)) {
            Output.write("Redirects to a web page.");
            Output.write("USAGE: redirect [WEB_PAGE]");
            Output.write("E.g.: <strong>redirect /blog</strong>");
            return 0;
        } // If no args.
        else if (args.length === 0) {
            Output.write("redirect: no web page given");
            Output.write("Try 'redirect --help' for more information.");
        } // Redirects.
        else {
            window.location.replace(args[0]);
        }
    }
}