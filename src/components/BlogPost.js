/*
Needabutton
makeanaxioscall
need to know the id
*/

import axios from "axios";

import { Link } from "react-router-dom";


const API_URL = 'https://api.airtable.com/v0/appTlifz4bcguCnQH/Table%201?api_key='


const BlogPost = ({ postData, toggleFetch, setToggleFetch }) => {
    const deleteBlogPost = async () => {
        await axios.delete(API_URL + `&records[]=${postData.id}`);

        setToggleFetch(!toggleFetch);
    };

    return (
        <div>
            <h4>Title: {postData.fields.title}</h4>
            <p>{postData.fields.text}</p>
            <em>Author: {postData.fields.author}</em>

            <button onClick={deleteBlogPost}>Delete</button>
            <Link to={`/edit/${postData.id}`}>Edit Post</Link>
        </div>
    )
}

export default BlogPost;
