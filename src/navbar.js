'use strict';

class NavBarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
		<div id="navbar">
			Welcome, Master Wayne
		</div>);
    }

    return (
      <button onClick={() => this.setState({ isLoggedIn: true }) }>
        Login
      </button>
    );
  }
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
