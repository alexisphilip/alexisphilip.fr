<?php

class MarkdownModel
{
    /**
     * Retrieves n articles, and orders them by date DESC.
     *
     * @param int $limit The limit of articles to retrieve (0 = all).
     * @param string $category Filter by the article's category.
     * @return mixed
     */
    public static function getArticles(int $limit = 0, string $category = "")
    {
        // Gets all the posts names.
        $posts = scandir("content/articles-md");

        if (count($posts) <= 2) return false;

        // Formats all file names, gets only the name ("2020-01-01-post-name.md" => "post-name")
        foreach ($posts as $post) {

            // If match is a file name (and not parent directory like "." and "..").
            if (!in_array($post, [".", ".."])) {

                // Gets the post's file content.
                $file_content = file_get_contents("content/articles-md/" . $post);

                // Extracts its header info.
                $article_info_tmp = self::extractData($file_content)["file_info"];

                // If filter by category.
                if ($category) {
                    // If the current file has this category.
                    if (in_array($category, $article_info_tmp["categories"])) {
                        // Will add only the articles with matching category.
                        $article_info[] = $article_info_tmp;
                    }
                } else {
                    // Will add all the articles.
                    $article_info[] = $article_info_tmp;
                }
            }
        }

        // Sorts the articles by date.
        function date_compare($a, $b)
        {
            $t1 = strtotime($a["date"]);
            $t2 = strtotime($b["date"]);
            return $t1 + $t2;
        }

        // Sorts by calling the sorting function.
        usort($article_info, "date_compare");

        if ($limit) {
            $article_info = array_splice($article_info, 0, $limit);
        }

        return $article_info;
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
