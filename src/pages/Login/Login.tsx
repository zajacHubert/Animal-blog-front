import React, { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserToLogin, UserToRegister } from '../../types/user';
import { AuthContext } from '../../context/AuthContext';
import styles from './Login.module.scss';


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
    const ctx = useContext(AuthContext);

    const onSubmit: SubmitHandler<UserToLogin> = async (data) => {
        try {
            await ctx?.login(data);
            navigate('/');
        } catch (err: any) {
            setErr(err.response.data);
        }
    }

    return (
        <div className={styles.log}>
            <h2 className={styles.title}></h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('username', { required: true, maxLength: 45 })} placeholder='username' />
                {errors.username && <p className={styles.err} >{errors.username?.message}</p>}
                <input type="text" {...register('password', { required: true, maxLength: 255 })} placeholder='password' />
                {errors.password && <p className={styles.err} >{errors.password?.message}</p>}
                <button>Login</button> <span>Don't have an acount? <Link to='/register'>Register</Link></span>
                {err && <p className={styles.err} >{err}</p>}
            </form>
        </div>
    )
}

export default Login