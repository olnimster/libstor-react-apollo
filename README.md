## Simple React Story Library App

This codebase was created to demonstrate a fully fledged fullstack application built 
with MERNG stack.

### Features
***
MongoDB + ExpressJS + React + NodeJS + GraphQL (Apollo).

Including CRUD operations (though GraphQL), authentication, routing, and more.
A variety of material-ui components such as modal, various form elements etc.
Simple local React and Apollo state management without redux, mobx.

- [x] Add/Delete/Edit book
  - [x] Edit cover image
  - [x] List Genres
  - [x] wysiwyg Editor
- [x] Add/Delete Comment
- [x] Likes count
- [x] Views count
- [x] Add/Delete to Bookshelf
- [x] Sorting
- [x] Search by author, title and genre 
- [x] Add/Delete/Edit user profile 


***

### Stack technology
***
#### _Server_

* Apollo Server
* GraphQL
* Mongoose
* JSON Web Token
* Bcrypt

#### _Client_

* React
* Apollo Client
* GraphQL
* JWT Decode
* Material-ui

***

![Main page](https://user-images.githubusercontent.com/8253434/151821710-b81a6810-320c-4f69-ae7e-d997aa0cae97.png)
![Book page](https://user-images.githubusercontent.com/8253434/151821719-7041f7b4-f662-45ed-b474-b88b81e4f859.png)


You can view a live demo over at https://protected-plains-10953.herokuapp.com/

### _Running_
***
* Clone repo `git clone git@github.com:olnimster/libstor-react-apollo.git`
* Install NPM modules server `cd server` and `npm install`
* Install NPM modules client `cd client` and `npm install`
* Modify `/server/config.js` for database credentials
* Modify `/client/src/components/Util/config.js` for API port (optional)
* Run Server `cd server` and npm start, browse GraphiQL at http://localhost:4000/graphql
* Run Client `cd client` and npm start, browse web at http://localhost:3000
