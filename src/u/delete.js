'use strict'

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
	render(){
		return(
		<form id="login_box" className="vert_list" action="login" method="post">
			<h3> Are you sure you want to delete the account? </h3>
			<label>Username:</label>
			<input className="login" id="username" type="text" name="username"/>
			<label>Password:</label>
			<input className="login" id="password" type="password" name="password"/>
			<label>Type "Delete" to Confirm</label>
			<input className="login" id="confirm" type="text" name="confirm" placeholder="Delete"/>
			<input className="login" type="submit" value="Delete Account"/>
		</form>
		);
	}
}

let delUser = document.querySelector('#deleteUserContainer');
ReactDOM.render(<DeleteUser />, delUser);
