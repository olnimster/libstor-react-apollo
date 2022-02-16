import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {Slide, SlideProps, Snackbar} from "@material-ui/core";

function SlideTransition(props: JSX.IntrinsicAttributes & SlideProps) {
    return <Slide {...props} direction="up" />;
}

const NotificationsButton: React.FC = () => {
    const [state, setState] = useState<{open: boolean, Transition: any }>({
        open: false,
        Transition: 'Fade',
    });

    const handleClick = (Transition: (props: JSX.IntrinsicAttributes & SlideProps) => JSX.Element) => () => {
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
            <NotificationsNoneIcon >Notifications</NotificationsNoneIcon>
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