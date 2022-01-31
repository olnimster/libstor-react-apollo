import React from 'react';
import Grid from "@material-ui/core/Grid";

const ErrorMessage = ({err}) => {
    return (
        <Grid container direction="column" alignItems="center" >
            {err}
        </Grid>
    );
};

export default ErrorMessage;