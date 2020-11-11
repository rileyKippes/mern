class NewStory extends React.Component {

    constructor(props) {
        super();

        this.state = {
            title: "",
            description: "",
            tags: [],
            storyText: ""
        };

        this.postStory = this.postStory.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    postStory(event) {
        fetch('/p/story/newstory', {
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

    addTag(event) {
        var value = event.target.value;
        value = value.toLowerCase();
        if (event.key === 'Enter' && value) {
            if (this.state.tags.find(tag => tag.toLowerCase() === value.toLowerCase())) {
                event.target.value = "";
                return;
            }
            event.target.value = "";
            this.setState({ tags: [...this.state.tags, value] });
        }
    }

    removeTag(event) {
        var i = event.target.getAttribute("tagindex");
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    }

    render() {

        var linkToSearch = (
            <div className="row">
                <a className="btn btn-primary m-1" href="/p/story"> Search for old stories! </a>
                <button
                    className="btn btn-primary m-1"
                    onClick={this.postStory}>
                    Ready? Post your story!
                    </button>
            </div>);

        var tags = this.state.tags.map((tag, i) => (
            <li key={tag}
                className="mx-1 mt-1 pt-0 list-inline-item sm">
                {tag}
                <button tagindex={i}
                    className="ml-1 mr-2 btn btn-sm btn-outline-secondary"
                    type="button"
                    aria-label="Close"
                    onClick={this.removeTag}>
                    <span aria-hidden="true">&times;</span>
                </button>

            </li>
        ));
        return (
            <div>
                {linkToSearch}
                <form className="m-2">
                    <div className="form-group form-row">
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={(event) => { this.setState({ title: event.target.value }); }} />
                    </div>
                    <div className="form-group form-row ">
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={(event) => { this.setState({ description: event.target.value }); }} />
                    </div>
                    <ul className="form-group form-row form-control list-inline py-0" htmlFor="tags">
                        {tags}
                        <li className="mx-1 w-auto list-inline-item"
                            key="newTag">
                            <input
                                className="form-control-plaintext"
                                type="text"
                                name="tags"
                                placeholder="Tags"
                                onKeyDown={this.addTag} />
                        </li>
                    </ul>
                    <div className="form-group form-row">
                        <textarea
                            className="form-control"
                            name="story"
                            rows="25"
                            placeholder="Story goes here"
                            value={this.state.storyText}
                            onChange={(event) => { this.setState({ storyText: event.target.value }); }} />
                    </div>
                    <div className="form-group form-row">
                        <input
                            className="btn btn-primary"
                            type="button"
                            value="Ready? Post your story!"
                            onClick={this.postStory} />
                    </div>
                </form>
            </div>
        );
    }
}

let NewStoryDomContainer = document.querySelector('#new_story_container');
ReactDOM.render(<NewStory />, NewStoryDomContainer);