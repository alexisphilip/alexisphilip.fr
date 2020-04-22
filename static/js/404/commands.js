class Commands {
    // help
    help(args) {
        Output.smartWrite([
            ["cat", "- Concatenates a file to standard output."],
            ["hi", "- Says hi."],
            ["ls", "- Lists directory content alphabetically."],
            ["ping", "- Pong."],
            ["redirect", "- Redirects to another page on this site."]]);
        Output.write("");
        Output.write("Type any command followed by <strong>-h</strong> or <strong>--help</strong> to get its manual.");
    }

    isHelp(args) {
        if (["-h", "--help"].includes(args[0])) {
            return true;
        } else {
            return false;
        }
    }

    hi(args) {
        Output.write("hi");
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