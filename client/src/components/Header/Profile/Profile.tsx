import React, {useContext, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import {useMutation} from "@apollo/client";
import {DELETE_PROFILE, EDIT_PROFILE} from "../../Util/graphql";
import {AuthContext} from "../../Authorization/auth";
import {Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useForm} from "../../Util/hooks";
import Button from "@material-ui/core/Button";
import CreateAvatar from "./CreateAvatar";
import {useHistory} from "react-router";
import DeleteProfileButton from "./DeleteProfileButton";
import Loader from "../../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const Profile: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const context: any = useContext(AuthContext);

    const {onChange, onSubmit, values}: any = useForm(editProfile, {
        id: context.user.id,
        username: context.user.username,
        email: context.user.email,
        publicName: context.user.publicName
    });

    const [errors, setErrors] = useState({
        username: '',
        publicName: '',
        email: ''
    });
    const userId = context.user.id



    const [editUser, {loading}] = useMutation(EDIT_PROFILE, {
        update() {
            context.logout();
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });
    function editProfile() { editUser() }

    const [deleteUser] = useMutation(DELETE_PROFILE, {
        update() {
            context.logout();
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: {userId: userId}
    });

    const verifier = ((values.email === context.user.email)
        &&(values.username === context.user.username)
        &&(values.publicName === context.user.publicName))

    return (
        <div className={classes.paper}>
            <Typography component="h3" variant="h4">
                Profile
            </Typography>
            <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <CreateAvatar avatar={context.user.avatar} publicName={context.user.publicName}/>
                    </Paper>
                </Grid>
                <Paper className={classes.paper}>
                <form onSubmit={onSubmit} noValidate >
                    {loading ? <Loader /> : ''}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={values.username}
                        error={!!errors.username}
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="publicName"
                        label="Public Name"
                        name="publicName"
                        autoComplete="publicName"
                        autoFocus
                        value={values.publicName}
                        error={!!errors.publicName}
                        onChange={onChange}
                    />
                    <TextField

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={values.email}
                        error={!!errors.email}
                        onChange={onChange}
                    />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            startIcon={<SaveIcon />}
                            disabled={verifier}
                        >
                            Save
                        </Button>

                    {Object.keys(errors).length > 0 && (
                        <div className="ui error message">
                            <ul className="list">
                                {Object.values(errors).map((value, index) => (
                                    value&&<li key={index}>{value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </form>
                </Paper>
                <Grid item xs>
                    <DeleteProfileButton deleteUser={deleteUser}/>
                </Grid>
            </Grid>
        </div>
    );
}
