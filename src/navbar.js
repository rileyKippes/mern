'use strict';
//to enable user pages,
// <a href="/u/"> User page </a>
class NavBarClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
		<div>
		<a href="/"> Home </a>
		<a href="/p"> Portfolio </a>
		</div>
    );
  }
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
