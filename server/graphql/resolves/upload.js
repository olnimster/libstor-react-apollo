const {GraphQLUpload} = require("graphql-upload");
const fs = require("fs");
const path = require("path");
const generateRandomString = require("../../utils/generateRandomString");
const checkAuth = require("../../utils/check-auth");
const Book = require("../schema/book");
const User = require("../schema/user");
const {UserInputError} = require("apollo-server-express");

const {RANDOM_FILENAME_LENGTH} = require("../../config")

module.exports = {
    Upload: GraphQLUpload,
    Mutation: {
        singleUploadFile: async (parent, {file, use}, context) => {
            const isUser = checkAuth(context);
            const user = await User.findById(isUser.id);
            if (user) {
                const {createReadStream, filename, mimetype, encoding} = await file;
                const {ext} = path.parse(filename); // file extension (.+)
                const randomName = generateRandomString(RANDOM_FILENAME_LENGTH) + ext;
                const stream = createReadStream();
                const out = fs.createWriteStream(
                    path.join(__dirname, `../../public/images/${randomName}`)
                );
                await stream.pipe(out);
                if (use == "avatar") {
                    user.avatar = randomName;
                } else throw UserInputError("USE not defined");
                await user.save();
                return {
                    url: `http://localhost:4000/images/${randomName}`,
                    user,
                };
            } else throw UserInputError("User not auth");
        },
        coverUploadFile: async (parent, {file, bookId}, context) => {
            const {id} = checkAuth(context);
            const book = await Book.findById(bookId);
            if (book.user == id) {
                const {createReadStream, filename, mimetype, encoding} = await file;
                const {ext} = path.parse(filename); // file extension (.+)
                const randomName = generateRandomString(RANDOM_FILENAME_LENGTH) + ext;
                const stream = createReadStream();
                if (book.cover) {
                    let existFile = await fs.existsSync(
                        path.join(__dirname, `../../public/images/${book.cover}`)
                    );
                    if (existFile) {
                        await fs.unlink(
                            path.join(__dirname, `../../public/images/${book.cover}`),
                            (err) => {
                                if (err) console.log(err);
                                else {
                                    const out = fs.createWriteStream(
                                        path.join(__dirname, `../../public/images/${book.cover}`)
                                    );
                                    stream.pipe(out);
                                    return {
                                        nameFile: `${book.cover}`,
                                    }
                                }
                            }
                        )
                    }
                }
                const out = fs.createWriteStream(
                    path.join(__dirname, `../../public/images/${randomName}`)
                );
                await stream.pipe(out);
                book.cover = randomName;
                await book.save();
                return {
                    nameFile: `${randomName}`,
                };
            } else throw UserInputError("User not auth");
        },
    },
};
