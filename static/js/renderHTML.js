let content = document.querySelector(".content"),
    raw_markdown = document.querySelector(".raw-markdown"),
    converter = new showdown.Converter();

content.innerHTML = converter.makeHtml(raw_markdown.innerHTML);