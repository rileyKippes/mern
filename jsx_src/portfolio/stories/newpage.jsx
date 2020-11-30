class NewPage extends React.Component {

    constructor(props) {
        super();
        this.state = {
            ready: false,
            storyID: document.location.search.slice(1),
            text: ""
        }

        console.log(this.state);
        this.postPage = this.postPage.bind(this);
        this.getStory = this.getStory.bind(this);

        if (this.state.storyID) {
            this.getStory();
        }
    }

    getStory() {
        console.log('getStory()');
        fetch('/p/story/searchByID?id=' + this.state.storyID, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            this.setState({ ready: true, story: myJson });
        });
    }

    postPage(event) {
        fetch('/p/story/new/page', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(this.state)
        }
        ).then((response) => {
            return response.json();
        }).then((myJson) => {
            this.setState({ ready: true, data: myJson });
        });
    }

    render() {
        console.log(this.state);
        if (this.state.ready) {
            return <div>
                New Page under <a href={'/p/story/read?id=' + this.state.storyID} > {this.state.story.title} </a>
                <form>
                    <input
                        className="form-control"
                        type="text"
                        name="text"
                        placeholder="Text"
                        value={this.state.text}
                        onChange={(event) => { this.setState({ text: event.target.value }); }} />
                    <input
                        className="btn btn-primary"
                        type="button"
                        value="Ready? Post your new page!"
                        onClick={this.postPage} />
                </form>
            </div>
        }
        return <div> Retrieved script. Now loading. . .</div>
    }
}

let NewPageDom = document.querySelector('#new_page_container');
ReactDOM.render(<NewPage />, NewPageDom);