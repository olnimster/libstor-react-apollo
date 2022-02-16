import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
    mutation singleUploadFile($file: Upload!, $use: String){
        singleUploadFile(file: $file, use: $use){
         url
        }
    }
`;

export const UPLOAD_COVER = gql`
    mutation coverUploadFile($file: Upload!, $bookId: String!){
        coverUploadFile(file: $file, bookId: $bookId){
         nameFile         
        }
    }
`;

export const BOOK_QUERY_READ = gql`
    query ($id: ID!){
        getBookRead (bookId: $id){
            id
            author
            title
            body
            user
        }
    }
`;

export const BOOK_QUERY_FOR_EDIT = gql`
    query ($id: ID!){
        getBookRead (bookId: $id){
            id
            body
            price
            author
            title
            status
            cover
            annotation
            genre
            user
        }
    }
`;

export const GET_BOOKS_BY_AUTHOR_AND_TITLE = gql`
    query ($author: String, $title: String) {
    getBooksByAuthorAndTitle(author: $author, title: $title) {
         id
         title
         author
         title
         cover
         annotation
         size
         genre
    }
}`;

export const GET_BOOKS_BY_PUBLISHER = gql`
query Query($user: ID!) {
  getBooksByPublisher(user: $user) {
    id
    createdAt
    looks
    price
    size
    author
    title
    status
    cover
    annotation
    user
    likesCount
    genre
  }
}`;

export const BOOK_QUERY = gql`
    query ($id: ID!){
        getBook (bookId: $id){
            id 
            price
            author
            title
            cover
            annotation
            size
            likesCount
            looks
            genre
            likes{
                id
                user
            } 
            comments{
                id
                body
                createdAt
                publicName
                user
                avatar
            }
        }
    }
`;

export const GET_BOOK_BY_GENRE = gql`
query GetBooksByGenre($genre: String!) {
    getBooksByGenre(genre: $genre) {
      id
      title
      cover
      likesCount
      annotation
      author
      looks
      genre 
    }
}
`;

export const GET_BOOKSHELF = gql`
query GetProfile {
  getBooksFormBookshelf {
    id
    title
    cover
    likesCount
    annotation
    author
    looks
    genre
  }
}
`;

export const EDIT_PROFILE = gql`
mutation EditProfile (
    $id: ID!,
    $username: String = "",
    $email:String = "",
    $publicName: String = "",
    ){editProfile(
        userId: $id,
        user: {
            username: $username,
            email: $email,
            publicName: $publicName
        }) {
            username
            email
            createdAt
            avatar
            publicName 
            }
    } 
`;

export const CREATE_BOOK_MUTATION = gql`
mutation Mutation(
  $title: String!
  $body: BookBody!
  $annotation: String!
  $status: Boolean!
  $price: Int!
  $cover: String!
  $author: String!
  $genre: Genre!
) {
  createBook(
    newBook: {
      title: $title
      body: $body
      annotation: $annotation
      status: $status
      price: $price
      cover: $cover
      author: $author
      genre: $genre
    }
  ) {
    id
    createdAt
    price
    author
    title
    status
    cover
    genre
  }
}
`;

export const EDIT_BOOK_MUTATION = gql`
mutation Mutation(
  $title: String!
  $body: BookBody!
  $annotation: String!
  $status: Boolean!
  $price: Int!
  $cover: String!
  $author: String!
  $genre: Genre!
  $bookId: String!
) {
  editBook(
    bookId: $bookId
    newBook: {
      title: $title
      body: $body
      annotation: $annotation
      status: $status
      price: $price
      cover: $cover
      author: $author
      genre: $genre
    }
  ) {
    id
    createdAt
    price
    author
    title
    status
    cover
    genre
  }
}
`;

export const LIKE_BOOK_MUTATION = gql`
mutation LikeBook($bookId: ID!) {
  likeBook(bookId: $bookId) {
    likesCount
    likes {
      id
      user
    }
  }
}
`;

export const CREATE_COMMENT_MUTATION = gql`
mutation MyMutation($body: String = "", $bookId: String = "") {
  createComment(body: $body, bookId: $bookId) {
    comments {
      body
      createdAt
      id
      publicName
      user
      avatar
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      avatar
      id
      email
      username
      createdAt
      token
      writer
      publicName
    }
  }
`;

export const BOOKS_QUERY = gql`
    query { getBooks {
        id
        title
        author
        cover
        likesCount
        annotation
        price
        looks
        genre 
    }}
`;

export const GET_BOOKS_SORT_BY_LIKES = gql`
    query { getBooksSortByLikes {
        id
        title
        author
        cover
        likesCount
        annotation
        price
        looks
        genre 
    }}
`;

export const ADD_TO_BOOKSHELF = gql`
mutation addToBookShelf($bookId: String!) {
    addToBookShelf(bookId: $bookId) {
        bookshelf {
            bookId
            createdAt
        }
    }
}
`;

export const GET_BOOKS_SORT_BY_DATA_DESCENDING = gql`
query  {
  getBooksSortByDataDescending {
        id
        createdAt
        title
        author
        cover
        likesCount
        annotation
        price
        looks
        genre 
  }
}
`;

export const DELETE_PROFILE = gql`
mutation DeleteProfile($userId: ID!) {
  deleteProfile(userId: $userId) 
}
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment(
     $bookId: ID = "",
     $commentId: ID = "") {
        deleteComment(bookId: $bookId, commentId: $commentId) {
         id
         body
         createdAt
         price
         size
         author
         title
         comments {
             id
             body
             createdAt
             publicName
             user
         }
         status
         cover
         annotation
    }
  }
`;

export const MUTATION_DELETE_BOOK = gql`
mutation Mutation($bookId: ID!) {
  deleteBook(bookId: $bookId)
}
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $publicName: String!
    $writer: Boolean!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        publicName: $publicName
        writer: $writer
      }
    ) {
      id
      email
      username
      publicName
      createdAt
      writer
      token
      avatar
    }
  }
`;