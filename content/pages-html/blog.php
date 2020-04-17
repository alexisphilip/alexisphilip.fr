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
        <a class="list-el" href="<?= base_url($post["raw_name"]) ?>">
            <p class="list-el-title"><?= $post["name"] ?></p>
            <p class="list-el-description"><?= (new DateTime($post["date"]))->format("d M\. Y") ?></p>
        </a>
    <?php } ?>
</div>
