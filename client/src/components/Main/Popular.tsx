import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import {GET_BOOKS_SORT_BY_LIKES} from "../Util/graphql";
import Grid from "@material-ui/core/Grid";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import {Link} from "react-router-dom";
import Loader from "../Util/Loader/Loader";
import Carousel from "./Carousel";
import ErrorMessage from "../Util/ErrorMessage/ErrorMessage";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 20
    },
    button: {
        display: 'flex',
    }
}));

const Popular: React.FC = () => {
    const classes = useStyles();

    const {loading, error, data: {getBooksSortByLikes: books} = {}} = useQuery(GET_BOOKS_SORT_BY_LIKES);
    if (loading) return <Loader/>;
    if (error) return (<ErrorMessage err={error.message}/>);

    return (
        <Grid container alignItems="center" className={classes.root} spacing={2}>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography variant="h5" component="h2">
                        Popular
                    </Typography>
                </Grid>
                <Grid>
                    <Link to={'/'}>
                        <Button>
                            More
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        <Carousel books={books} />
        </Grid>
    )
}

export default Popular;