import axios from 'axios';
import moment from 'moment';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState<File | null>(null);
    const [cat, setCat] = useState(state?.cat || '');
    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file!);
            const res = await axios.post('/upload', formData);
            return res.data;
        } catch (err) { }
    }

    const saveProject = async (e: FormEvent) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state ? await axios.patch(`/posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: file ? imgUrl : ''
            }) : await axios.post('/posts', {
                title,
                desc: value,
                cat,
                img: file ? imgUrl : '',
                date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            })
            navigate('/')
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder='title'
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <div className="editorContainer">
                    <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input
                        style={{ display: 'none' }}
                        type="file" id="file"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile((e.currentTarget.files as FileList)[0])}
                    />
                    <label className='file' htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={saveProject}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "cats"}
                            name="cat"
                            value="cats"
                            id="cats"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cats">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "dogs"}
                            name="cat"
                            value="dogs"
                            id="dogs"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="dogs">Science</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write