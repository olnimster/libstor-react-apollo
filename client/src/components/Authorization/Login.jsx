import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from "@material-ui/core/Dialog";
import {NavLink} from "react-router-dom";
import {AuthContext} from "./auth";
import {useMutation} from "@apollo/client";
import {useForm} from "../Util/hooks";
import {useHistory} from "react-router";
import {LOGIN_USER} from "../Util/graphql";
import CopyrightAuth from "./CopyrightAuth";
import Loader from "../Util/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    let history = useHistory();
    const context = useContext(AuthContext);
    const classes = useStyles();

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    function loginUserCallback() {loginUser()}

    const [loginUser, {loading} ] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            context.login(userData);
        },
        onError(err ) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });
    if (loading) return <Loader/>;

    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const handleLink = () => {
        setOpen(false);
        history.push('/registration')
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <div>Login</div>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form onSubmit={onSubmit} noValidate className={loading ? <Loader /> : ''}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="email"
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                error={!!errors.password}
                                onChange={onChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <NavLink to="registration" variant="body2" onClick={handleLink}>
                                        {"Don't have an account? Sign Up"}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        {Object.keys(errors).length > 0 && (
                            <div className="ui error message">
                                <ul className="list">
                                    {Object.values(errors).map((value) => (
                                        <li key={value}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <CopyrightAuth/>
                    </Box>
                </Container>
            </Dialog>
        </div>
    );
}