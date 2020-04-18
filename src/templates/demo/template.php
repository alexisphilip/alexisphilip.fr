<?php
// TEMPLATE FOR DEMO PAGES

// Contains the head content.
ob_start(); ?>

<link href="<?= base_url("content/demo/" . $file_path . "/style.css") ?>" rel="stylesheet" type="text/css">

<?php $head_content = ob_get_clean();

// Contains the body content.
ob_start();

include("content/demo/" . $file_path . "/index.html");

$body_content = ob_get_clean();

// Includes the global page layout.
require("src/templates/layout.php");