'use strict'

class RegisterUserClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<form action="/u/register/api" method="post">
				<p> Please use a unique login </p>
				<p> While I do salt and hash passwords, I am NOT touting myself a security expert. </p>
				<div className="form-group row" >
					<label className="col-sm-2 col-form-label" for="username">Username</label>
					<div className="col-sm-10">
						<input className="form-control" id="username" type="text" name="username" placeholder="Username" required />
					</div>
				</div>
				<div className="form-group row" >
					<label className="col-sm-2 col-form-label" for="password">Password</label>
					<div className="col-sm-10">
						<input className="form-control" id="password" type="password" name="password" placeholder="Password" required />
					</div>
				</div>
				<div className="form-group row" >
					<label className="col-sm-2 col-form-label" for="confirm_password">Confirm Password</label>
					<div className="col-sm-10">
						<input className="form-control" id="password" type="password" name="confirm_password" placeholder="Confirm Password" required />
					</div>
				</div>
				<input className="btn btn-primary"
					type="submit"
					value="Register" />
			</form>
		);
	}
}

let regUser = document.querySelector('#regUserContainer');
ReactDOM.render(<RegisterUserClass />, regUser);
