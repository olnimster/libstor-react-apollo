import React, {useContext, useState} from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Button} from "@material-ui/core";
import {useMutation} from "@apollo/client";
import {LIKE_BOOK_MUTATION} from "../Util/graphql";
import {AuthContext} from "../Authorization/auth";



type propsType = {
    bookId: number
    likesCount: number
}

const LikeButton = ({bookId, likesCount}: propsType): JSX.Element => {
    const {user} = useContext(AuthContext);
    const [likes, setLikes] = useState(likesCount);
    const [likesActive, setLikesActive] = useState(false);

    const likeOn = () => {
        setLikesActive(true)
        likeBook();
    }
    const [likeBook, {loading}] = useMutation(LIKE_BOOK_MUTATION, {
        update(proxy, result) {
            setLikes(result.data.likeBook.likesCount)
            setLikesActive(loading);
        },
        variables: {
            bookId: bookId
        }
    })

    return (
        user
            ?
            <Button onClick={() => likeOn()} disabled={likesActive}>
                <FavoriteIcon style={{color: "red", fontSize: 16}}/>
                Likes: {likes}
            </Button>
            :
            <Button>
                <FavoriteIcon style={{color: "red", fontSize: 12}}/>
                Likes: {likes}
            </Button>
    );
};

export default LikeButton;