<?php

function base_url($url = "")
{
    if ($url) $url = "/" . $url;
    return ConfigManager::getConfig()["base_url"] . $url;
}

function js_url($url)
{
    return ConfigManager::getConfig()["base_url"] . "/static/js/" . $url;
}

function css_url($url)
{
    return ConfigManager::getConfig()["base_url"] . "/static/css/" . $url;
}

function vendors_url($url)
{
    return ConfigManager::getConfig()["base_url"] . "/static/vendors/" . $url;
}