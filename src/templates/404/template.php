<?php
// TEMPLATE FOR 404 PAGE.

// Contains the head content.
ob_start(); ?>

<!-- Include styling here. -->

<?php $head_content = ob_get_clean();

// Contains the body content.
ob_start();

include("content/pages-html/404.php");

$body_content = ob_get_clean();

// Includes the global page layout.
require("src/templates/layout.php");