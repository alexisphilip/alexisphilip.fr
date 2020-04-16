<?php

// Sets the page's title.
RenderManager::setPageTitle("home");

$file_path = "content/pages-html/home.php";

//$repositories = shell_exec("curl -i https://api.github.com/users/alexisphilip/repos");
$data["repositories"] = json_decode(shell_exec("cat data/projects.json"), true)["data"];

// Loads the selected template and renders it.
RenderManager::loadTemplate("html", $file_path, $data);