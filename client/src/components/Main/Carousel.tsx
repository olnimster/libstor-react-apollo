import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import CardOne from "../Card/CardOne";
import {useWindowDimensions} from "../Util/hooks";
import {makeStyles} from "@material-ui/core/styles";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import {BooksType, BookType} from "../types/types";

SwiperCore.use([Pagination, Navigation]);

const useStyles = makeStyles(() => ({
    swiper: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    }
}));

const Carousel: React.FC<BooksType>= ({books}) => {
    const classes = useStyles();
    let {cartOnView} = useWindowDimensions();
    return (
            <Swiper
                centerInsufficientSlides={true} slidesPerView={cartOnView} spaceBetween={2} slidesPerGroup={cartOnView}
                navigation={true}>
                {books && books.map((book: BookType )  =>
                    <SwiperSlide className={classes.swiper} key={book.id} >
                        <CardOne book={book}/>
                    </SwiperSlide>
                )}
            </Swiper>
    );
};

export default Carousel;