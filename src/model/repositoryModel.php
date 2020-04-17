<?php

function getRepositories()
{
    return json_decode(shell_exec("cat data/projects.json"), true)["data"];
}