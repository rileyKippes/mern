class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data:{}};
		this.getProfile();
	}

	getProfile(){
		fetch('/u/profile/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJSON) => {
			this.setState({ data:myJSON});
		  });
	}


	randomizeColor(){
		fetch('/u/profile/api',  {
			  method: 'POST'}
			)
		  .then((response) => {
			return response.json();
		  })
		  .then((myJSON) => {
			this.setState({ data:myJSON});
		  });
	}

	render(){
		var style = {backgroundColor:this.state.data.color};
		var colorBox = ( <div style={style}> Your color </div> );
		var randomizeColorBtn = ( <button onClick={this.randomizeColor.bind(this)}> Randomize Color </button> );
		return(
			<div>
				{ this.state.data.username }
				{ colorBox }
				{ randomizeColorBtn }
			</div>
		);
	}
}

let profile = document.querySelector('#profileContainer');
ReactDOM.render(<Profile />, profile);
