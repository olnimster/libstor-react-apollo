const Book = require("../schema/book");
const User = require("../schema/user");
const checkAuth = require("../../utils/check-auth");
const { GraphQLError } = require("graphql");
const fs = require("fs");
const path = require("path");


module.exports = {
  Query: {
    async getPartBooks(_, { partFrom }) {
      try {
        const partTo = partFrom + 10;
        const allBooks = await Book.find();
        return allBooks.filter((value, index) => {
          if (index >= partFrom && index < partTo) {
            return value;
          }
        });
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBooksQuantity() {
      try {
        const allBooks = await Book.find();
        return Object.keys(allBooks).length;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBooks() {
      try {
        return await Book.find();
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBooksFormBookshelf(_, {}, context) {
      const { id } = checkAuth(context);
      const { bookshelf } = await User.findById(id);
      const arrBookId = bookshelf.map((book) => book.bookId);
      return await arrBookId.map((bookId) => Book.findById(bookId));
    },
    async getBooksSortByDataDescending() {
      try {
        return await Book.find().sort({createdAt: -1});
      } catch (err) {
        throw new GraphQLError(err);
      }
    }, 
    async getBooksSortByLikes() {
      try {
        const books = await Book.find();
        return books.sort((a, b) => a.likesCount < b.likesCount ? 1 : -1);
      } catch (err) {
        throw new GraphQLError(err);
      }
    }, 
    async getBook(_, { bookId }) {
      try {
        const books = await Book.findById(bookId);
        if (books) {
          return books;
        } else {
          throw new GraphQLError("Book not found!");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBookRead(_, { bookId }) {
      try {
        const book = await Book.findById(bookId);
        if (book) {
          book.looks = book.looks + 1;
          await book.save();
          return book;
        } else {
          throw new GraphQLError("Book not found!");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBookByTitle(_, { title }) {
      try {
        const Books = await Book.find({ title });
        if (Books) {
          return Books;
        } else {
          throw new GraphQLError("Book not found");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBooksByPublisher(_, { user }) {
      try {
        const Books = await Book.find({ user });
        if (Books) {
          return Books;
        } else {
          throw new GraphQLError("Book not found");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBooksByGenre(_, { genre }) {
      try {
        const Books = await Book.find();
        if (Books) {           
          return await Books.filter(book => book.genre[genre])  
        } else {
          throw new GraphQLError("Book not found");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async getBooksByAuthorAndTitle(_, { author, title }) {
      if (author === "" && title === "") {
        throw new GraphQLError("The request must not be empty!");
      }

      if (author && title === "") {
        try {
          const Books = await Book.find({ author });
          if (Books) {
            return Books;
          } else {
            throw new GraphQLError("Book not found");
          }
        } catch (err) {
          throw new GraphQLError(err);
        }
      }

      if (author === "" && title) {
        try {
          const Books = await Book.find({ title });
          if (Books) {
            return Books;
          } else {
            throw new GraphQLError("Book not found");
          }
        } catch (err) {
          throw new GraphQLError(err);
        }
      }

      try {
        const Books = await Book.find({ author });
        if (Books) {
          return Books.filter((book) => book.title === title);
        } else {
          throw new GraphQLError("Book not found");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
  Mutation: {
    async createBook(
      _,
      { newBook: { title, body, annotation, status, price, cover, author, genre } },
      context
    ) {      
      const user = checkAuth(context);
      const newBook = new Book({
        title,
        body,
        annotation,
        status,
        price,
        user: user.id,
        author,
        createdAt: new Date().toISOString(),
        cover,
        size: 200,
        comment: [],
        likes: [],
        likesCount: 0,
        looks: 0,
        genre,
        discount: 0,
      });
      return await newBook.save();
    },
    async editBook(
      _,
      { bookId, newBook: { title, body, annotation, status, price, author, genre } },
      context
    ) {
      const { id } = checkAuth(context);
      const book = await Book.findById(bookId);
      if (book.user !== id) {
        throw new GraphQLError("Action not allowed!");
      }
      book.title = title;
      book.body = body;
      book.annotation = annotation;
      book.status = status;
      book.price = price;
      book.author = author;
      book.genre = genre;
      
      await book.save();
      return book;
    },
    async deleteBook(_, { bookId }, context) {
      const user = checkAuth(context);
      try {
        const book = await Book.findById(bookId);
        if (user.id === book.user) {
          if (book.cover) {
            let existFile = await fs.existsSync(
              path.join(__dirname, `../../public/images/${book.cover}`)
            );
            if (existFile) {
              await fs.unlink(
                path.join(__dirname, `../../public/images/${book.cover}`),
                (err) => {
                  if (err) console.log(err);
                }
              );
            }
          }

          await book.delete();
          return "Book deleted successfully";
        } else {
          throw new GraphQLError("Action not allowed");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    async likeBook(_, { bookId }, context) {
      const { id } = checkAuth(context);
      const user = id;
      try {
        const book = await Book.findById(bookId);
        if (book) {
          if (book.likes.find((like) => like.user == user)) {
            book.likes = book.likes.filter((like) => !(like.user == user));
            book.likesCount = book.likesCount - 1;
          } else {
            book.likes.push({
              user,
            });
            book.likesCount = book.likesCount + 1;
          }
          await book.save();
          return book;
        } else {
          throw new GraphQLError("Action not allowed");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
};
