const bookResolvers = require('./book');
const userResolvers = require('./user');
const commentsResolvers = require('./comments');
const uploadResolvers = require('./upload');

module.exports = {
    Query: {
        ...bookResolvers.Query,
        ...userResolvers.Query,
    }, 
    Mutation: {
        ...commentsResolvers.Mutation,
        ...userResolvers.Mutation,
        ...bookResolvers.Mutation,
        ...uploadResolvers.Mutation,
    },
    Upload: {
        ...uploadResolvers.Upload
    }
};  