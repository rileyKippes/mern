'use strict';

class NavBarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
					isLoggedIn: false };
  }

  render() {
	if (this.state.isLoggedIn) {
		return( 
			<a> Welcome User! </a>
		);
	}

    return (
		<div>
	  	<a href="/u/"> User page </a>
		<a href="/p"> Portfolio </a>
		<a href="/"> Home </a>
		</div>
    );
  }
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
