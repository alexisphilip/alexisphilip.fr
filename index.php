<?php

// Helpers.
include("src/utils/loader.php");
include("src/utils/print.php");

// Render manager.
include("src/RenderManager.php");

// Assets manager.
include("src/AssetsManager.php");

// Configuration manager.
include("src/ConfigManager.php");

// Fetches the configuration.
ConfigManager::fetchConfig();

include("src/Router.php");
