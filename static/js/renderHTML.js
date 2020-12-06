let content = document.querySelector(".rendered-markdown"),
    raw_markdown = document.querySelector(".raw-markdown"),
    converter = new showdown.Converter();

converter.setOption('parseImgDimensions', true);
content.innerHTML = converter.makeHtml(raw_markdown.innerHTML);