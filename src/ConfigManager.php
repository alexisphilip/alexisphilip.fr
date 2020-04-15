<?php

class ConfigManager
{
    private static $config = [];

    public static function fetchConfig()
    {
        include("src/config/config.php");
        self::$config = $config;
    }

    public static function getConfig()
    {
        return self::$config;
    }
}