let content = document.querySelector(".inner-main"),
    raw_markdown = document.querySelector(".raw-markdown"),
    converter = new showdown.Converter();

content.innerHTML = converter.makeHtml(raw_markdown.innerHTML);