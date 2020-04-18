<?php

include("src/model/markdownModel.php");

// Sets the page's title.
RenderManager::setPageTitlePrefix("Articles and posts about things I love");

// Sets the meta description.
RenderManager::setMetaDescription("Welcome to my blog. I write articles about programming, technology, 
keyboards, 3D printing, Rubik's Cubes, piano, and many more.");

$file_path = "content/pages-html/blog.php";

// Gets all the articles.
$data["articles"] = BlogModel::getArticles();

// Loads the selected template and renders it.
RenderManager::loadTemplate("html", $file_path, $data);