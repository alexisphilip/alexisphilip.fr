
/*
 * This script selects, cleans, and add the first 150 chars of an article to:
 * - the meta description;
 * - the Open Graph description;
 * - the Schema.org description.
 */

// TODO fix string escaping in meta and OG description.

// Selects the raw markdown string.
let markdown_text = document.querySelector(".raw-markdown").innerHTML;

// Removes "#", new lines and whitespaces.
markdown_text = markdown_text.replace(/(#)/gm, " ");
markdown_text = markdown_text.replace(/(\n)/gm, " ");
markdown_text = markdown_text.trim();

// Trims the string to the first 150 chars.
markdown_text_trimed = markdown_text.substring(0, 150);

// Adds to the meta description.
document.querySelector("meta[name='description']").content = markdown_text_trimed;
// Adds to the Open Graph description.
document.querySelector("meta[property='og:description']").content = markdown_text_trimed;
// Adds to the Schema.org description.
let schema_org = document.querySelector("#schema_org");
json = JSON.parse(schema_org.innerHTML);
json.article = markdown_text;
json.post = markdown_text;
schema_org.innerHTML = JSON.stringify(json);