<?php

class MarkdownModel
{
    /**
     * Retrieves n articles, and orders them by date DESC.
     *
     * @param int $limit The limit of articles to retrieve (0 = all).
     * @return array
     */
    public static function getArticles(int $limit = 0): array
    {
        // Gets all the posts names.
        $posts = scandir("content/articles-md");

        // Formats all file names, gets only the name ("2020-01-01-post-name.md" => "post-name")
        $key = 0;
        foreach ($posts as $post) {
            // If match is a file name (and not parent directory like "." and "..").
            if (!in_array($post, [".", ".."])) {

                // Gets the post's file content.
                $file_content = file_get_contents("content/articles-md/" . $post);

                // Extracts its header info.
                $formated_post_info[] = self::extractData($file_content)["file_info"];
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

    /**
     * Returns the file's data from it's name.
     *
     * @param string $type The file's type ("page", "article").
     * @param string $file_name The file's name.
     * @return array
     * @see self::extractData()
     */
    public static function getFile(string $type, string $file_name): array
    {
        // Gets the article's file content.
        $file_content = file_get_contents("content/" . $type . "s-md/" . $file_name);

        return self::extractData($file_content);
    }

    /**
     * Extracts from a file its header data (JSON) and raw content.
     *
     * E.g.: input
     *
     * {
     *   "title": "Article title",
     *   "slug": "article-title"
     * }
     * # This is an article
     * This is a paragraph
     *
     * E.g.: output
     *
     * [
     *   "file_info" => ["title" => "Article title", "slug" => "article-title"],
     *   "file_content => "# This is an article \n This is a paragraph"
     * ]
     *
     * @param string $file_content The file's raw text content.
     * @return array
     */
    private static function extractData(string $file_content): array
    {
        // Matches only the JSON text.
        preg_match("/{((.|\n)*?)}/", $file_content, $file_config);

        // Transforms it to JSON.
        $data["file_info"] = json_decode($file_config[0], true);

        // Matches only the JSON text and replaces it by an empty string.
        $data["file_content"] = preg_replace("/{((.|\n)*?)}/", "", $file_content);

        return $data;
    }
}
