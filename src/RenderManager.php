<?php

class RenderManager
{
    private static $pageTitle;

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
}