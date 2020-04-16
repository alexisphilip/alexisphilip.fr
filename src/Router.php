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

// Gets all the pages names.
$pages = scandir("content/pages-md");

// Formats all file names, gets only the name ("about-me.md" => "about-me")
foreach ($pages as $page) {
    $pages_formated[] = substr($page, 0, -3);
}

// If the URL corresponds to a page.
if (array_search($url, $pages_formated)) {
    include("controller/pageMarkdown.php");
    $file_name = $url . ".md";
    pageMarkdown("page", $file_name);
    die;
}

// Gets all the posts names.
$posts = scandir("content/posts-md");

// Formats all file names, gets only the name ("2020-01-01-post-name.md" => "post-name")
foreach ($posts as $post) {
    $posts_formated[] = substr($post, 11, -3);
}

// If the URL corresponds to a post.
if ($file_key = array_search($url, $posts_formated)) {
    include("controller/pageMarkdown.php");
    $file_name = $posts[$file_key];
    pageMarkdown("post", $file_name);
    die;
}

// If not a page or a post, then error 404.
p("Error 404", "error");