'use strict'

class UserIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn:false };
		this.getProfile();
	}

	getProfile(){
		fetch('/u/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJSON) => {
			if(myJSON.status === 401){
				this.state.isLoggedIn = false;
			}
			else {
				this.setState({ isLoggedIn:true, data:myJSON});
			}
		  });
	}

	render(){
		var links = ( <div className="vert_list"> 
			<a href="/u/register" className="list_item" > Register </a>
			<a href="/u/login"className="list_item"  > Log In </a> </div> );
		if(this.state.isLoggedIn){
			var links = ( <div className="vert_list">
				<a href="/u/profile" className="list_item" > Profile </a>
				<a href="/u/logout"className="list_item"  > Log Out </a>
				<a href="/u/delete" className="list_item"  > Delete Account </a> </div> );
		}
		return(
			<div>
				{ links }
			</div>
		);
	}
}


let UserDiv = document.querySelector('#userContainer');
ReactDOM.render(<UserIndex />, UserDiv);
