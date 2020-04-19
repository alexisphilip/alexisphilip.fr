<?php

class RepositoryModel
{
    public static function getRepositories()
    {
        return json_decode(shell_exec("cat data/projects.json"), true);
    }
}