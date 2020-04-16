<h1>All articles</h1>

<ul>
    <?php foreach ($data["post_info"] as $post) { ?>
        <li><a href="<?= base_url($post["raw_name"]) ?>"><?= $post["name"] ?></a></li>
    <?php } ?>
</ul>
