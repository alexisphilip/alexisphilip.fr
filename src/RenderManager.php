<?php

class RenderManager
{
    private static $pageTitle;
    private static $pageDescription;

    public static function setPageDescription($pageDescription)
    {
        self::$pageDescription = $pageDescription;
    }

    public static function setPageTitle($pageTitle)
    {
        self::$pageTitle = $pageTitle;
    }

    public static function getPageTitle()
    {
        if (isset(self::$pageTitle)) {
            return self::$pageTitle . " · " . ConfigManager::getConfig()["default_title"];
        } else {
            return self::$pageTitle;
        }
    }

    public static function getPageDescription()
    {
        return self::$pageDescription;
    }


    public static function loadTemplate($template_name, $file_path, $data = [])
    {
        $template_dir = "src/templates/";
        if (in_array($template_name, scandir($template_dir))) {
            include($template_dir . $template_name . "/template.php");
        } else {
            p("<strong>RenderManager:loadTemplate()</strong> error: given template directory name does not exist in \"<strong>src/templates</strong>\".", "error");
        }
    }
}