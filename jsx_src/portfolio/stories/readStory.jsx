class ReadStory extends React.Component {
    //test with 5fa9cbfd2ca1c06000dc67f9
    constructor(props) {
        super();
        var storyId = document.location.search.slice(1);
        this.state = {
            ready: false,
            id: storyId,
            story: null
        }

        this.getStory = this.getStory.bind(this);
        this.linkToPage = this.linkToPage.bind(this);

        this.getStory();
    }

    getStory() {
        console.log('getStory()');
        fetch('/p/story/searchByID?' + this.state.id, {
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

    linkToPage(event) {
        //event.target.id is set the ObjectID of the page in question
        window.location.href = "/p/story/read/page?id=" + event.target.id;
    }

    render() {
        if (this.state.ready) {
            return (
                <div>
                    <h1>{this.state.story.title}</h1>
                    <h3>{this.state.story.author}</h3>
                    <p>
                        <a className="btn btn-primary"
                            id={this.state.story.firstPageID}
                            onClick={this.linkToPage}> First Page</a>
                        <a className="btn btn-primary"
                            id={this.state.story.lastPageID}
                            onClick={this.linkToPage}> Last Page</a>
                    </p>
                </div>
            );
        }
        else {
            return <p> Loading. . .</p>
        }
    }
}

let ReadStoryDom = document.querySelector('#read_story_container');
ReactDOM.render(<ReadStory />, ReadStoryDom);