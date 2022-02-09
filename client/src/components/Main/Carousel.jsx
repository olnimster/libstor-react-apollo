import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import CardOne from "../Card/CardOne";
import {useWindowDimensions} from "../Util/hooks";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    swiper: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    }
}));

const Carousel = ({books}) => {
    const classes = useStyles();
    let {cartOnView} = useWindowDimensions();
    return (
            <Swiper
                centerInsufficientSlides={true} slidesPerView={cartOnView} spaceBetween={2} slidesPerGroup={cartOnView}
                navigation={true}>
                {books && books.map((book) => (
                    <SwiperSlide className={classes.swiper} key={book.id}><CardOne book={book}/></SwiperSlide>
                ))}
            </Swiper>
    );
};

export default Carousel;