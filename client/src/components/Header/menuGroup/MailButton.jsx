import React from "react";
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles} from '@material-ui/core/styles';
import {Slide, Snackbar} from "@material-ui/core";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const MailButton = () => {
    const [state, setState] = React.useState({
        open: false,
        Transition: 'Fade',
    });

    const handleClick = (Transition) => () => {
        setState({
            open: true,
            Transition,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

const classes = useStyles();
    return (
        <div>
            <Button className={classes.root} onClick={handleClick(SlideTransition)}>
                <Badge color="secondary" >
                    <MailIcon/>
                </Badge>
            </Button>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message="You have no mail yet."
                key={state.Transition.name}
            />
        </div>


    );
}


export default MailButton;