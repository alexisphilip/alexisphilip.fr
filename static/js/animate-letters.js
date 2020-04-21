class AnimateLetters {
    constructor() {
        this.initialize();
    }

    initialize() {
        let css = ".mouvy-nobr {\n" +
            "   white-space: nowrap;\n" +
            "}\n" +
            ".mouvy-animate {\n" +
            "    animation: mouvy-animation 0.6s;\n" +
            "}\n" +
            "\n" +
            "@keyframes mouvy-animation {\n" +
            "    50% {\n" +
            "        transform: rotate(-7deg) scale(1.02);\n" +
            "        color: var(--color-blue);\n" +
            "    }\n" +
            "    100% {\n" +
            "        transform: rotate(0deg) scale(1);\n" +
            "        color: var(--color-font-text);\n" +
            "    }\n" +
            "}";
        let style = document.createElement("style");
        style.setAttribute("id", "mouvy");
        style.innerHTML = css;
        document.querySelector("head").appendChild(style);
    }

    addElements(selector) {

        // let word = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, a");
        let parents = document.querySelectorAll(selector);

        // For each parent elements.
        // TODO: make it recusive. If it has children with text, keep the parent
        //  element and just add each char in span as usual.
        for (let i = 0; i < parents.length; i++) {

            // Selects all the words.
            let words = parents[i].innerText.split(" ");

            // Removes text from the parent and "display: flex" definition to it.
            // This way, the elements will wrap next to each other.
            parents[i].innerHTML = "";
            parents[i].style.display = "flex";
            parents[i].style.flexWrap = "wrap";

            // For each words.
            for (let j = 0; j < words.length; j++) {

                let chars = words[j].split("");

                // Create a span element around the word with the "white-space: no-wrap" definition.
                // The word won't be able to break at line breaks.
                let word_span = document.createElement("span");
                word_span.setAttribute("class", "mouvy-nobr");

                // Adds "display: flex" definition to it.
                word_span.style.display = "flex";
                word_span.style.flexWrap = "wrap";

                // For each chars.
                for (let k = 0; k < chars.length; k++) {
                    let char_span = document.createElement("span");
                    char_span.setAttribute("class", "mouvy-char");
                    char_span.innerHTML = chars[k];

                    // Appends the char element.
                    word_span.appendChild(char_span);
                }

                // Appends the word span (with all of its characters inside spans)
                // to the parent element.
                parents[i].appendChild(word_span);

                // Adds a white space after each word because the parent
                // property "display: flex" will shrink normal white spaces to 0px.
                word_span.innerHTML += "&nbsp;";
            }

            this.listener(parents[i]);
        }
    }

    listener(elements) {
        // Maybe just add a listener for the parent element and add a condition in the listener itself.
        // For each elements.
        elements.addEventListener("mouseover", function (e) {
            let span = e.target;
            l(e.target)
            if (span.classList.contains("mouvy-char")) {
                e.preventDefault();
                span.classList.remove("mouvy-animate");
                void span.offsetWidth;
                span.classList.add("mouvy-animate");
            }
        });
    }
}

let animateLetters = new AnimateLetters();
animateLetters.addElements("#website-title, .lead-title");

