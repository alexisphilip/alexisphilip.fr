<?php

function getArticles($limit = 0)
{
    // Gets all the posts names.
    $posts = scandir("content/posts-md");

    // Formats all file names, gets only the name ("2020-01-01-post-name.md" => "post-name")
    $key = 0;
    foreach ($posts as $post) {
        // If match is a file name (and not parent directory like "." and "..").
        if (!in_array($post, [".", ".."])) {

            // Gets the post's file content.
            $file_content = file_get_contents("content/posts-md/" . $post);

            // Matches only the JSON text.
            preg_match("/{((.|\n)*?)}/", $file_content, $post_config);

            // Transforms it to JSON.
            $formated_post_info[] = json_decode($post_config[0], true);

            // Matches only the JSON text and replaces it by an empty string.
//            $post_content = preg_replace("/{((.|\n)*?)}/", "", $file_content);
        }
    }

    // Sorts the posts by date.
    function date_compare($a, $b)
    {
        $t1 = strtotime($a["date"]);
        $t2 = strtotime($b["date"]);
        return $t1 + $t2;
    }

    // Sorts by calling the sorting function.
    usort($formated_post_info, "date_compare");

    if ($limit) {
        $formated_post_info = array_splice($formated_post_info, 0, $limit);
    }

    return $formated_post_info;
}