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
		<form id="login_box" className="vert_list" action="/login" method="post">
			<p className="list_item" > Please use a terrible login </p>
			<p className="list_item" > I am one man, and I am NOT touting myself a security expert. </p>
			<div className="list_item" >
				<label>Username:</label> 
				<input id="username" type="text" name="username"/>
			</div>
			<div className="list_item" >			
				<label>Password:</label>
				<input id="password" type="password" name="password"/>
			</div>
			<input 	className="list_item"
					type="submit" 
					value="Log In"/>
		</form>
		);
    }

    return (                  
      <div> 
		<button onClick={() => this.setState({ loginBtnClicked: true }) }>
        Login
      </button>
	  <a href="/u/"> User page </a>
		</div>
    );
  }
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
