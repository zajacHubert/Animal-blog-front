import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FetchedSinglePost } from '../../types/post';
import styles from './Single.module.scss';
import Edit from '../../img/edit.png';
import Delete from '../../img/delete.png';

const Single = () => {
    const [post, setPost] = useState<FetchedSinglePost>();
    const ctx = useContext(AuthContext);
    const { id: postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:3001/post/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        })()
    }, [postId]);

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:3001/post/${postId}`);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className={styles.content}>
                <h2 className={styles.title}>{post?.title}</h2>
                <div className={styles.main}>
                    <div className={styles.img}>
                        <img src={post?.img} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <p>{post?.desc}</p>
                    </div>
                </div>

                <div className={styles.user}>
                    <div className={styles.info}>
                        <span>Author <span className={styles.author}>{post?.username},</span> posted {moment(post?.date).fromNow()}</span>
                    </div>
                    {ctx?.currentUser?.username === post?.username && <div className="edit">
                        <Link to='/write?edit=2' state={post}>
                            <img className={styles.icon} src={Edit} alt="" />
                        </Link>
                        <img className={styles.icon} onClick={deletePost} src={Delete} alt="" />
                    </div>}
                </div>

            </div>

        </div>
    )
}

export default Single