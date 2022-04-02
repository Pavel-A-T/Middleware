const uidGenerator = require('node-unique-id-generator');

class Book {
    constructor(title = "", description = "", favorite = "",
                fileCover = "", fileName = "", fileBook, id = uidGenerator.generateUniqueId(),) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook =  fileBook;
    }
}

module.exports = Book;
