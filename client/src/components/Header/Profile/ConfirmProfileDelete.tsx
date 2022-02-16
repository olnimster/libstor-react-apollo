import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 100,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));

const ConfirmProfileDelete: React.FC<{deleteUser: any}> = (deleteUser) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    return (
        <div className={classes.root}>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="i really want to delete"
            />
            <div className={classes.container}>
                <Zoom in={checked}>
                    <Paper elevation={4} className={classes.paper}>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={deleteUser.deleteUser}
                        >
                            Delete profile
                        </Button>
                    </Paper>
                </Zoom>
            </div>
        </div>
    );
}

export default ConfirmProfileDelete;