import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserToRegister } from '../../types/user';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserToRegister>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<UserToRegister> = async (data) => {
        try {
            await axios.post('http://localhost:3001/auth/register', data);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('username', { required: true })} />
            <input type="text" {...register('email', { required: true })} />
            <input type="text" {...register('password', { required: true })} />
            <button>Register</button> <span>Do you have an acount? <Link to='/login'>Login</Link></span>
        </form>
    )
}

export default Register