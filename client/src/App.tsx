import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";


import {AuthProvider} from "./components/Authorization/auth";
import AuthRoute from "./components/Authorization/AuthRoute";
import IsAuthRoute from "./components/Authorization/IsAuthRoute";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Book from "./components/Book/Book";
import Login from "./components/Authorization/Login";
import NewBooks from "./components/Header/menuGroup/BooksMenu/NewBooks";
import Footer from "./components/Footer/Footer";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./components/Util/theme";
import Loader from "./components/Util/Loader/Loader";

const Page404 = lazy(() => import('./components/Page404/Page404').then(({Page404}) => ({default: Page404})),);
const BookShelf = lazy(() => import('./components/Header/menuGroup/MyBooksBookshelf/BookShelf').then(({BookShelf}) => ({default: BookShelf})),);
const Profile = lazy(() => import('./components/Header/Profile/Profile').then(({Profile}) => ({default: Profile})),);
const Reader = lazy(() => import('./components/Book/Reader/Reader').then(({Reader}) => ({default: Reader})),);
const Editor = lazy(() => import('./components/Book/Editor/EditorBook').then(({EditorBook}) => ({default: EditorBook})),);
const AddBook = lazy(() => import('./components/Addbook/AddBook').then(({AddBook}) => ({default: AddBook})),);
const SearchResult = lazy(() => import('./components/Search/SearchResult').then(({SearchResult}) => ({default: SearchResult})),);
const Registration = lazy(() => import('./components/Authorization/Registration').then(({Registration}) => ({default: Registration})),);
const MyBooks = lazy(() => import('./components/Header/menuGroup/MyBooksButton').then(({MyBooksButton}) => ({default: MyBooksButton})),);
const AllBooks = lazy(() => import('./components/Header/menuGroup/BooksMenu/AllBooks').then(({AllBooks}) => ({default: AllBooks})),);
const Genre = lazy(() => import('./components/Header/menuGroup/BooksMenu/Genre').then(({Genre}) => ({default: Genre})),);
const BookByGenre = lazy(() => import('./components/BookByGenre/BookByGenre').then(({BookByGenre}) => ({default: BookByGenre})),);
const MyAccount = lazy(() => import('./components/Header/Account/Account').then(({Account}) => ({default: Account})),);

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <ThemeProvider theme={theme}>
                    <Header/>
                    <Suspense fallback={<div><Loader/></div>}>
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route exact path='/mybooks' component={MyBooks}/>
                            <IsAuthRoute exact path='/account' component={MyAccount}/>
                            <Route exact path='/allbooks' component={AllBooks}/>
                            <Route exact path='/genre' component={Genre}/>
                            <Route exact path='/newbooks' component={NewBooks}/>
                            <IsAuthRoute exact path='/bookshelf/:userid?' component={BookShelf}/>
                            <IsAuthRoute exact path='/addbook' component={AddBook}/>
                            <AuthRoute exact path='/registration' component={Registration}/>
                            <AuthRoute exact path='/login' component={Login}/>
                            <Route exact path='/reader/:id?' render={() => (<Reader/>)}/>
                            <IsAuthRoute exact path='/editor/:id?' component={() => (<Editor/>)}/>
                            <Route path='/book/:id?' component={Book}/>
                            <Route path='/genre/:genre?' component={BookByGenre}/>
                            <Route exact path='/search/:author?/:title?' component={SearchResult}/>
                            <IsAuthRoute path='/profile/' component={Profile}/>
                            <Route path="*" component={Page404}/>
                        </Switch>
                    </Suspense>
                    <Footer/>
                </ThemeProvider>
            </Router>
        </AuthProvider>
    )
}

export default App;
