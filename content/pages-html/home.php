
<div class="lead">
    <div class="sidetext">
        <div>
            <h1 class="lead-title color-font-title">Hi, I'm Alexis</h1>
            <p class="lead-description">As a full stack developper I love to program widgets, libraries, and larger
                scale applications. I write a lot about the things I love, like
                <a class="link color-blue" href="#<?php //base_url("category/programming") ?>">programming</a>,
                <a class="link color-blue" href="#<?php //base_url("category/keyboards") ?>">keyboards</a>,
                <a class="link color-blue" href="#<?php //base_url("category/3d-printing") ?>">3D printing</a>,
                <a class="link color-blue" href="#<?php //base_url("category/3d-printing") ?>">Rubik's Cubes</a>,
                and more.</p>
            <a class="btn-small color-font-text lead-btn" href="https://github.com/alexisphilip">GitHub</a>
        </div>
    </div>
    <div class="sidecard">
        <img class="profile-pic" src="<?= img_url("profile-pic.png") ?>" alt="Profile pic">
        <p class="bold color-white">Checkout my blog here!</p>
        <a class="link bold btn-small bg-white color-font-text" href="<?= base_url("blog") ?>">All articles</a>
    </div>
</div>

<h2 class="large-title">My open source projects</h2>

<div class="large-list">

    <?php foreach ($data["repositories"] as $repository) { ?>
        <div class="list-element">
            <div class="project-content">
                <div class="project-image">

                </div>
                <div class="project-text">
                    <p class="project-title">
                        <a class="link color-blue"
                           href="https://github.com/alexisphilip/<?= $repository["name"] ?>"><?= $repository["name"] ?></a>
                    </p>
                    <p class="project-title-description"><?= $repository["description"] ?></p>
                </div>
            </div>
            <div class="project-links">
                <a class="btn-small color-font-text link-github"
                   href="https://github.com/alexisphilip/<?= $repository["name"] ?>">
                    <img class="github-icon" src="<?= img_url("icons/github/GitHub-Mark-32px.png") ?>"
                         alt="GitHub logo">
                    GitHub
                </a>
                <?php if (isset($repository["demo"]) && $repository["demo"]) { ?>
                    <a class="btn-small color-white bg-blue link-demo"
                       href="<?= base_url("demo/" . $repository["link"]) ?>">Demo</a>
                <?php } ?>
            </div>
        </div>
    <?php } ?>

</div>

