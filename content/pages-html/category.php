<h1><?= $data["category"]["emoji"] . " " . $data["category"]["name"] ?></h1>

<p><?= $data["category"]["description"] ?></p>

<div class="list">
    <?php if ($data["articles"]) {
        foreach ($data["articles"] as $article) { ?>
            <a class="list-el" href="<?= base_url($article["slug"]) ?>">
                <!-- Left side -->
                <div class="list-el-left">
                    <div class="list-el-thumbnail-col">
                        <div class="list-el-thumbnail-wrapper">
                            <?php if (isset($article["thumbnail"])) { ?>
                                <img class="list-el-thumbnail"
                                     src="<?= base_url("content/thumbnails/") . $article["thumbnail"] ?>"
                                     alt="Post's thumbnail">
                            <?php } else { ?>
                                <div class="list-el-thumbnail-letter">
                                    <?= substr($article["title"], 0, 1) ?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                    <div>
                        <p class="list-el-title"><?= $article["title"] ?></p>
                        <p class="list-el-description"><?= (new DateTime($article["date"]))->format("d M\. Y") ?></p>
                    </div>
                </div>
                <!-- Right side -->
                <div class="list-el-right">
                    <?php foreach ($article["tags"] as $tag) { ?>
                        <p class="btn-small bg-light color-font-text"><?= $tag ?></p>
                    <?php } ?>
                </div>
            </a>
        <?php }
    } else { ?>
        <p class="bold italic">No articles yet in this category!</p>
    <?php } ?>
</div>