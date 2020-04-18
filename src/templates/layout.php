<!DOCTYPE html>
<html lang="<?= ConfigManager::getConfig()["default_language_code"] ?>">
<head>
    <!-- Title. -->
    <title><?= RenderManager::getPageTitle() ?></title>

    <!-- UTF-8 charset. -->
    <meta charset="UTF-8">

    <!-- Website ownership information. -->
    <meta name="description" content="<?= RenderManager::getMetaDescription() ?>">
    <meta name="keywords" content="Portfolio, Developer, Programmer, Full stack, Keyboard, Ergonomic keyboard, 3D printing">
    <meta name="author" content="Alexis Philip">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO -->
    <!-- Open Graph -->
    <meta property="og:title" content="<?= RenderManager::getPageTitle() ?>">
    <meta property="og:description" content="<?= RenderManager::getMetaDescription() ?>">
    <meta property="og:type" content="personnal.blog.website">
    <meta property="og:url" content="<?= "https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ?>">
    <meta property="og:image" content="<?= img_url("logos/logo-1000x1000.png") ?>">
    <!-- Schema.org -->
    <script id="schema_org" type="application/ld+json">
        {
            "@context": "https://schema.org/",
            "@type": "Info",
            "name": "Alexis Philip's personal website",
            "author": "Alexis Philip",
            "description": "Website where I post articles about the things I love. Checkout my open source repositories or contact me."
        }
    </script>

    <!-- Favicon. -->
    <link rel="apple-touch-icon" sizes="180x180" href="<?= img_url("favicons/apple-touch-icon.png") ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= img_url("favicons/favicon-32x32.png") ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= img_url("favicons/favicon-16x16.png") ?>">
    <link rel="manifest" href="<?= img_url("favicons/site.webmanifest") ?>">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

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