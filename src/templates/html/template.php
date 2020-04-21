<!-- TEMPLATE FOR HTML PAGES. -->

<!-- Contains the body content. -->
<?php ob_start(); ?>

<!-- Include main CSS. -->
<link href="<?= css_url("main.css") ?>" rel="stylesheet">

<!-- Include Google Font: Roboto. -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap"
      rel="stylesheet" type="text/css">

<?php $head_content = ob_get_clean(); ?>

<!-- Contains the body content. -->
<?php ob_start(); ?>

<div class="wrapper">

    <!-- The selected template's header. -->
    <header>
        <div class="inner-header">
            <?php include("header.php") ?>
        </div>
    </header>

    <!-- The layout's content. -->
    <main>
        <div class="inner-main">
            <?php include($file_path); ?>
        </div>
    </main>

    <!-- The selected template's footer. -->
    <footer>
        <div class="inner-footer">
            <?php include("footer.php") ?>
        </div>
    </footer>

</div>

<script src="<?= js_url("animate-letters.js") ?>"></script>

<?php $body_content = ob_get_clean(); ?>

<!-- Includes the global page layout. -->
<?php require("src/templates/layout.php"); ?>