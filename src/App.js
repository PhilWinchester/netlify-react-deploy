/*
We want a simple blog app.

We need some sort of form/inputs for people to make a blog post
  - separate component?
useEffect to GET our blogPosts, load them into state, and render on page
  - add toggleFetch?
Separate form (or button on same form) to update a blog post (ie PUT)
Some button on each Blog component that issues our DELETE request

Components:
  - App
    - GET
    - render other components
  - BlogPost
    - DELETE
  - Form 
    - POST
    - PUT?

State:
  - author
  - title
  - text
  - blogPosts
  - toggleFetch


Router Refactor:
  - '/' = home route
    - Display our data
  - '/newpost' = make a new blog post
    - Display our form for the POST method
  - '/edit/:blog_id' = update a blog post
    - Display our form for the PUT method

  ^ This requires us to split the <form> into a component
*/
import axios from "axios";

import { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";

import BlogPost from "./components/BlogPost.js";
import Form from "./components/Form.js";

const API_URL = 'https://api.airtable.com/v0/appTlifz4bcguCnQH/Table%201?api_key='


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
      {/* 
        Define our Routes for Router:
          - '/' = home route
            - Display our data
          - '/newpost' = make a new blog post
            - Display our form for the POST method
          - '/edit/:blog_id' = update a blog post
            - Display our form for the PUT method
      */}

      <Route path="/" exact>
        {/* {setToggleFetch(!toggleFetch)} */}
        {blogPosts.map((blogPost) => (
          /*
            We want the BlogPost component to have some data in it.
            The left side of the = is the name (ie key) we want the variable to have
            the right side of = is the value of the variable for the component
              right side is what exists in App.js
            {
              key: blogPost.id,
              postData: blogPost,
              toggleFetch: toggleFetch,
              setToggleFetch: setToggleFetch,
            }
          */
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
