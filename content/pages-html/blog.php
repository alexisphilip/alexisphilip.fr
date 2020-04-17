
<h2 class="large-title">Categories</h2>

<div class="card-colored categories">
    <a class="btn-medium bg-white color-font-text hover-white bold" href="#">Programming</a>
    <a class="btn-medium bg-white color-font-text hover-white bold" href="#">Keyboard</a>
    <a class="btn-medium bg-white color-font-text hover-white bold" href="#">3D printing</a>
    <a class="btn-medium bg-white color-font-text hover-white bold" href="#">Rubik's Cube</a>
    <a class="btn-medium bg-white color-font-text hover-white bold" href="#">Piano</a>
</div>

<h1>All articles</h1>

<ul>
    <?php foreach ($data["post_info"] as $post) { ?>
        <li><a href="<?= base_url($post["raw_name"]) ?>"><?= $post["name"] ?></a></li>
    <?php } ?>
</ul>
