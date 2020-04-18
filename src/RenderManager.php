<?php

class RenderManager
{
    private static $pageTitlePrefix;
    private static $pageTitleSuffix;
    private static $metaDescription;

    public static function setPageTitlePrefix($pageTitlePrefix)
    {
        self::$pageTitlePrefix = $pageTitlePrefix;
    }

    public static function setPageTitleSuffix($pageTitleSuffix)
    {
        self::$pageTitleSuffix = $pageTitleSuffix;
    }

    public static function setMetaDescription($pageDescription)
    {
        self::$metaDescription = $pageDescription;
    }

    public static function getPageTitle()
    {
        $page_title = ConfigManager::getConfig()["default_title"];

        if (isset(self::$pageTitlePrefix)) {
            $page_title = self::$pageTitlePrefix . " · " . $page_title;
        }

        if (isset(self::$pageTitleSuffix)) {
            $page_title = $page_title . " · " . self::$pageTitleSuffix;
        }

        return $page_title;
    }

    public static function getMetaDescription()
    {
        return self::$metaDescription;
    }

    public static function loadTemplate($template_name, $file_path, $data = [])
    {
        $template_dir = "src/templates/";
        if (in_array($template_name, scandir($template_dir))) {
            include($template_dir . $template_name . "/template.php");
        } else {
            p("<strong>RenderManager:loadTemplate()</strong> error: given template directory name <strong>\"" . $template_name . "\"</strong> does not exist in \"<strong>" . $template_dir . "</strong>\".", "error");
        }
    }

//    public static function loadDemo($demo_name, $demo_index_path)
//    {
//        $demo_dir = "content/demo/";
//        if (in_array($demo_name, scandir($demo_dir))) {
//            include($demo_dir . $demo_index_path);
//        } else {
//            p("<strong>RenderManager:loadDemo()</strong> error: given demo directory name <strong>\"" . $demo_name . "\"</strong> does not exist in \"<strong>" . $demo_dir . "</strong>\".", "error");
//        }
//    }
}