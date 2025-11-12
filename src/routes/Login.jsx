import hearthstone_logo from "../images/hearthstone_logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Login attempt:', { email, password });
    // TODO: Implement actual authentication
  };

  return (
    <div className="hero min-h-screen w-screen bg-base-200">
      <div className="hero min-h-screen w-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center ">
            <img
              src={hearthstone_logo}
              alt="hearthstone"
              className=" w-1/2 mx-auto"
            />
            <h1 className="text-5xl font-bold bg-base">
              Start Building Decks!
            </h1>
            <p className="py-6">
              Login today and start managing your Hearthstone Collection. Follow
              us on social media for updates.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <Link className="btn btn-primary text-white" to={`../browse`}>Login</Link>
              </div>
              <Link to={`../browse`}>
                <button className="btn bg-amber-400 text-white hover:bg-amber-500 w-full">
                  Browse without an account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
