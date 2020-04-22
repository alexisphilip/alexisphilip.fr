<?php

// Sets the HTTP response code to 404.
http_response_code(404);

AssetsManager::loadJS("404/output.js");
AssetsManager::loadJS("404/commands.js");
AssetsManager::loadJS("404/cmd.js");

RenderManager::setPageTitlePrefix("404");
RenderManager::loadTemplate("404", "");

die;