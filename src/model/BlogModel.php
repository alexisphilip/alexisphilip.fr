<?php

class BlogModel
{
    public static function getTotalArticles()
    {
        // Counts the total of articles, and subtracts the two parent dirs ("." & "..").
        return count(scandir("content/articles-md")) - 2;
    }
}