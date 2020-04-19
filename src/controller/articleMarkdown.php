<?php

include("src/model/MarkdownModel.php");

$data = MarkdownModel::getFile("article", $file_name);

// Sets the page's title.
// TODO: fix title formatting with helper function (always more than 20 chars?).
RenderManager::setPageTitlePrefix($data["file_info"]["title"]);

// The meta description / Open Graph & other will be set by
// this JS script by putting the article's content in it.
AssetsManager::loadJS("addMetaDescription.js");

// Loads "prism.js" library to highlight code.
AssetsManager::loadVendorsCssFiles("prism.css");
AssetsManager::loadVendorsJsFiles("prism.min.js");

// Loads "showdown.js" library to render HTML from Markdown.
AssetsManager::loadVendorsJsFiles("showdown.js");

// Loads "renderHTML.js" which calls "showdown.js".
AssetsManager::loadJS("renderHTML.js");

// Loads the selected template and renders it.
RenderManager::loadTemplate("markdown", "article", $data);