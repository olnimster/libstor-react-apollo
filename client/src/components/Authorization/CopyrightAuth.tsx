import React from 'react';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const CopyrightAuth = (): JSX.Element => {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'CopyrightAuth © '}
                <Link color="inherit">
                    Libstor
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
};

export default CopyrightAuth;