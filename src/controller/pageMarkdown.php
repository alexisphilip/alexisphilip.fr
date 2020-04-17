<?php

function pageMarkdown($type, $name)
{
    // If a page needs to be rendered to HTML.
    if ($type == "page") {
        $file_path = "content/pages-md/" . $name;

        // TODO: fix title formatting with helper function.
        if ($name == "contact") {
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
    } // If a post needs to be rendered to HTML.
    else if ($type == "post") {
        $file_path = "content/posts-md/" . $name;

        // Sets the page's title.
        // TODO: fix title formatting with helper function.
        RenderManager::setPageTitlePrefix("Post");

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
