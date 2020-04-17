<?php

include("src/model/blogModel.php");

// Sets the page's title.
RenderManager::setPageTitle("blog");

$file_path = "content/pages-html/blog.php";

// Gets all the articles.
$data["articles"] = getArticles();

// Loads the selected template and renders it.
RenderManager::loadTemplate("html", $file_path, $data);