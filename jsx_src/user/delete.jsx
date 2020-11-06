'use strict'

class DeleteUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		var badUnfilled = (
			<div className="alert alert-danger alert-dismissible fade show">
				Please fill out all fields
				<button type="button" className="close" data-dismiss="alert">&times;</button>
			</div>);
		
		var badLogin = (
			<div className="alert alert-danger alert-dismissible fade show">
				Wrong username or password
				<button type="button" className="close" data-dismiss="alert">&times;</button>
			</div>);

		var badConfirm = (
			<div className="alert alert-danger alert-dismissible fade show">
				Delete confirmation must be exactly "Delete".
				<button type="button" className="close" data-dismiss="alert">&times;</button>
			</div>);
		
		return (
			<form id="login_box" className="px-3 mx-3" action="/u/delete/api" method="post">
				<h3> Are you sure you want to delete the account? </h3>

				<div className="form-group row" >
					<label className="col-2 col-form-label text-right" htmlFor="username">Username</label>
					<div className="col-10">
						<input className="form-control"
							id="username"
							type="text"
							name="username"
							placeholder="Username"
							value={this.state.username}
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
					<label className="col-2 col-form-label text-right" htmlFor="password">Type "Delete" to Confirm</label>
					<div className="col-10">
						<input className="form-control"
							id="confirm"
							type="text"
							name="confirm"
							placeholder="Delete"
							value={this.state.confirm}
							required />
					</div>
				</div>
				<div className="form-group row justify-content-center" >
					<input className="btn btn-primary col-6" type="submit" value="Delete Account" />
				</div>

			</form>
		);
	}
}

let delUser = document.querySelector('#deleteUserContainer');
ReactDOM.render(<DeleteUser />, delUser);
