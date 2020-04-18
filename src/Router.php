<?php

// Gets the first part of the URL;
$url = explode("/", $_SERVER['REQUEST_URI'])[1];

// Home page.
if (in_array($url, ["", "/", "home", "index"])) {
    include("controller/home.php");
    die;
}

// Blog page.
if (in_array($url, ["blog"])) {
    include("controller/blog.php");
    die;
}

// TODO: make categories & projects pages.
// If matches HTML pages (non Markdown) route to its controller.
//if (in_array($url, ["categories", "projects"])) {
//    die;
//}

// Gets all the pages names and extracts the slug from them ("about-me.md" => "about-me")
foreach (scandir("content/pages-md") as $page) {
    $pages_slugs[] = substr($page, 0, -3);
}

// If the URL corresponds to a page.
if (array_search($url, $pages_slugs)) {
    $file_slug = $url;
    include("controller/pageMarkdown.php");
    die;
}

// Gets all the posts names and extracts the slug from them ("2020-01-01-post-name.md" => "post-name")
foreach (scandir("content/articles-md") as $file_name) {
    $articles_names[] = $file_name;
    $articles_slugs[] = substr($file_name, 11, -3);
}

// If the URL corresponds to a post.
if ($file_key = array_search($url, $articles_slugs)) {
    $file_slug = $url;
    $file_name = $articles_names[$file_key];
    include("controller/articleMarkdown.php");
    die;
}

// If not a page or a post, then error 404.
p("Error 404", "error");