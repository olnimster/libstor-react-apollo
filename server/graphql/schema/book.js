const { model, Schema } = require('mongoose');

const BookSchema = new Schema({   
    body: {},
    author: String,
    title: String,
    createdAt: String,
    price: Number,
    discount: Number,
    size: Number,
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    likesCount: Number,
    looks: Number,
    sold: String,
    comments: [
        {
            body: String,
            createdAt: String,
            publicName: String,
            avatar: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }, 
    status: Boolean,
    cover: String,
    annotation: String,
    genre: {}    
}, { minimize: false })

module.exports = model('books', BookSchema);
