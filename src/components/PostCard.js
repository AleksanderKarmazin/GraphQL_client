import React, { useContext } from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

// + we need useContext hook 
import { AuthContext } from '../context/auth'
// + we need useContext hook 
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {


    // + we need extract user
    // const context = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    // + we need extract user

    //This means if we have a user 
    // {user && }
    // Если имя пользователя === имя создателя поста, то это значает что это автор поста
    //{user && user.username === username && }

    // function likePost(){
    //     console.log('Like Post')
    // }
    // function commentOnPost(){
    //     console.log('commentOnPost Post')
    // }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content="Comment on post">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard;