<?php

class CategoryModel
{
    public static function getCategories()
    {
        return json_decode(shell_exec("cat data/categories.json"), true);
    }

    public static function categorySlugExists($slug)
    {
        // Gets all the categories.
        $categories = CategoryModel::getCategories();

        $category_found = false;

        foreach ($categories as $category) {
            if ($category["slug"] == $slug) {
                $category_found = $category;
                break;
            }
        }

        return $category_found;
    }
}