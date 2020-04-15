<?php

// Gets the first part of the URL;
$url = explode("/", $_SERVER['REQUEST_URI'])[1];

$url = "about-me";
//$url = "masplit-keyboard";

// If empty URL, home page.
if (in_array($url, ["", "/", "home", "index"])) {
    p("home!");
    die;
}

// Scans all the pages.
$pages = scandir("content/pages");
foreach ($pages as $page) {
    $pages_formated[] = substr($page, 0, -3);
}

// If the URL corresponds to a page.
if (in_array($url, $pages_formated)) {
    include("controller/pageMarkdown.php");
    pageMarkdown("page", $url);
    die;
}

// Scans all the posts.
$posts = scandir("content/posts");
foreach ($posts as $post) {
    $posts_formated[] = substr($post,11,-3);
}

// If the URL corresponds to a project.
if (in_array($url, $posts_formated)) {
    include("controller/pageMarkdown.php");
    pageMarkdown("post", $url);
    die;
}

// If not a page or a post, then error 404.
p("Error 404", "error");