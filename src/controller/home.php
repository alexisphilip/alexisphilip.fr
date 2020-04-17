<?php

include("src/model/blogModel.php");
include("src/model/repositoryModel.php");

// Sets the page's title.
RenderManager::setPageTitle("home");

$file_path = "content/pages-html/home.php";

// Gets the 5 latest articles.
$data["articles"] = getArticles(5);

// Gets all the repositories.
$data["repositories"] = getRepositories();

// Loads the selected template and renders it.
RenderManager::loadTemplate("html", $file_path, $data);