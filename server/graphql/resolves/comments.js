const Book = require("../schema/book");
const checkAuth = require("../../utils/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server-express");
const User = require("../schema/user");

module.exports = {
  Mutation: {
    async createComment(_, { bookId, body }, context) {
      const isUser = checkAuth(context); 
      const user = await User.findById(isUser.id);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }
      const book = await Book.findById(bookId);
      if (book) {
        book.comments.unshift({
          body,
          user: user.id,
          publicName: user.publicName,
          createdAt: new Date().toISOString(),
          avatar: user.avatar
        });
        await book.save();
        return book;
      } else throw UserInputError("Book not found");
    },
    async deleteComment(_, { bookId, commentId }, context) {
      const user = checkAuth(context);
      const book = await Book.findById(bookId);
      if (book) {
        const commentIndex = await book.comments.findIndex( 
          (c) => c.id === commentId
        );
        if (book.comments[commentIndex].user == user.id) {
          book.comments.splice(commentIndex, 1);
          await book.save();
          return book;
        } else {
          throw new AuthenticationError("Action  not allowed");
        }
      } else {
        throw new UserInputError("Book not found");
      }
    },
  },
};
