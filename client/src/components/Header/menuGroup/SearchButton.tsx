import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useForm} from "../../Util/hooks";
import {useHistory} from "react-router";


const SearchButton: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    let history = useHistory();

    const searchCallback = () => {search()};

    const {onChange, onSubmit, values} = useForm(searchCallback, {
        author: '',
        title: ''
    });

    const search = () => {
        history.push(`/search${(values.author)?('/'+values.author):('/'+ false)}${(values.title)?('/'+values.title):('/'+ false)}`)
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <SearchIcon>Search</SearchIcon>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={onSubmit} >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Find a book or author
                        </DialogContentText>
                        <TextField
                            name="author"
                            autoFocus
                            margin="dense"
                            id="author"
                            label="Author"
                            type="text"
                            fullWidth
                            value={values.author}
                            onChange={onChange}
                        />
                        <TextField
                            // autoFocus
                            name="title"
                            margin="dense"
                            id="book"
                            label="Book title"
                            type="text"
                            fullWidth
                            value={values.title}
                            onChange={onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary"  type="submit">
                            Search
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default SearchButton;