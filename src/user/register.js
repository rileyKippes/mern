'use strict'

class RegisterUserClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		return( 
			<form className="vert_list" action="/u/register/api" method="post">
			<p className="list_item" > Please use a unique login </p>
			<p className="list_item" > While I do salt and hash passwords, I am NOT touting myself a security expert. </p>
			<div className="list_item" >
				<label>Username:</label> 
				<input id="username" type="text" name="username" required/>
			</div>
			<div className="list_item" >			
				<label>Password:</label>
				<input id="password" type="password" name="password" required/>
			</div>
			<div className="list_item" >			
				<label>Confirm Password:</label>
				<input id="password" type="password" name="confirm_password" required/>
			</div>
			<div className="list_item" >
			<input 	className="list_item"
					type="submit" 
					value="Register"/>
			</div>
			</form>
		);	
	}
}

let regUser = document.querySelector('#regUserContainer');
ReactDOM.render(<RegisterUserClass />, regUser);
