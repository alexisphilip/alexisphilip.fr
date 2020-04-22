
class Output
{
    static write(text)
    {
        if (text === "") text = "&nbsp;";

        let line_text = "" +
            "<div class='line'>\n" +
            "  <span class='output'>" + text + "</span>" +
            "</div>";

        document.querySelector(".terminal-output").insertAdjacentHTML("beforeend", line_text);
    }

    static writeCommand(text)
    {
        let line_text = "" +
            "<div class='line'>\n" +
            "  <span class='server-name'>404@alexisphilip.fr</span>:<span class='terminal-tilde'>~</span>#" +
            "  <span class='command'>" + text + "</span>" +
            "</div>";

        document.querySelector(".terminal-output").insertAdjacentHTML("beforeend", line_text);
    }

    static writeInput(text)
    {
        document.querySelector(".terminal-input").value = text;
    }

    static smartWrite(text)
    {
        let max_padding = 0;

        // For each first element of lines, get the longest element's length (to calculate padding).
        for (let i = 0; i < text.length; i++) {
            if (text[i][0].length > max_padding) max_padding = text[i][0].length;
        }

        // For each elements,
        for (let i = 0; i < text.length; i++) {
            // Calculates the actual padding, +1 so there is a space between the right & left element.
            let padding = max_padding - text[i][0].length + 1;
            padding = "&nbsp;".repeat(padding);
            this.write(text[i][0] + padding + text[i][1]);
        }
    }
}