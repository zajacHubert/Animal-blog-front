import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../../types/post';
import styles from './Home.module.scss';

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const cat = useLocation().search;

    useEffect(() => {
        (async () => {
            const res = await axios.get(`http://localhost:3001/post${cat}`);
            setPosts(res.data)
        })()
    }, [cat]);

    return (
        <div className={styles.home}>
            {posts.map((post: Post) => (

                <div key={post.id} className={styles.content}>
                    <div className={styles.post}>
                        <Link to={`/single/${post.id}`}>
                            <h2 className={styles.title}>{post.title}</h2>
                        </Link>
                        <p className={styles.desc}>{post.desc}</p>
                        <p>Posted {moment(post.date).fromNow()}</p>
                        <Link className={styles.btn} to={`/single/${post.id}`}>Read more</Link>
                    </div>
                    <div className={styles.img}>
                        <img src={post.img} alt="" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home

