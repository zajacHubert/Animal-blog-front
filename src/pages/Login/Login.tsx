import React, { useState } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserToLogin, UserToRegister } from '../../types/user';

const schema = yup.object({
    username: yup.string().required().max(10),
    password: yup.string().required().max(255),
}).required();

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserToRegister>({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [err, setErr] = useState('');



    const onSubmit: SubmitHandler<UserToLogin> = async (data) => {
        try {
            await axios.post('http://localhost:3001/auth/login', data);
            navigate('/');
        } catch (err: any) {
            setErr(err.response.data);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('username', { required: true, maxLength: 45 })} />
            {errors.username && <p>{errors.username?.message}</p>}
            <input type="text" {...register('password', { required: true, maxLength: 255 })} />
            {errors.password && <p>{errors.password?.message}</p>}
            <button>Login</button> <span>Don't have an acount? <Link to='/register'>Register</Link></span>
            {err && <p>{err}</p>}
        </form>
    )
}

export default Login