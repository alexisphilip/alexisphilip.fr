<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Title. -->
    <title><?= RenderManager::getPageTitle() ?></title>

    <!-- Main CSS. -->
    <link href="<?= css_url("main") ?>" rel="stylesheet"/>

    <!-- Include all CSS vendors. -->
    <?php foreach (AssetsManager::getVendorsCssFiles() as $css_file) { ?>
        <link href="<?= vendors_url($css_file) ?>.css" rel="stylesheet"/>
    <?php } ?>

    <!-- Include all CSS. -->
    <?php foreach (AssetsManager::getCssFiles() as $css_file) { ?>
        <link href="<?= css_url($css_file) ?>" rel="stylesheet"/>
    <?php } ?>

    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet">
</head>
<body>

<main>

    <div class="wrapper">

        <header>
            <?php include("header.php") ?>
        </header>

        <div class="content">

        </div>

        <footer>
            <?php include("footer.php") ?>
        </footer>

        <div class="raw-markdown" style="visibility: hidden; height: 0;">
            <?php include($file_path); ?>
        </div>

    </div>

</main>

<!-- TODO: include this function from config.php -->
<script>function l(p) {console.log(p);}</script>

<!-- Include all JS vendors. -->
<?php foreach (AssetsManager::getVendorsJsFiles() as $vendor_js_file) { ?>
    <script src="<?= vendors_url($vendor_js_file) ?>.js"></script>
<?php } ?>

<!-- Include all JS. -->
<?php foreach (AssetsManager::getJsFiles() as $js_file) { ?>
    <script src="<?= js_url($js_file) ?>"></script>
<?php } ?>

</body>
</html>