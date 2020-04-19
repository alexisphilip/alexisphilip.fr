<div class="article-header">
    <div class="article-section-info">
        <h1 class="article-title"><?= $data["file_info"]["title"] ?></h1>
        <div class="article-author-row">
            <a class="article-author-wrapper" href="<?= base_url("about-me") ?>">
                <img class="article-author-pic" src="<?= img_url("profile-pic.jpg") ?>" alt="Profile picture">
            </a>
            <p>
                <?= (new DateTime($data["file_info"]["date"]))->format("d M\. Y") ?> /
                <a class="link color-font-text bold" href="https://github.com/alexisphilip/alexisphilip.fr/blob/master/content/articles-md/<?= $data["file_info"]["date"] . "-" . $data["file_info"]["slug"] ?>.md">Edit ✏️</a>
            </p>
        </div>
        <div class="article-tags">
            <?php foreach ($data["file_info"]["tags"] as $tag) { ?>
                <a class="btn-small bg-light color-font-text" href="#"><?= $tag ?></a>
            <?php } ?>
        </div>
    </div>
    <div class="article-section-thumbnail">
        <div class="article-thumbnail-wrapper">
            <?php if (isset($data["file_info"]["thumbnail"])) { ?>
                <img class="article-thumbnail" src="content/thumbnails/<?= $data["file_info"]["thumbnail"] ?>"
                     alt="<?= $data["file_info"]["title"] ?>">
            <?php } else { ?>
                <div class="article-thumbnail-letter color-blue bold"><?= substr($data["file_info"]["title"], 0, 1) ?></div>
            <?php } ?>
        </div>
    </div>
</div>

<div class="rendered-markdown"></div>

<div class="article-footer">
    <div class="article-footer-left">
        <img class="article-footer-image" src="<?= img_url("profile-pic.jpg") ?>" alt="Profile picture">
    </div>
    <div class="article-footer-right">
        <h2 class="article-footer-title color-white">Hi there! I hope you enjoyed this article.</h2>
        <p class="color-white">I'm Alexis Philip, a full stack Web developer based in Aix-en-Provence, France.</p>
        <p class="color-white">
            <a class="btn-medium bg-white color-blue bold" href="<?= base_url("contact") ?>">Contact me</a> or
            check out <a class="btn-medium bg-white color-blue bold" href="<?= base_url("blog") ?>">my latest articles!</a>
        </p>
    </div>
</div>