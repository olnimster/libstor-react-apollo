import React, {useEffect, useState} from 'react';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button, makeStyles, Paper, TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import {useForm} from "../../Util/hooks";
import {useMutation, useQuery} from "@apollo/client";
import {useHistory} from "react-router";
import {BOOK_QUERY_FOR_EDIT, EDIT_BOOK_MUTATION} from "../../Util/graphql";
import FormGroup from "@material-ui/core/FormGroup";
import genre from "../../../assets/GenresList"
import {useParams} from "react-router-dom";
import CoverUpload from "./CoverUpload/CoverUpload";
import Loader from "../../Util/Loader/Loader";
import ErrorMessage from "../../Util/ErrorMessage/ErrorMessage";
import {idParamType} from "../../types/types";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '-webkit-fill-available',
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        },
    },
    wrapper: {
        flexGrow: 1,
        maxWidth: '1200px',
        margin: 'auto'
    },
}));

export const EditorBook = (): JSX.Element => {
    let history = useHistory();
    let {id}: idParamType = useParams();

    const {onChange, onSubmit, values}: any = useForm(addBookCallback, {
        title: '',
        author: '',
        annotation: '',
        genre,
        body: {},
        status: false,
        price: 0,
        cover: '',
        bookId: id
    });

    const classes = useStyles();

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),);

    const [genreState, setGenreState] = useState(values.genre);

    const {loading: loadingQ, data: {getBookRead} = {}} = useQuery(BOOK_QUERY_FOR_EDIT, {variables: {id: id}});
    const [addBook, {bookCallback, loading, error}]: any = useMutation(EDIT_BOOK_MUTATION);


    useEffect(() => {
        if (!loadingQ && getBookRead) {
            setGenreState(getBookRead.genre);
            values.title = getBookRead.title;
            values.author = getBookRead.author;
            values.annotation = getBookRead.annotation;
            values.status = getBookRead.status;
            values.price = getBookRead.price;
            values.cover = getBookRead.cover;
            setEditorState(EditorState.createWithContent(convertFromRaw(getBookRead.body)));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingQ, getBookRead])

    if (loadingQ || loading) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    const handlerClick = () => {
        values['genre'] = genreState;
        values['body'] = convertToRaw(editorState.getCurrentContent());
        addBook({variables: values});
        history.push('/');
    }

    const handleChangeGenre = (event: { target: { name: any; checked: any; }; }) => {
        setGenreState({...genreState, [event.target.name]: event.target.checked});
    };

    const handleEditorChange = (state: React.SetStateAction<EditorState>) => {
        setEditorState(state);
    }

    function addBookCallback() {
        bookCallback()
    }

    return (
        <div className={classes.wrapper}>
            <Typography component="h1" variant="h5">
                Add book
            </Typography>
            <form noValidate autoComplete="off" onSubmit={onSubmit}
                  className={loading ? 'loading' : ''}>
                <div className={classes.root}>
                    <TextField
                        id="standard-basic"
                        label="Title book"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                    />
                </div>
                <div className={classes.root}>
                    <TextField
                        id="standard-basic"
                        label="Author book"
                        name="author"
                        value={values.author}
                        onChange={onChange}
                    />
                </div>
                <div className={classes.root}>
                    <TextField
                        id="standard-basic"
                        label="Annotation"
                        multiline
                        rows={6}
                        variant="outlined"
                        name="annotation"
                        value={values.annotation}
                        onChange={onChange}
                    />
                </div>
                <div className={classes.root}>
                    <CoverUpload bookId={values.bookId} bookCover={values.cover}/>
                </div>
                <div className={classes.root}>
                    <TextField
                        id="standard-basic"
                        label="Price"
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={onChange}
                    />
                </div>
                <div className={classes.root}>
                    <FormControlLabel control={<Checkbox name="status"/>}
                                      label="status book"
                                      name="writer"
                                      // type="checkbox"
                                      id="writer"
                                      value={values.status}
                                      onChange={onChange}
                    />

                </div>
                <Paper className={classes.root}>
                    <FormGroup row>
                        {Object.keys(genreState).map((key, index) => {
                            return (
                                <FormControlLabel key={index}
                                                  control={<Checkbox
                                                      checked={genreState[key]}
                                                      onChange={handleChangeGenre} name={key}/>}
                                                  label={key}
                                />
                            )
                        })}
                    </FormGroup>
                </Paper>
                <div>
                    <Button onClick={handlerClick} variant="outlined" color="primary">Save</Button>
                </div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />
                <hr/>
                <Button onClick={handlerClick} variant="outlined" color="primary"
                >Save</Button>
            </form>
        </div>
    );
};