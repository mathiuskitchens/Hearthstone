import hearthstone_logo from '../images/hearthstone_logo.png'

const Login = () => {
    return (
        <>
     
            <div className="hero min-h-screen w-screen bg-base-200">
        
    <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center ">
                    <img src={hearthstone_logo} alt="hearthstone" className=" w-1/2 mx-auto" />
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">Login today and start managing your Hearthstone Collection. Follow us on social media for updates.</p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
            </div>
            </>
  )
}

export default Login