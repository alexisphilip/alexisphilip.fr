<?php

include("src/model/MarkdownModel.php");

$data = MarkdownModel::getFile("page", $file_slug . ".md");

// TODO: fix title formatting with helper function (always more than 20 chars?).
if ($file_slug == "contact") {
    // Sets the page's title.
    RenderManager::setPageTitlePrefix("Contact me, let's have a talk");
    // Sets the meta description.
    RenderManager::setMetaDescription("Hi, I'm Alexis, a full stack Web developer based in Aix-en-Provence, France.
            Contact me at alexis.philip13@gmail.com if you want to talk or do business!");
} else {
    // Sets the page's title.
    RenderManager::setPageTitlePrefix("About me, a full stack developer");
    // Sets the meta description.
    RenderManager::setMetaDescription("I am a full stack developer based in Aix-en-Provence, France. From small programs to large scale architectures, from 
widgets to libraries, I focus on maintaining a strict workflow to build clean and reusable environments.
Creating useful and original content is what I love to do.");
}

// Loads "showdown.js" library to render HTML from Markdown.
AssetsManager::loadVendorsJsFiles("showdown.js");
// Loads "renderHTML.js" which calls "showdown.js".
AssetsManager::loadJS("renderHTML.js");

// Loads the selected template and renders it.
RenderManager::loadTemplate("markdown", "page", $data);
