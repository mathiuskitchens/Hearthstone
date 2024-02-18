import { Link } from "react-router-dom";

export default function Root() {
    return (
      <>
        Need to create a homepage that talks about the app in detail, like a landing page
        <p>For now, you can try <Link to={`browse`}> Browse</Link> and <Link to={`login`}>Login</Link>pages</p>
      </>
    );
  }