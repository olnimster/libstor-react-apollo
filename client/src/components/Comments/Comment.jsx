import React, {useContext} from 'react';
import moment from 'moment';
import {Avatar, Grid, Paper} from "@material-ui/core";
import DeleteCommentButton from "./DeleteCommentButton";
import {AuthContext} from "../Authorization/auth";
import avatarImg from "../../assets/avatar-default-1.png"
import {IMGPATH} from "../Util/config"
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    commentWrap: {
        padding: 8
    },
    comment: {
        padding: "15px 20px"
    },
    text: {
        padding: 10
    }
}));

function Comment({comm, bookId}) {
    const {user} = useContext(AuthContext);
    const classes = useStyles();
    let avatar = avatarImg;
    if(comm.avatar){
        avatar = `${IMGPATH}${comm.avatar}`
    }
    let publicName = 'anonim';
    if (comm.publicName) {publicName = comm.publicName}
    let isAutorComment = user && user.id === comm.user;

    return (
        <div className={classes.commentWrap}>
            <Paper className={classes.comment}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt={publicName} src={avatar}/>
                    </Grid>
                    <Grid justifyContent="flex-start" container>
                        <Typography variant="caption">
                            {publicName}
                        </Typography>
                        <Grid container>
                            <Typography variant="body1" className={classes.text}>
                                {comm.body}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {isAutorComment &&
                        <DeleteCommentButton commentId={comm.id} bookId={bookId}/>
                        }
                    </Grid>
                </Grid>
                <Typography variant="caption">
                    {moment(comm.createdAt).fromNow(true)}
                </Typography>
            </Paper>
        </div>
    );
}

export default Comment;