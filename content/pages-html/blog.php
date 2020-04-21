<h2 class="title-large">Categories</h2>

<div class="card-colored categories">
    <?php foreach ($data["categories"] as $category) { ?>
        <a class="btn-medium bg-white color-font-text hover-grey bold" href="<?= base_url("category/" . $category["slug"]) ?>"><?= $category["emoji"] . " " . $category["name"] ?></a>
    <?php } ?>
</div>

<h1 class="title-with-aside">All articles <span class="title-aside btn-small bg-light color-font-text"><?= $data["total_articles"] ?></span></h1>

<div class="list">
    <?php foreach ($data["articles"] as $article) { ?>
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
                <?php foreach ($article["categories"] as $category) { ?>
                    <p class="btn-small bg-blue color-white"
                       data-link="<?= base_url("category/") . $category ?>"><?= $category ?></p>
                <?php } ?>
            </div>
        </a>
    <?php } ?>
</div>
