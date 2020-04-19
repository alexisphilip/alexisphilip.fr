<?php

include("src/model/MarkdownModel.php");
include("src/model/CategoryModel.php");

// Search in all the categories if this one exists.
$data["category"] = CategoryModel::categorySlugExists($category_slug);

// If category is not found.
if (!$data["category"]) {
    header("Location: " . base_url("404"));
}

// Retrieves all the articles in the given category.
$data["articles"] = MarkdownModel::getArticles(0, $category_slug);

// Sets the page's title.
RenderManager::setPageTitlePrefix($data["category"]["name"] . " · Category");

// Sets the meta description.
RenderManager::setMetaDescription("Welcome to my blog. I write articles about programming, technology, 
keyboards, 3D printing, Rubik's Cubes, piano, and many more.");

// Loads the selected template and renders it.
$file_path = "content/pages-html/category.php";
RenderManager::loadTemplate("html", $file_path, $data);