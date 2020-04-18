<?php

if ($demo_name == "lighty-colorpicker") {
    RenderManager::setPageTitlePrefix("Lighty colorpicker");
    RenderManager::loadTemplate("demo", $demo_name);
} else if ($demo_name == "lighty-datepicker") {
    RenderManager::setPageTitlePrefix("Lighty datepicker");
    RenderManager::loadTemplate("demo", $demo_name);
} else if ($demo_name == "Casio-F-91W") {
    RenderManager::setPageTitlePrefix("Casio F-91W");
    RenderManager::loadTemplate("demo", $demo_name);
} else if ($demo_name == "subnet-calculator") {
    RenderManager::setPageTitlePrefix("Subnet calculator");
    RenderManager::loadTemplate("demo", $demo_name);
} else {
    header("Location: " . base_url("404"));
    die;
}