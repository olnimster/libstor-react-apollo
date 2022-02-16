import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from "@material-ui/core/Dialog";
import {AuthContext} from "./auth";
import {useMutation} from "@apollo/client";
import {useForm} from "../Util/hooks";
import {useHistory} from "react-router";
import {REGISTER_USER} from "../Util/graphql";
import Loader from "../Util/Loader/Loader";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'CopyrightAuth © '}
            <Link color="inherit">
                Libstor
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function Registration(): JSX.Element {
    let history = useHistory();
    const [errors, setErrors] = useState({
        username: '',
        publicName: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
    const context = useContext(AuthContext);
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const handleClose = () => {setOpen(false)
        history.push('/')
    };

    const {onChange, onSubmit, values}: any = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        publicName: '',
        writer: false
    });

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}) {
            context.login(userData);
            history.push('/');
            setOpen(false);
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registration
                        </Typography>
                        <form onSubmit={onSubmit} noValidate>
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
                                label="Pseudonym"
                                name="publicName"
                                autoComplete="username"
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password.."
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                value={values.confirmPassword}
                                error={!!errors.confirmPassword}
                                onChange={onChange}
                            />
                            <FormControlLabel control={<Checkbox name="writer"/> } label="writer"
                                              value={values.writer}
                                              name="writer"
                                              id="writer"
                                              onChange={onChange}
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
                        </form>
                    </div>
                    <Box mt={8}>
                        {Object.keys(errors).length > 0 && (
                            <div className="ui error message">
                                <ul className="list">
                                    {Object.values(errors).map((value:any, index) => (
                                        value&&<li key={index}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Copyright/>
                    </Box>
                </Container>
            </Dialog>
        </div>
    );
}