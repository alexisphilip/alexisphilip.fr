<?php

include("src/model/MarkdownModel.php");
include("src/model/CategoryModel.php");

// Gets all the categories.
$data["categories"] = CategoryModel::getCategories();

// Gets all the articles.
$data["articles"] = MarkdownModel::getArticles();

// Sets the page's title.
RenderManager::setPageTitlePrefix("Articles and posts about things I love.");

// Sets the meta description.
RenderManager::setMetaDescription("Welcome to my blog. I write articles about programming, technology, 
keyboards, 3D printing, Rubik's Cubes, piano, and many more.");

// Loads the selected template and renders it.
$file_path = "content/pages-html/blog.php";
RenderManager::loadTemplate("html", $file_path, $data);