import {useMutation} from "@apollo/client";
import {IMGPATH} from "../../../Util/config";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import {PLUG} from "../../../Util/config";
import {UPLOAD_COVER} from "../../../Util/graphql";
import Loader from "../../../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '55ch'
        }
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(30),
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    input: {
        display: 'none',
    },
}));


const CoverUpload = ({bookId, bookCover}) => {
    const classes = useStyles();

    const [coverImage, setCoverImage] = useState('')
    useEffect(()=> {
        if (bookCover){
            setCoverImage(bookCover)
        }
    }, [bookCover])


    const [uploadFile, {loading, error}] = useMutation(UPLOAD_COVER, {
        onCompleted: (data) => {
            setCoverImage(data.coverUploadFile.nameFile)
        },
    });

    if (loading) return <Loader />;
    if (error) return `Submission error! ${error.message}`;

    const handleFileChange = e => {
        const file = e.target.files[0]
        if (!file) return
        uploadFile({variables: {file, bookId}})
    }

    return (
        <div>
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Upload book cover
                </Typography>
                <Grid item xs>
                    <img alt={'Cover book'} src={!coverImage ? `${IMGPATH}${PLUG}` : `${IMGPATH}${coverImage}`} className={classes.large}/>
                </Grid>

                <Grid item xs>
                    <input
                        name="cover"
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </div>
    );
}

export default CoverUpload;