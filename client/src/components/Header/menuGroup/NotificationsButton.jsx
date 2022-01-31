import React from "react";
import Button from '@material-ui/core/Button';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {Slide, Snackbar} from "@material-ui/core";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const NotificationsButton = () => {
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

    return(
    <div>
        <Button onClick={handleClick(SlideTransition)}>
            <NotificationsNoneIcon variant="outlined">Notifications</NotificationsNoneIcon>
        </Button>
        <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            message="You have no notification yet."
            key={state.Transition.name}
        />
    </div>

    )
}

export default NotificationsButton;