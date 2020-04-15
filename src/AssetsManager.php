<?php

class AssetsManager
{
    private static $css_files = [];
    private static $js_files = [];
    private static $vendors_js_files = [];
    private static $vendors_css_files = [];

    public static function loadCSS($css_file)
    {
        self::$css_files[] = $css_file;
    }

    public static function loadJS($js_file)
    {
        self::$js_files[] = $js_file;
    }

    public static function loadVendorsCssFiles($vendors_css_file)
    {
        self::$vendors_css_files[] = $vendors_css_file;
    }

    public static function loadVendorsJsFiles($vendors_js_file)
    {
        self::$vendors_js_files[] = $vendors_js_file;
    }

    public static function getCssFiles()
    {
        return self::$css_files;
    }

    public static function getJsFiles()
    {
        return self::$js_files;
    }

    public static function getVendorsCssFiles()
    {
        return self::$vendors_css_files;
    }

    public static function getVendorsJsFiles()
    {
        return self::$vendors_js_files;
    }
}