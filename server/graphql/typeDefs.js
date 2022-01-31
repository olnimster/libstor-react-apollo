module.exports = `
  scalar Upload
  scalar BookBody
  scalar Genre

  type books {
    id: ID!
    body: BookBody!
    createdAt: String!
    likes: [like]
    likesCount: Int
    commentCount: Int
    looks: Int
    price: Int!
    size: Int!
    author: String!
    sold: String!
    title: String!
    comments: [comment]
    status: Boolean!
    cover: String!
    annotation: String!
    genre: Genre
    discount: Int!
    user: ID!
  }

  type comment {
    id: ID!
    body: String!
    createdAt: String!
    publicName: String
    user: ID!
    avatar: String
  }


  type bookshelf {
    bookId: String!
    createdAt: String!
  }

  type users {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String!
    avatar: String
    follow: [follow]
    publicName: String!
    token: String!
    writer: Boolean!
    bookshelf: [bookshelf]
    uploadedFiles: [uploadedFile]
  }

  input ProfileEdit {
    username: String
    email: String
    publicName: String
  }

  type follow {
    id: ID!
    publicName: String!
  }

  type like {
    id: ID!
    user: ID!
  }

  input DocumentUploadInput {
    docType: String!
    file: Upload!
  }

  type uploadedFile {
    docType: String!
    filename: String!
  }

  type SuccessResult {
    success: Boolean!
    message: String
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    publicName: String!
    writer: Boolean!
  }

  input NewBook {
    title: String!
    body: BookBody!
    annotation: String!
    status: Boolean!
    price: Int!
    cover: String
    author: String!
    genre: Genre!
  } 

  type File {
    url: String!
  }

  type nameFile {
    nameFile: String!
  }

  type Query {
    getBooks: [books!]!
    getBooksFormBookshelf: [books]
    getBooksSortByDataDescending: [books!]!
    getBooksSortByLikes: [books!]!
    getPartBooks(partFrom: Int!): [books!]!
    getBook(bookId: ID!): books
    getBooksQuantity: Int!
    getBookRead(bookId: ID!): books
    getBookByTitle(title: String!): [books!]!
    getBooksByPublisher(user: ID!): [books!]!
    getBooksByGenre(genre: String!): [books!]!
    getBooksByAuthorAndTitle(author: String, title: String): [books!]!
    getProfile(userId: ID!): users
  }

  type Mutation {
    addToBookShelf(bookId: String!): users!
    register(registerInput: RegisterInput): users!
    deleteProfile(userId: ID!): String
    editProfile(userId: ID!, user: ProfileEdit!): users!
    login(username: String!, password: String!): users!
    editBook(bookId: String!, newBook: NewBook!): books!
    createBook(newBook: NewBook): books!
    deleteBook(bookId: ID!): String!
    createComment(bookId: String!, body: String!): books!
    deleteComment(bookId: ID!, commentId: ID!): books!
    likeBook(bookId: ID!): books!
    singleUploadFile(file: Upload!, use: String): File!
    coverUploadFile(file: Upload!, bookId: String!): nameFile!
  }
`;
