<?php

class CategoryModel
{
    public static function getCategories()
    {
        return json_decode(shell_exec("cat data/categories.json"), true);
    }
}