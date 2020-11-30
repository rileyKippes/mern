class UpdateStory extends React.Component {
    constructor(props){
        super();
        var storyId = document.location.search.slice(1);
        this.state = {
            ready: false,
            id: storyId,
            story: null
        }
    }

    render() {
        return <div> Update Story </div>
    }
}

let UpdateStoryDom = document.querySelector('#update_story_container');
ReactDOM.render(<UpdateStory />, UpdateStoryDom);