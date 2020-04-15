<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Alexis Philip</title>
    <link href="<?= vendors_url("prism.css") ?>" rel="stylesheet"/>
    <link href="<?= css_url("main.css") ?>" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet">
</head>
<body>

<main>

    <header>
        <?php include("header.php") ?>
    </header>

    <div class="content">
        <div class="post">
            <?php include("content/posts/2020-04-15-masplit-keyboard.md"); ?>
        </div>
    </div>

    <footer>
        <?php include("footer.php") ?>
    </footer>

</main>

<script src="<?= vendors_url("prism.min.js") ?>"></script>
<script src="<?= vendors_url("showdown.js") ?>"></script>
<script>
    function l(p) {
        console.log(p);
    }

    let post = document.querySelector(".post"),
        converter = new showdown.Converter();

    post.innerHTML = converter.makeHtml(post.innerHTML);
</script>
</body>
</html>