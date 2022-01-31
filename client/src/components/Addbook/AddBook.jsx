import React, {useState} from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button, makeStyles, Paper, TextField} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import {useForm} from "../Util/hooks";
import {useMutation} from "@apollo/client";
import {useHistory} from "react-router";
import {CREATE_BOOK_MUTATION} from "../Util/graphql";
import FormGroup from "@material-ui/core/FormGroup";
import genre from "../../assets/GenresList"
import Loader from "../Util/Loader/Loader";
import ErrorMessage from "../Util/ErrorMessage/ErrorMessage";

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

export const AddBook = () => {
    let history = useHistory();

    const {onChange, onSubmit, values} = useForm(addBookCallback, {
        title: '',
        author: '',
        annotation: '',
        genre,
        body: {},
        status: false,
        price: 0,
        cover: ''
    });

    const classes = useStyles();

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),);

    const [convertedContentToRaw, setConvertedContentToRaw] = useState(null);
    const [genreState, setGenreState] = useState(values.genre);

    const [addBook, {bookCallback, loading, error}] = useMutation(CREATE_BOOK_MUTATION);

    if (loading) return <Loader/>;
    if (error) return <ErrorMessage err={error.message}/>;

    const handlerClick = () => {
        values['genre'] = genreState;
        values['body'] = convertedContentToRaw;
        addBook({variables: values});
        history.push('/');
    }

    const handleChangeGenre = (event) => {
        setGenreState({...genreState, [event.target.name]: event.target.checked});
    };

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToRaw();
    }

    const convertContentToRaw = () => {
        let currentContentAsRaw = convertToRaw(editorState.getCurrentContent());
        setConvertedContentToRaw(currentContentAsRaw);
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
                                      type="checkbox"
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
                        className={classes.submit}
                >Save</Button>
            </form>
        </div>
    );
};