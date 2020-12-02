import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
// import { useQuery, gql } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm';

import { FETCH_POSTS_QUERY } from '../util/GraphQL'


function Home() {
    const { user } = useContext(AuthContext)
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data) {
        console.log(data.getPosts)
    }
    const posts = data.getPosts

    return (
        <div>
            <h1 className='page-title'>Home</h1>
            <Grid columns={3} divided>
                <Grid.Row className='page-title'>
                    <h1>Recent posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (
                        <Grid.Column>
                            <PostForm></PostForm>
                        </Grid.Column>
                    )}
                    {loading ? (
                        <h1>Loading posts ... </h1>

                    ) : (<Transition.Group
                        // as={List}
                        duration={3000}
                        divided
                        size='huge'
                        verticalAlign='middle'


                    >
                        {posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                        )}
                </Grid.Row>
            </Grid>
        </div>
    )
}


// const FETCH_POSTS_QUERY = gql`
// query{
//   getPosts{
//     id
//     body
//     createdAt
//     username
//     likeCount
//     commentCount
//     comments{
//       id
//       createdAt
//       body
//       username
//     }
//     likes{
//       id
//       createdAt
//       username
//     }
//   }
// }
// `;

export default Home;