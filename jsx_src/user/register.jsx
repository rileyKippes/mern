'use strict'

class RegisterUserClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const form = (
			<form action="/u/register/api" method="post" className="mx-3 px-3">
				<p className="text-center"> Please use a unique login </p>
				<p className="text-center"> While I do salt and hash passwords, I am NOT touting myself a security expert. </p>
				<div className="form-group row" >
					<label className="col-2 col-form-label text-right" htmlFor="username">Username</label>
					<div className="col-10">
						<input className="form-control"
							id="username"
							type="text"
							name="username"
							placeholder="Username"
							required />
					</div>
				</div>
				<div className="form-group row" >
					<label className="col-2 col-form-label text-right" htmlFor="password">Password</label>
					<div className="col-10">
						<input className="form-control"
							id="password"
							type="password"
							name="password"
							placeholder="Password"
							value={this.state.password}
							required />
					</div>
				</div>
				<div className="form-group row" >
					<label className="col-2 col-form-label text-right" htmlFor="confirm_password">Confirm Password</label>
					<div className="col-10">
						<input className="form-control"
							id="password"
							type="password"
							name="confirm_password"
							placeholder="Confirm Password"
							value={this.state.confirm_password}
							required />
					</div>
				</div>
				<div className="form-group row justify-content-center">
					<input className="btn btn-primary col-6 "
						type="submit"
						value="Register" />
				</div>
				<p className="text-center"> If you already have an account, then you can login <a href="/u/login"> here </a></p>
			</form>
		);

		const passwordsEqualityMessage = (
			<div className="alert alert-danger alert-dismissible fade show">
				Passwords must be the same
				<button type="button" className="close" data-dismiss="alert">&times;</button>
			</div>);

		const userExistsMessage = (
			<div className="alert alert-danger alert-dismissible fade show">
				User already exists. Did you want to <a href="/u/login"> login? </a>
				<button type="button" className="close" data-dismiss="alert">&times;</button>
			</div>);

		const unknownErrorMessage = (
			<div className="alert alert-danger alert-dismissible fade show">
				An unknown error occured. Try again, or if that doesn't work, contact the site creator.
				<button type="button" className="close" data-dismiss="alert">&times;</button>
			</div>);
		
		//if-else chain
		//we're yandere sim dev now /*joke, no one is as bad as yandere dev, I swear the man is trolling via code*/
		//at least it's not goto
		if (window.location.search.search("password_equality") != -1) {
			return (
				<div>
					{passwordsEqualityMessage}
					{form}
				</div>
			);
		}
		else if (window.location.search.search("user_already_exists") != -1) {
			return (
				<div>
					{userExistsMessage}
					{form}
				</div>
			);

		}
		else if (window.location.search.search("unknown_error") != -1) {
			return (
				<div>
					{unknownErrorMessage}
					{form}
				</div>
			);

		}
		return (
			<div>
				{form}
			</div>
		);
	}
}

let regUser = document.querySelector('#regUserContainer');
ReactDOM.render(<RegisterUserClass />, regUser);