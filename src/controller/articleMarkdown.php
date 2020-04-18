<?php

include("src/model/markdownModel.php");

$data = BlogModel::getFile("article", $file_name);

// Sets the page's title.
// TODO: fix title formatting with helper function (always more than 20 chars?).
RenderManager::setPageTitlePrefix($data["file_info"]["title"]);

// The meta description will be set by the JS, putting the article's content in it.

// Loads "prism.js" library to highlight code.
AssetsManager::loadVendorsCssFiles("prism.css");
AssetsManager::loadVendorsJsFiles("prism.min.js");

// Loads "showdown.js" library to render HTML from Markdown.
AssetsManager::loadVendorsJsFiles("showdown.js");

// Loads "renderHTML.js" which calls "showdown.js".
AssetsManager::loadJS("renderHTML.js");

// Loads the selected template and renders it.
RenderManager::loadTemplate("markdown", "", $data);