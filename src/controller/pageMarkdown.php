<?php

function pageMarkdown($type, $name)
{
    // If a page needs to be rendered to HTML.
    if ($type == "page") {
        $file_path = "content/pages/" . $name;

        // Sets the page's title.
        RenderManager::setPageTitle("Page");
    }
    // If a post needs to be rendered to HTML.
    else if ($type == "post") {
        $file_path = "content/posts/" . $name;

        // Sets the page's title.
        RenderManager::setPageTitle("Post");

        // Loads "prism.js" library to highlight code.
        AssetsManager::loadVendorsCssFiles("prism.css");
        AssetsManager::loadVendorsJsFiles("prism.min.js");
    } else {
        p("pageMarkdown() error: wrong type given. <strong>\"\$type\"</strong> must be <strong>\"page\"</strong> or <strong>\"post\"</strong>.", "error");
        die;
    }

    // Loads "showdown.js" library to render HTML from Markdown.
    AssetsManager::loadVendorsJsFiles("showdown.js");
    // Loads "renderHTML.js" which calls "showdown.js".
    AssetsManager::loadJS("renderHTML.js");

    // Loads the selected template and renders it.
    RenderManager::loadTemplate("markdown", $file_path);
}
