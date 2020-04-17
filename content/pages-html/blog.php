<h2 class="large-title">Categories</h2>

<div class="card-colored categories">
    <a class="btn-medium bg-white color-font-text hover-grey bold" href="#">Programming</a>
    <a class="btn-medium bg-white color-font-text hover-grey bold" href="#">Keyboard</a>
    <a class="btn-medium bg-white color-font-text hover-grey bold" href="#">3D printing</a>
    <a class="btn-medium bg-white color-font-text hover-grey bold" href="#">Rubik's Cube</a>
    <a class="btn-medium bg-white color-font-text hover-grey bold" href="#">Piano</a>
</div>

<h1>All articles</h1>

<div class="list">
    <?php foreach ($data["articles"] as $post) { ?>
        <a class="list-el" href="<?= base_url($post["slug"]) ?>">
            <!-- Left side -->
            <div class="list-el-left">
                <div class="list-el-thumbnail-col">
                    <div class="list-el-thumbnail-wrapper">
                        <?php if (isset($post["thumbnail"])) { ?>
                            <img class="list-el-thumbnail"
                                 src="<?= base_url("content/thumbnails/") . $post["thumbnail"] ?>"
                                 alt="Post's thumbnail">
                        <?php } else { ?>
                            <div class="list-el-thumbnail-letter">
                                <?= substr($post["title"], 0, 1) ?>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <div>
                    <p class="list-el-title"><?= $post["title"] ?></p>
                    <p class="list-el-description"><?= (new DateTime($post["date"]))->format("d M\. Y") ?></p>
                </div>
            </div>
            <!-- Right side -->
            <div class="list-el-right">
                <?php foreach ($post["categories"] as $category) { ?>
                    <p class="btn-small bg-blue color-white" data-link="<?= base_url("category/") . $category ?>"><?= $category ?></p>
                <?php } ?>
            </div>
        </a>
    <?php } ?>
</div>
