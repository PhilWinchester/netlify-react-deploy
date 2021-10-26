import axios from "axios";

import { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";

import BlogPost from "./components/BlogPost.js";
import Form from "./components/Form.js";

const API_URL = `https://api.airtable.com/v0/appTlifz4bcguCnQH/Table%201?api_key=${process.env.REACT_APP_API_KEY}`;


function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(true);

  useEffect(() => {
    console.log('Getting Blog Posts');

    const getBlogPosts = async () => {
      const resp = await axios.get(API_URL);
      console.log(resp.data);
      setBlogPosts(resp.data.records);
    }

    getBlogPosts();
  }, [toggleFetch]);

  return (
    <div>
      <nav>
          <Link to="/">Home</Link>
          <Link to="/newpost">Make a Blog Post</Link>
      </nav>
      <hr />

      <Route path="/" exact>
        {blogPosts.map((blogPost) => (
          <BlogPost 
            key={blogPost.id}
            postData={blogPost}
            toggleFetch={toggleFetch}
            setToggleFetch={setToggleFetch}
          />
        ))}
      </Route>

      <Route path="/newpost">
        <Form 
          formType={'post'}
          toggleFetch={toggleFetch}
          setToggleFetch={setToggleFetch}
        />
      </Route>

      <Route path="/edit/:blog_id">
        <Form
          formType={'put'}
          toggleFetch={toggleFetch}
          setToggleFetch={setToggleFetch}
        />
      </Route>
    </div>
  );
}

export default App;
