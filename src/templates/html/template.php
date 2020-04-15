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

<main>

    <div class="wrapper">

        <!-- The selected template's header. -->
        <header>
            <?php include("header.php") ?>
        </header>

        <!-- The layout's content. -->
        <div class="content">
            <?php include($file_path); ?>
        </div>

        <!-- The selected template's footer. -->
        <footer>
            <?php include("footer.php") ?>
        </footer>

    </div>

</main>

<?php $body_content = ob_get_clean(); ?>

<!-- Includes the global page layout. -->
<?php require("src/templates/layout.php"); ?>