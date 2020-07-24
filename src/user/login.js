'use strict'

class LoginUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render(){
		
		var form = <form id="login_box" className="vert_list" action="/u/login" method="post">
			<h3> Please use a terrible login, usr: "Hello" |pwd: "World" works </h3>
			<label>Username:</label>
			<input className="login" id="username" type="text" name="username"/>
			<label>Password:</label>
			<input className="login" id="password" type="password" name="password"/>
			<input type="submit" value="Log In"/>
			</form>
		if(window.location.search.search("loginFail") != -1){
			var failMessage = ( <div id="errorMessage"> Failure to login </div> );
			return(
				<div>
					{failMessage}
					{form}
				</div>
		);
		}
		return(
			<div>
				{form}
			</div>
		);
	}
}

let logUser = document.querySelector('#loginUserContainer');
ReactDOM.render(<LoginUser />, logUser);
