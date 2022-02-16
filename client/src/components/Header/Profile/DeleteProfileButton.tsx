import React, { useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ConfirmProfileDelete from "./ConfirmProfileDelete";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const DeleteProfileButton: React.FC<{deleteUser: any}> = (deleteUser) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
            >
                Delete profile
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ConfirmProfileDelete deleteUser={deleteUser}/>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={handleClose}
                        >
                            I changed my mind
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default DeleteProfileButton;