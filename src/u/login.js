'use strict'

class LoginUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
	render(){
		return(
		<form id="login_box" class="vert_list" action="login" method="post">
			<h3> Please use a terrible login, anything should work! </h3>
			<label>Username:</label>
			<input class="login" id="username" type="text" name="username"/>
			<label>Password:</label>
			<input class="login" id="password" type="password" name="password"/>
			<input type="submit" value="Log In"/>
		</form>
		);
	}
}

let logUser = document.querySelector('#loginUserContainer');
ReactDOM.render(<LoginUser />, logUser);
