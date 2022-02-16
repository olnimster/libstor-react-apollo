import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import DeleteAccountButton from "./DeleteAccountButton";
import {BookType} from "../../types/types";

function PaperComponent(props: any) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

type propsType = {
    book: BookType
    userId: string
}

const ConfirmationDialog: React.FC<propsType> = ({book, userId}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen: any = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="secondary" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete book
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you are sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <DeleteAccountButton  userId={userId} bookId={book.id} />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmationDialog;