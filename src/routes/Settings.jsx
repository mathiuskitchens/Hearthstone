import Navbar from "../components/Navbar"

const Settings = () => {

	return (
		<>
			<Navbar />

			<div className="flex flex-col mt-24">
				<div className="form-control w-52">
					<label className="label cursor-pointer">
						<span className="label-text">Remember me</span>
						<input type="checkbox" className="toggle toggle-primary" defaultChecked />
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
						<input type="checkbox" className="toggle toggle-accent" defaultChecked />
					</label>
				</div>
			</div>
		</>
	)
}

export default Settings
