<!-- TEMPLATE FOR MARKDOWN PAGES. -->

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
            <?php include("src/templates/html/header.php") ?>
        </div>
    </header>

    <!-- The layout's content. -->
    <main>
        <div class="inner-main">
            <?php include("content/pages-html/" . $file_path . ".php"); ?>
        </div>
    </main>

    <!-- The selected template's footer. -->
    <footer>
        <div class="inner-footer">
            <?php include("src/templates/html/footer.php") ?>
        </div>
    </footer>

    <!-- Raw markdown content in hidden div before it rendered by "showdown.js". -->
    <div class="raw-markdown" style="visibility: hidden; height: 0;">
        <?= $data["file_content"] ?>
    </div>

</div>

<script src="<?= js_url("animate-letters.js") ?>"></script>

<?php $body_content = ob_get_clean(); ?>

<!-- Includes the global page layout. -->
<?php require("src/templates/layout.php"); ?>