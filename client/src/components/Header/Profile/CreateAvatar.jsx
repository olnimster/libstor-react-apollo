import {useMutation} from "@apollo/client";
import {IMGPATH} from "../../Util/config";
import React from "react";
import {UPLOAD_FILE} from "../../Util/graphql";
import {Avatar} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Loader from "../../Util/Loader/Loader";

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
        width: theme.spacing(15),
        height: theme.spacing(15),
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


function TransitionDown(props) {
    return <Slide {...props} direction="down"/>;
}


const CreateAvatar = ({avatar, publicName}) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);


    const handleClose = () => {
        setOpen(false);
    };

    const [uploadFile, {loading, error}] = useMutation(UPLOAD_FILE, {
        onCompleted: () => {
            setTransition(() => TransitionDown);
            setOpen(true);
        },
    });

    if (loading) return <Loader/>;
    if (error) return `Submission error! ${error.message}`;

    const handleFileChange = e => {
        const use = 'avatar'
        const file = e.target.files[0]
        if (!file) return
        uploadFile({variables: {file, use}})
    }

    return (
        <div>
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Upload avatar
                </Typography>
                <Snackbar
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={transition}
                    message="Please re-login to change the avatar!"
                    key={transition ? transition.name : ''}
                />
                <Grid item xs>
                    <Avatar alt={publicName} src={`${IMGPATH}${avatar}`} className={classes.large}/>
                </Grid>

                    <Grid item xs>
                        <input
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

export default CreateAvatar;