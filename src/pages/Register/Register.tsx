import axios from 'axios';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserToRegister } from '../../types/user';
import styles from './Register.module.scss';

const schema = yup.object({
    username: yup.string().required().max(10),
    email: yup.string().required().max(255),
    password: yup.string().required().max(255),
}).required();

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserToRegister>({
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const [err, setErr] = useState('');

    const onSubmit: SubmitHandler<UserToRegister> = async (data) => {
        try {
            await axios.post('http://localhost:3001/auth/register', data);
            navigate('/login');
        } catch (err: any) {
            setErr(err.response.data);
        }
    }

    return (
        <div className={styles.log}>
            <h2 className={styles.title}>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('username', { required: true, maxLength: 45 })} />
                {errors.username && <p className={styles.err}>{errors.username?.message}</p>}
                <input type="text" {...register('email', { required: true, maxLength: 255 })} />
                {errors.email && <p className={styles.err}>{errors.email?.message}</p>}
                <input type="text" {...register('password', { required: true, maxLength: 255 })} />
                {errors.password && <p className={styles.err}>{errors.password?.message}</p>}
                <button>Register</button> <span>Do you have an acount? <Link to='/login'>Login</Link></span>
                {err && <p className={styles.err}>{err}</p>}
            </form>
        </div>
    )
}

export default Register