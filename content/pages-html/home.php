<div class="lead">
    <div class="sidetext">
        <div>
            <h2 class="lead-title color-font-title">Hi, I'm Alexis!</h2>
            <p class="lead-description">I'm full stack developper who loves to program widgets, libraries, and larger
                scale applications. I write a lot about the things I love, like
                <a class="link color-blue" href="<?= base_url("category/programming") ?>">programming</a>,
                <a class="link color-blue" href="<?= base_url("category/keyboards") ?>">keyboards</a>,
                <a class="link color-blue" href="<?= base_url("category/3d-printing") ?>">3D printing</a>,
                <a class="link color-blue" href="<?= base_url("category/cubing") ?>">Rubik's Cubes</a>,
                and more.</p>
            <a class="btn-small color-font-text lead-btn" href="https://github.com/alexisphilip">GitHub</a>
        </div>
    </div>
    <div class="sidecard card-colored">
        <div>
            <img class="profile-pic" src="<?= img_url("profile-pic.jpg") ?>" alt="Profile pic">
            <p class="bold color-white">Checkout my blog here!</p>
            <a class="btn-medium bg-white color-font-text bold" href="<?= base_url("blog") ?>">All articles</a>
        </div>
    </div>
</div>

<h1 class="title-with-aside">Latest articles <a class="btn-small bg-light color-font-text" href="<?= base_url("blog") ?>">See all</a></h1>

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


<h2 class="title-large">My open source projects</h2>

<div class="large-list">

    <?php foreach ($data["repositories"] as $repository) { ?>
        <div class="list-element">
            <div class="project-content">
                <div class="project-image">
                    <!-- TODO: see if project image is needed. -->
                </div>
                <div class="project-text">
                    <p class="project-title">
                        <?php if (isset($repository["github"])) { ?>
                        <a class="link color-blue"
                           href="https://github.com/alexisphilip/<?= $repository["name"] ?>">
                            <?= $repository["emoji"] ?>
                            <?= $repository["name"] ?>
                        </a>
                        <?php } else { ?>
                            <span class="color-font-text">
                                <?= $repository["emoji"] ?>
                                <?= $repository["name"] ?>
                            </span>
                        <?php } ?>
                    </p>
                    <p class="project-title-description"><?= $repository["description"] ?></p>
                </div>
            </div>
            <div class="project-links">
                <?php if (isset($repository["docs"]) && $repository["docs"]) { ?>
                    <a class="btn-small color-font-title bold bg-yellow"
                       href="<?= $repository["docs"] ?>">Docs</a>
                <?php } ?>
                <?php if (isset($repository["demo"])) {
                    // "demo" var can be set to "true", to the URL will be the repo.'s name,
                    // otherwise it will be the string set in this var.
                    $url = ($repository["demo"] === true ? $repository["name"] : $repository["demo"]); ?>
                    <a class="btn-small color-white bold bg-blue"
                       href="<?= base_url("demo/" . $url) ?>">Demo</a>
                <?php } ?>
                <?php if (isset($repository["github"]) && $repository["github"]) { ?>
                    <a class="btn-small color-font-text bold link-github"
                       href="https://github.com/alexisphilip/<?= $repository["name"] ?>">
                        <img class="github-icon" src="<?= img_url("icons/github/GitHub-Mark-32px.png") ?>"
                             alt="GitHub logo">
                        GitHub
                    </a>
                <?php } ?>
            </div>
        </div>
    <?php } ?>

</div>

