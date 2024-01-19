import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  useEffect(() => {
    fetchListOfBlogs();

    // Set the current date and time when the component mounts
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      // Cleanup the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  function handleEdit(getCurrentBlogItem) {
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs! Please wait</h1>
      ) : (
        <div className={classes.blogContainer}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id} className={classes.blogCard}>
                <p className={classes.blogTitle}>{blogItem.title}</p>
                <p className={classes.blogDescription}>{blogItem.description}</p>
                
                {/* Display current date and time */}
                <h6>Date and Time: {currentDateTime.toLocaleString()}</h6>
                <div className={classes.blogActions}>
                  <FaEdit onClick={() => handleEdit(blogItem)} size={20} />
                  <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={20} />
                </div>
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
      
    </div>
  );
}
