import { Link } from "react-router-dom";
import classes from "./styles.module.css";

export default function Header() {
  return (
    <div className={classes.header}>
      <h3>Mern Blog App</h3>
      <div>
        <Link to={"/"}>
          <button className={classes.button}>Home</button>
        </Link>
        <Link to={"/add-blog"}>
          <button className={classes.button}>Add Blog</button>
        </Link>
      </div>
    </div>
  );
}
