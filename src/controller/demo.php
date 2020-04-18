<?php

if ($demo_name == "lighty-colorpicker") {
    RenderManager::setPageTitlePrefix("Lighty colorpicker");
    RenderManager::loadTemplate("demo", $demo_name);
} else {
    header("Location: " . base_url("404"));
    die;
}