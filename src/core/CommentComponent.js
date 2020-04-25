import React, {useState, useEffect} from 'react';
import {Button, Comment, Form, Header} from 'semantic-ui-react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {isAuthenticate} from "../auth";
import {addComment} from './apiCore';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import CircularProgress from "@material-ui/core/CircularProgress"; // Import css
import Avatar from 'react-avatar';

const CommentComponent = (props) => {

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState(null);
    const [allComments, setAllComments] = useState([]);
    dayjs.extend(relativeTime);

    useEffect(() => {
        setAllComments(props.comments);
    }, []);

    const fetchComments = () => {
        let renderData = [];
        if (allComments.length > 0) {
            allComments.forEach((comment, index) => {
                renderData.push(<Comment key={index}>
                    {/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>*/}
                    <Comment.Avatar src={<Avatar name={comment.user.name} size="35"/>}/>
                    {/*<Avatar name={comment.user.name} size="40"/>*/}
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                        <Comment.Metadata>
                            <div>{dayjs(comment.addedOn).fromNow()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.comment}</Comment.Text>
                    </Comment.Content>
                </Comment>);
            });

            return renderData.length > 0 ? renderData : null;
        }
    };

    const submitComment = () => {
        setLoading(true);
        const {token, user} = isAuthenticate();
        console.log(comment);
        if (comment) {
            const comments = {
                comments : {
                    "user": user._id,
                    "comment": comment
                }
            };

            addComment(user._id, token, props.product._id, comments).then(data => {

                if (data.error) {
                    console.log(data.error);
                }else{
                    setComment('');
                    setComment(null);
                    const newComment = {
                        comment: comment,
                        addedOn: data.comments.addedOn,
                        user: {
                            "name" : user.name
                        }
                    };
                    let allNewComments = [...allComments];
                    allNewComments.push(newComment);

                    setAllComments(allNewComments);
                    setLoading(false);
                }
            });
        }else{
            confirmAlert({
                title: 'Please add comment before submitting',
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        let value = event.target.value;
        setComment(value);
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            {!fetchComments() ? <div className="alert alert-info alert-dismissible fade show" role="alert">
                <strong>Be the first to add a comment!</strong>
            </div> : ''}
            {fetchComments()}
            {
                isAuthenticate() ? <Form reply>
                    <Form.TextArea onChange={handleChange} value={comment}/>
                    <Button onClick={submitComment} disabled={loading} content={loading ? <CircularProgress size={20}/> : 'Add Comment'} labelPosition='left' icon='edit' primary/>
                </Form> : <div className="alert alert-info alert-dismissible fade show mt-5 mb-5" role="alert">
                    <strong>Please login to add a comment!</strong>
                </div>

            }

        </Comment.Group>
    );
}

export default CommentComponent;
