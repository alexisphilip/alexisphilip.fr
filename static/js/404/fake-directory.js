
class FakeDirectory
{
    static files = [
        {
            name: "crypt_key",
            rights: "-r-xr--r-- 1",
            owner: "root root",
            content: "42"
        },
        {
            name: "site_info.txt",
            rights: "-rwxr--r-- 1",
            owner: "root root",
            content: "" +
                "Site info<br>" +
                "URL: https://www.alexisphilip.fr<br>" +
                "Author: Alexis Philip<br>" +
                "<strong>Encrypted message:</strong> eiH3aeL2am9ieri3"
        }
    ];

    static getFiles()
    {
        return this.files;
    }

    static getFile(file_name) {

        let found = false;

        this.files.forEach(function(file) {
            if (file.name === file_name) {
                found = file;
                return 0;
            }
        });

        return found;
    }
}