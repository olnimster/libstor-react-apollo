import React, {useContext} from 'react';
import moment from 'moment';
import {Avatar, Grid, Paper} from "@material-ui/core";
import "./comment.module.css";
import DeleteCommentButton from "./DeleteCommentButton";
import {AuthContext} from "../Authorization/auth";
import avatarImg from "../../assets/avatar-default-1.png"
import {IMGPATH} from "../Util/config"


function Comment({comm, bookId}) {
    const {user} = useContext(AuthContext);

    let avatar = avatarImg;
    if(comm.avatar){
        avatar = `${IMGPATH}${comm.avatar}`
    }
    let publicName = 'anonim';
    if (comm.publicName) {publicName = comm.publicName}
    return (
        <div style={{padding: 14}} className="App">
            <Paper style={{padding: "15px 20px"}}>
                <Grid container wrap="nowrap" spacing={2} >
                        <Grid item >
                            <Avatar alt={publicName} src={avatar}/>
                        </Grid>
                    <Grid justifyContent="flex-start" container >
                        <h4 style={{margin: 0, textAlign: "left"}}>{publicName}</h4>
                        <p style={{textAlign: "left"}}>
                            {comm.body}
                        </p>
                    </Grid>
                    <Grid item >
                        {user && user.id === comm.user && (
                            <DeleteCommentButton commentId={comm.id} bookId={bookId}/>
                        )}
                    </Grid>
                </Grid>
                <div style={{textAlign: "left", color: "gray"}}>
                    {moment(comm.createdAt).fromNow(true)}
                </div>

            </Paper>
        </div>
    );
}

export default Comment;