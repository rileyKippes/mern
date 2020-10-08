'use strict'

class LoginUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		var form = (
			<form id="login_box" className="mx-3 px-3" action="/u/login" method="post">
				<h3 className="text-center"> Please use a terrible login, username "Hello" with the password "World" works </h3>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label text-right" htmlFor="username">Username</label>
					<div className="col-sm-10">
						<input className="form-control" id="username" type="text" name="username" placeholder="Username" required />
					</div>
				</div>
				<div className="form-group row ">
					<label className="col-sm-2 col-form-label text-right" htmlFor="password">Password</label>
					<div className="col-sm-10">
						<input className="form-control" id="password" type="password" name="password" placeholder="Password" required />
					</div>
				</div>
				<div className="form-group row justify-content-center">
					<input className="btn btn-primary col-5" type="submit" value="Sign In" />
				</div>
				<p className="text-center"> If you don't have an account, you can register <a href="/u/register"> here </a></p>
			</form>
		);
		if (window.location.search.search("loginFail") != -1) {
			var failMessage = (
				<div className="alert alert-danger alert-dismissible fade show" id="errorMessage" role="alert">
					Wrong username or password
					<button type="button" className="close" data-dismiss="alert">&times;</button>
				</div>);
			return (
				<div>
					{failMessage}
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

let logUser = document.querySelector('#loginUserContainer');
ReactDOM.render(<LoginUser />, logUser);