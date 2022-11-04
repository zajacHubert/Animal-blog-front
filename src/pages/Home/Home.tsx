import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../../types/post'

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
        <div>
            {posts.map((post: Post) => (
                <div key={post.id}>
                    <div>
                        <Link to={`/single/${post.id}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <p>{post.desc}</p>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    <div>
                        <img src={post.img} alt="" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home