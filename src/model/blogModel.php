<?php

function getArticles($limit = 0)
{
    // Gets all the posts names.
    $posts = scandir("content/posts-md");

    // Formats all file names, gets only the name ("2020-01-01-post-name.md" => "post-name")
    $key = 0;
    foreach ($posts as $post) {
        if (!in_array($post, [".", ".."])) {
            $date = substr($post, 0, 10);
            $formated_post_info[$key]["date"] = $date;
            $formated_post_info[$key]["name"] = substr(file("content/posts-md/" . $post)[1], 2);
            $formated_post_info[$key]["raw_name"] = substr($post, 11, -3);
            $key++;
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