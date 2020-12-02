import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client';

// npm i apollo-link-context

import { useForm } from '../util/hooks'
import { FETCH_POSTS_QUERY } from '../util/GraphQL'


function PostForm() {

    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        body: '',
    })

//=============================================
// const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
  
//   variables: values,
  
//   refetchQueries: [
//     { 
//       query: FETCH_POSTS_QUERY, 
//       variables: { limit: 5 } 
      
//     }
//   ] ,
//   update(_, result) {
//           values.body = '';
//           console.log('RESULT_OF_CREATING_POST', result)
//         },
  

//   onCompleted: (data) => console.log("Data from mutation post creation", data),
// });
//=============================================








//WHAT THE HELL  IS GOING ON !?
// in Apollo client cach is read only, so to change cach we need to make a copy before 

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          });
    
          let newData = [...data.getPosts];
          newData = [result.data.createPost, ...newData];
          proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: {
              ...data,
              getPosts: {
                newData,
              },
            },
          });
          values.body = '';
          console.log('RESULT_OF_CREATING_POST', result)
        },
        onCompleted: (data) => console.log("Data from mutation post creation", data),
      });









//WHAT THE HELL  IS GOING ON !?

// in Apollo client cach is read only, so to change cach we need to make a copy before 

// Query EXAMPLE 

// const { data, client } = useQuery(GET_GROUPS);
// const onSkillSelect = id => {
//   setSkill({ variables: { id, skills: props.skills } });
// };

// const toggleSwitch = () => {
//   const newDataGroups = [...data.dataGroups];
//   newDataGroups[props.id] = { ...newDataGroups[props.id], isSkillsDisabled: false };
//   const newData = { ...data, dataGroups: newDataGroups };
//   client.writeData({ data: newData });
// }
   


    function createPostCallback() {
        createPost()
    }


    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2> Create a post: </h2>
            <Form.Field>
                <Form.Input
                    placeholder='Hi world app'
                    name='body'
                    onChange={onChange}
                    value={values.body}
                    error = { error ? true : false}
                />
                <Button type='submit' color='purple'>Submit</Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom: 20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost(
    $body: String!, 
)

{
    createPost(body:$body)
  {
    id
    body
    createdAt
    username
    likes{
      id
      createdAt
      username
    }
    likeCount
    commentCount
    comments{
      id
      createdAt
      body
      username
    }
  }
}
 `;


export default PostForm;