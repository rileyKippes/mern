'use strict'

class registerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
	render(){
		<div> Register User </div>	
	}
}

let regUser = document.querySelector('#regUserContainer');
ReactDOM.render(<registerUser />, regUser);
