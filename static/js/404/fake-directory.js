
class FakeDirectory
{
    static files = [
        {
            name: "secret_crypt",
            rights: "-r-xr--r-- 1",
            owner: "root root",
            content: "sqdf mlqksdf mlkqsj dfmlkj sdfqsdflkjl skdfjml qksdfmlqs kfjlkj"
        },
        {
            name: "site_info.txt",
            rights: "-rwxr--r-- 1",
            owner: "root root",
            content: "qmlfkjdf jdfkj j"
        }
    ];

    static getFiles()
    {
        return this.files;
    }

    static fileExists() {

    }
}