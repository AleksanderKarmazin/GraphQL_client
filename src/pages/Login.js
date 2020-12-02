import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'

import {AuthContext} from '../context/auth'
import {useForm} from '../util/hooks'



 function Login(props) {
    const context = useContext(AuthContext)
    
    const [errors, setErrors] = useState({})

    // const [values, setValues] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmdPassword: ''
    // })

    // const onChange = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value })
    // }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        // email: '',
        password: '',
        // confirmdPassword: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log('RESULT',result.data.login)
            context.login(result.data.login)
            props.history.push('/')
        },
        variables: values,
        onCompleted: (data) => console.log("Data from mutation", data),
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })

    function loginUserCallback() {
        loginUser()
    }

    
    
    return (
        <div className="from-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username'
                    name='username'
                    type='text'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                >
                </Form.Input>
                <Form.Input
                    label='Password'
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                >
                </Form.Input>
                <Button type='submit' primary>
                    Login
            </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value =>(
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const LOGIN_USER = gql`
mutation login($username: String!, $password: String!){
    login(username:$username,password:$password ){
        id
        email
        token
        username
        createdAt
  }
}
 `;

export default Login; 