import React, {useContext, useState} from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Button} from "@material-ui/core";
import {useMutation} from "@apollo/client";
import {LIKE_BOOK_MUTATION} from "../Util/graphql";
import {AuthContext} from "../Authorization/auth";

const LikeButton = ({bookId, likesCount}) => {
    const {user} = useContext(AuthContext);
    const [likes, setLikes] = useState(likesCount);
    const [likeBook] = useMutation(LIKE_BOOK_MUTATION, {
        update(proxy, result) {
            setLikes(result.data.likeBook.likesCount)
        },
        variables: {
            bookId: bookId
        }
    });

    return (
        user
            ?
            <Button onClick={likeBook}>
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