import React, {useContext, useState} from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles, TextField} from "@material-ui/core";
import {useMutation} from "@apollo/client";
import {BOOK_QUERY, CREATE_COMMENT_MUTATION} from "../Util/graphql";
import {AuthContext} from "../Authorization/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    }
}));

type propsType = {
    bookId: string
}

const CommentCreator = ({bookId}: propsType): JSX.Element => {

    const {user} = useContext(AuthContext);

    const [comment, setComment] = useState('');
    const [submitComment]: any = useMutation(CREATE_COMMENT_MUTATION, {
        update(proxy, result) {
            setComment('');
            const cacheData = proxy.readQuery({
                query: BOOK_QUERY, variables: {id: bookId}
            });
            let data = JSON.parse(JSON.stringify(cacheData)) //Copy object 'cacheData'
            data.getBook.comments = result.data.createComment.comments;// Add new comment
            proxy.writeQuery({query: BOOK_QUERY, data});
        },
        variables: {
            bookId: bookId,
            body: comment
        }
    });

    const classes = useStyles();

    return (
        <div>{user &&
        (<div>
            <Button
                variant="outlined"
                type="submit"
                onClick={submitComment}
                disabled={comment.trim() === ''}
            >Add comment
            </Button>
            <div className={classes.root}>
                <TextField
                    id="standard-full-width"
                    label="your comment..."
                    placeholder=""
                    fullWidth
                    margin="normal"
                    multiline
                    variant="outlined"
                    name="comment"
                    value={comment}
                    onChange={(event) =>
                        setComment(event.target.value)}
                />
            </div>
        </div>)
        }

        </div>
    );
};

export default CommentCreator;