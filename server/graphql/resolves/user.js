const User = require("../schema/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {GraphQLError} = require("graphql");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../../utils/check-auth");
const fs = require("fs");
const path = require("path");
const {DEFAULT_AVATAR} = require("../../config");

const {
  validateRegisterInput,
  validateLoginInput,
  validateEditProfile,
} = require("../../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      publicName: user.publicName,
      writer: user.writer,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    SECRET_KEY,
    { expiresIn: "6h" }
  );
} 

module.exports = {
  Query: {
    async getProfile(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new GraphQLError("Profile not found!");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },

  Mutation: {
    async editProfile(_, { userId, user: {
    username,
    email,
    publicName
    } }, context) {
      const isUser = checkAuth(context);     
      const { valid, errors } = validateEditProfile(
        username,
        email,
        publicName
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const user = await User.findById(isUser.id); 
      if(isUser.id == userId) {
        user.username = username,
        user.email = email,
        user.publicName = publicName
        await user.save();
        return user; 
        } else throw UserInputError("User not found");
    },
    async addToBookShelf(_, { bookId }, context) {  
        const {id} = checkAuth(context);           
        const user = await User.findById(id);         
        let isBookExist;
        if ( user.bookshelf ){
          isBookExist = await user.bookshelf.findIndex( book => book.bookId === bookId )
        }
        if (isBookExist !== -1 ) {
          user.bookshelf.splice(isBookExist, 1)
          await user.save();
          return user;
        } else{
          user.bookshelf.unshift({ 
            bookId: bookId,
            createdAt: new Date().toISOString(),
          })
          await user.save();
          return user;           
        }
      },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
       const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials!", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword, publicName, writer } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
        publicName
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "this username is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        publicName,
        writer,
        avatar: 'avatar-default-1.png'
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async deleteProfile(_, { userId }, context) {
      const isUser = checkAuth(context);
      const user = await User.findById(isUser.id);
      try {
        if(isUser.id == userId) {
          if (user.avatar !== DEFAULT_AVATAR) {
            let existFile = await fs.existsSync(
              path.join(__dirname, `../../public/images/${user.avatar}`)
            );
            if (existFile) {
              await fs.unlink(
                path.join(__dirname, `../../public/images/${user.avatar}`),
                (err) => {
                  if (err) console.log(err);
                }
              );
            }
          }

          await user.delete();
          return "Profile deleted successfully";
        } else {
          throw new GraphQLError("Action not allowed");
        }
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  }
}; 
