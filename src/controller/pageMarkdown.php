<?php

function pageMarkdown($type, $name)
{
    if ($type == "page") {
        p("page!");
    } else if ($type == "post") {
        p("post!");
    } else {
        p("pageMarkdown() error: wrong type given. <strong>\"\$type\"</strong> must be <strong>\"page\"</strong> or <strong>\"post\"</strong>.", "error");
        die;
    }
}