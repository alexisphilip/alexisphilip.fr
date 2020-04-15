<?php

// Helpers.
include("src/utils/loader.php");
include("src/utils/print.php");

// Configuration.
include("src/ConfigManager.php");

// Fetches the configuration.
ConfigManager::fetchConfig();

include("src/Router.php");
