<!DOCTYPE html>
<html lang="<?= ConfigManager::getConfig()["default_language_code"] ?>">
<head>
    <!-- Title. -->
    <title><?= RenderManager::getPageTitle() ?></title>

    <!-- UTF-8 charset. -->
    <meta charset="UTF-8">

    <!-- Website ownership information. -->
    <meta name="description" content="Alexis Philip's website">
    <meta name="keywords" content="Portfolio, Developer, Programmer, Full stack, Keyboard, Ergonomic keyboard, 3D printing">
    <meta name="author" content="Alexis Philip">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Include all CSS vendors. -->
    <?php foreach (AssetsManager::getVendorsCssFiles() as $css_file) { ?>
        <link href="<?= vendors_url($css_file) ?>" rel="stylesheet" type="text/css">
    <?php } ?>

    <!-- Include all CSS. -->
    <?php foreach (AssetsManager::getCssFiles() as $css_file) { ?>
        <link href="<?= css_url($css_file) ?>" rel="stylesheet" type="text/css">
    <?php } ?>

    <!-- Include the head content from the selected template. -->
    <?= $head_content ?>

</head>
<body>

<!-- Include the body content from the selected template. -->
<?= $body_content ?>

<!-- TODO: include this function from config.php -->
<script>function l(p) {console.log(p);}</script>

<!-- Include all JS vendors. -->
<?php foreach (AssetsManager::getVendorsJsFiles() as $vendor_js_file) { ?>
    <script src="<?= vendors_url($vendor_js_file) ?>"></script>
<?php } ?>

<!-- Include all JS. -->
<?php foreach (AssetsManager::getJsFiles() as $js_file) { ?>
    <script src="<?= js_url($js_file) ?>"></script>
<?php } ?>

</body>
</html>