import React from 'react';
import CardOne from "../Card/CardOne";
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import { GET_BOOKS_SORT_BY_DATA_DESCENDING} from "../Util/graphql";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {useWindowDimensions} from "../Util/hooks";
import Grid from "@material-ui/core/Grid";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import SwiperCore, { Pagination, Navigation } from 'swiper';
import {Link} from "react-router-dom";
import Loader from "../Util/Loader/Loader";


SwiperCore.use([Pagination, Navigation]);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '1200px',
        margin: 'auto'
    },
    button: {
        display: 'flex',
    },
    swiper: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    }
}));


const NewBooks = () => {
    let {cartOnView} = useWindowDimensions();

    const classes = useStyles();

    const {loading, error, data: {getBooksSortByDataDescending: books} = {}} = useQuery(GET_BOOKS_SORT_BY_DATA_DESCENDING);
    if (loading) return <Loader />;
    if (error) return `Error! ${error.message}`;

    return (
        <Grid container alignItems="center" className={classes.root} spacing={2}>
                <Grid container justifyContent="space-between">
                    <Grid>
                        <Typography variant="h5" component="h2">
                            New books
                        </Typography>
                    </Grid>
                    <Grid >
                        <Link to={'/newbooks'}>
                            <Button>
                                More
                            </Button>
                        </Link>
                    </Grid>
                </Grid>

                <Swiper
                    centerInsufficientSlides={true} slidesPerView={cartOnView} spaceBetween={2} slidesPerGroup={cartOnView}
                         navigation={true}>
                    {books && books.map((book) => (
                        <SwiperSlide className={classes.swiper} key={book.id}><CardOne book={book}/></SwiperSlide>
                    ))}
                </Swiper>
        </Grid>
    )
}

export default NewBooks;