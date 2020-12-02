import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client';

import {AuthContext} from '../context/auth'
import {useForm} from '../util/hooks'

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmdPassword: ''
    })

    // const [values, setValues] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmdPassword: ''
    // })

    // const onChange = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value })
    // }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}) {
            // console.log('RESULT', result.data.register.userData)
            context.login(userData)
            props.history.push('/')
        },
        variables: values,
        onCompleted: (data) => console.log("Data from mutation reg", data),
        onError(err) {
            // console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })

    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     addUser()
    // }


    
    function registerUser() {
        addUser()
    }

    return (
        <div className="from-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                    label='Email'
                    placeholder='Email'
                    name='email'
                    type='email'
                    value={values.email}
                    error={errors.email ? true : false}
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
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    name='confirmdPassword'
                    type='password'
                    value={values.confirmdPassword}
                    error={errors.confirmdPassword ? true : false}
                    onChange={onChange}
                >
                </Form.Input>
                <Button type='submit' primary>
                    Register
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

const REGISTER_USER = gql`
mutation register(
    $username: String!, 
    $email: String!,
    $password: String!, 
    $confirmdPassword: String!)

{
    register(
        registerInput:{
            username:$username
            email:$email
            password:$password
            confirmdPassword:$confirmdPassword
  })
  {
    id
    email
    token
    username
    createdAt
  }
}
 `;

export default Register;

