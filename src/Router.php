<?php

/*
 * SET CACHE.
 */
header('Cache-Control: public');
header("Cache-Control: max-age=86400");


// Gets the first part of the URL;
$url = explode("/", $_SERVER['REQUEST_URI']);

// Home page.
if (in_array($url[1], ["", "/", "home", "index"])) {
    include("controller/home.php");
    die;
}

// Blog page.
if (in_array($url[1], ["blog"])) {
    include("controller/blog.php");
    die;
}

// Demo section /content/demo/.
if (in_array($url[1], ["demo"])) {
    $demo_name = $url[2];
    include("controller/demo.php");
    die;
}


// TODO: make categories & projects pages.
// If matches HTML pages (non Markdown) route to its controller.
//if (in_array($url[1], ["categories", "projects"])) {
//    die;
//}

// Gets all the pages names and extracts the slug from them ("about-me.md" => "about-me")
foreach (scandir("content/pages-md") as $page) {
    $pages_slugs[] = substr($page, 0, -3);
}

// If the URL corresponds to a page.
if (array_search($url[1], $pages_slugs)) {
    $file_slug = $url[1];
    include("controller/pageMarkdown.php");
    die;
}

// Gets all the posts names and extracts the slug from them ("2020-01-01-post-name.md" => "post-name")
foreach (scandir("content/articles-md") as $file_name) {
    $articles_names[] = $file_name;
    $articles_slugs[] = substr($file_name, 11, -3);
}

// If the URL corresponds to a post.
if ($file_key = array_search($url[1], $articles_slugs)) {
    $file_slug = $url[1];
    $file_name = $articles_names[$file_key];
    include("controller/articleMarkdown.php");
    die;
}

// If not a page or a post, then error 404.
p("Error 404", "error");