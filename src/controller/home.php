<?php

// Sets the page's title.
RenderManager::setPageTitle("home");

$file_path = "content/pages-html/home.php";

// Loadss the selected template and renders it.
RenderManager::loadTemplate("html", $file_path);