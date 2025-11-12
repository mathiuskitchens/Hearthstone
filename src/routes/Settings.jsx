import Navbar from "../components/Navbar"



const Settings = () => {

  const handleToggle = () => {
    console.log("toggled")
  }

  return (
    <>
      <Navbar />

      <div className="mt-24 flex flex-col items-center justify-center">
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Remember me</span>
            <input type="checkbox" className="toggle toggle-primary" onChange={handleToggle} />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Remember me</span>
            <input type="checkbox" className="toggle toggle-secondary" defaultChecked />
          </label>
        </div>
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text">Remember me</span>
            <input type="checkbox" className="toggle toggle-accent" onChange={handleToggle} />
          </label>
        </div>
      </div>
    </>
  )
}

export default Settings
