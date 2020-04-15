<?php

function pageMarkdown($type, $name)
{
    // If a page needs to be rendered to HTML.
    if ($type == "page") {
        p("page!");
        $file_path = "content/pages/" . $name;

        // Sets the page's title.
        RenderManager::setPageTitle("Page");
    }
    // If a post needs to be rendered to HTML.
    else if ($type == "post") {
        p("post!");
        $file_path = "content/posts/" . $name;

        // Sets the page's title.
        RenderManager::setPageTitle("Post");

        // Loads "prism.js" library to highlight code.
        AssetsManager::loadVendorsCssFiles("prism");
        AssetsManager::loadVendorsJsFiles("prism.min");
    } else {
        p("pageMarkdown() error: wrong type given. <strong>\"\$type\"</strong> must be <strong>\"page\"</strong> or <strong>\"post\"</strong>.", "error");
        die;
    }

    AssetsManager::loadVendorsJsFiles("showdown");
    AssetsManager::loadJS("renderHTML");

    include("src/templates/layout/template.php");
}
