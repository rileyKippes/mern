'use strict';

class JSON extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false,
					data: {key:'value'} };
  }

	getAPI(){
		console.log('getAPI()');
		console.log(this.state);
		fetch('/api')
		  .then((response) => {
			console.log("about to return");
			return response.json();
		  })
		  .then((myJson) => {
			console.log('myJson follows');
			console.log(myJson);
			this.setState({ liked: true, data:myJson});
			console.log(this.state);
		  });
		
	}

  render() {
    if (this.state.liked) {
      return (
		<p>
		{this.state.data[0].make}
		</p>);
    }

    return (
      <button onClick={this.getAPI.bind(this) }>
        API
      </button>
    );
  }
}

let JSONdomContainer = document.querySelector('#json_container');
ReactDOM.render(<JSON />, JSONdomContainer);
