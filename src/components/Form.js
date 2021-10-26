import axios from "axios";

import { useState } from 'react';
import { Redirect, useParams } from "react-router-dom";

const API_URL = 'https://api.airtable.com/v0/appTlifz4bcguCnQH/Table%201?api_key='

/*
To get data pre-populated into the form for PUT requets we would
    need to write another GET request and filter using the id from
    the url. Not the easiest workaround but the simplest way we 
    could accomplish this given the Airtable API.

    1. Get all blog post data from Airtable
    2. blog data .find matching our param to the full set.
*/

const Form = ({ formType, toggleFetch, setToggleFetch }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [redirectHome, setRedirectHome] = useState(false);
    const params = useParams();

    const handlePostRequest = async (ev) => {
        ev.preventDefault();
    
        /* Copied from Postman. Airtable requires a specific format
            for our requests. Make sure our POST matches
          {
              "records": [
                  {
                      "fields": {
                          "title": "Test Title 2",
                          "text": "Test Text 2",
                          "author": "Phil"
                      }
                  }
              ]
          }
        */
        const newBlogPost = {
          records: [
            {
              fields: {
                title,
                text,
                author
              }
            }
          ]
        }
    
        await axios.post(API_URL, newBlogPost);
        
        setRedirectHome(true);
        setToggleFetch(!toggleFetch);
    }

    const handlePutRequest = async (ev) => {
        ev.preventDefault();
        const blog_id = params.blog_id;

        const updatedPostData = {
            records: [
              {
                id: blog_id,
                fields: {
                  title,
                  text,
                  author
                }
              }
            ]
        }
        await axios.put(API_URL, updatedPostData);
    
        setRedirectHome(true);
        setToggleFetch(!toggleFetch);
    }

    if (redirectHome) {
        return <Redirect to="/"/>
    }

    return (
        <div>
            {/* determine which type of request will happen */}
            <form onSubmit={formType === 'post' ? handlePostRequest : handlePutRequest}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" onChange={(ev) => setTitle(ev.target.value)}/>

                <label htmlFor="text">Text: </label>
                <input type="text" id="text" onChange={(ev) => setText(ev.target.value)}/>

                <label htmlFor="author">Author: </label>
                <input type="text" id="author" onChange={(ev) => setAuthor(ev.target.value)}/>

                <input type="submit" />
            </form>
        </div>
    )
}

export default Form;
