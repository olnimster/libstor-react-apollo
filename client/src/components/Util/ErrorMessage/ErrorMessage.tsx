import React from 'react';
import Grid from "@material-ui/core/Grid";

type PropsType = {
    err: String
}

const ErrorMessage = ({err}: PropsType) => {
    return (
        <Grid container direction="column" alignItems="center" >
            {err}
        </Grid>
    );
};

export default ErrorMessage;