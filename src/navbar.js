'use strict';

class NavBarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginBtnClicked:false,
					isLoggedIn: false };
  }

  render() {
	if (this.state.isLoggedIn) {
		return( 
			<a> Welcome User! </a>
		);
	}
    if (this.state.loginBtnClicked) {
      return (
		<form id="login_box" class="vert_list" action="/login" method="post">
			<p> Please use a terrible login </p>
			<p> I am one man, and I am NOT touting myself a security expert. </p>
			<div>
				<label>Username:</label> 
				<input id="username" type="text" name="username"/>
			</div>
			<div>			
				<label>Password:</label>
				<input id="password" type="password" name="password"/>
			</div>
			<input type="submit" value="Log In"/>
		</form>
		);
    }

    return (                  
      <button onClick={() => this.setState({ loginBtnClicked: true }) }>
        Login
      </button>
    );
  }
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
