class UpdatePage extends React.Component {
    constructor(props) {
        super();
        var pageId = document.location.search.slice(4);
        this.state = {
            ready: false,
            id: pageId,
            page: null
        }
        this.getPage = this.getPage.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.getPage();
    }

    getPage() {
        fetch('/p/story/search/page?id=' + this.state.id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            this.setState({ ready: true, page: myJson, text: myJson.text });
        });
    }

    updatePage(event) {
        var data = {
            id:this.state.id,
            text: document.getElementById("text").value
        };
        
        console.log(data);

        fetch('/p/story/update/page?id=' + this.state.id, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(data)
        });
    }

    render() {
        if (this.state.ready) {
            return <form>
                <div className="form-group form-row">
                    <textarea
                        id="text"
                        className="form-control"
                        name="story"
                        rows="25"
                        placeholder="Story goes here"
                        value={this.state.text}
                        onChange={(event) => { this.setState({ text: event.target.value }); }} />
                </div>
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.updatePage}> Update </button>
            </form>
        }
        return <div> Loading Update Page </div>
    }
}

let UpdatePageDom = document.querySelector('#update_page_container');
ReactDOM.render(<UpdatePage />, UpdatePageDom);