class Story extends React.Component {

    //believe it or not
    //this is the proper way to do enums
    storyViews = {
        card: "Card",
        list: "List",
        details: "Detailed List",
    }

    searchViews = {
        simple: "Simple Search",
        complex: "Complex Search"
    }

    constructor(props) {
        super();
        this.state = {
            ready: false,
            storyView: this.storyViews.card,
            searchView: this.searchViews.simple, 
            results: [],
        };
        this.storyViewHandler = this.storyViewHandler.bind(this);
        this.searchViewHandler = this.searchViewHandler.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.linkToProfile = this.linkToProfile.bind(this);
        this.linkToTag = this.linkToTag.bind(this);

        //temp data until I set up the APIs fully
        this.state.results = [
            {
                _id: 0,
                title: "TestTitle1",
                description: "This is a test description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                author: "John Doe",
                uploaded: "2000-12-31",
                tags: ["Tags", "Test", "Nonsense"],
                numPages: 1,
                textID: "<ObjectID> Link to the first"
            },
            {
                _id: 1,
                title: "TestTitle2",
                description: "This is another test. Who was Max Headroom?",
                author: "Max Headroom",
                uploaded: "2000-12-31",
                tags: ["tags", "Test", "Nonsense", "Max"],
                numPages: 1,
                textID: "<ObjectID> Link to the second"
            },
            {
                _id: 2,
                title: "TestTitle3",
                description: "This is yet another test, and a reference to the main character of Neuromancer",
                author: "Case",
                uploaded: "2000-10-15",
                tags: ["tags", "Test", "Nonsense", "Case", "Cyberpunk"],
                numPages: 1,
                textID: "<ObjectID> Link to the third"
            },
            {
                _id: 3,
                title: "TestTitle4",
                description: "Amazing test ahead! Dixie Flatline is another character from Neuromancer. ",
                author: "Dixie Flatline",
                uploaded: "1970-12-31",
                tags: ["tags", "Test", "Nonsense", "Flatline"],
                numPages: 3,
                textID: "<ObjectID> Link to the forth"
            },
        ]
    }

    /*
    {
        title:<string>
        description:<string>
        author: <string>
        uploaded: <date>
        tags: <list of strings>
        numPages: <int>
        textID: <ObjectID> //ID of the first page
    },
    {
        ...
    },
    */

    storyViewHandler(event) {
        this.setState({ storyView: event.target.value });
    }

    searchViewHandler(event) {
        this.setState({ searchView: event.target.value });
    }

    getSearchResults(event) {
        console.log("getSearchResults(" + event.target.value + ")");
    }

    linkToProfile(event) {
        console.log("linkToProfile(" + event.target.value + ")");
    }

    linkToTag(event) {
        console.log("linkToTag(" + event.target.value + ")");
    }

    /*
    {
        text: <string>
        pageNum: <int>
        storyID: <ObjectID> //link to the story's meta data
        firstID: <ObjectID> //links to first page
        prevID: <ObjectID> //links to prev page //nullable if first page
        nextID: <ObjectID> //links to next page //nullable if last page
        lastID: <ObjectID> //links to last page 
    }
    */

    getStoryText(event) {
        console.log("getStoryText(" + event.target.attributes.params.value + ")");
    }

    render() {
        var postStoryMessage = (
            <a className="btn btn-primary m-1 py-0 col-3" href="/p/story/newstory"> Post a new story! </a>
        )

        var resultList = [];
        var tagsList = [];
        var results;
        var search;

        // Begin building result view
        for (var result of this.state.results) {
            for (var tag of result.tags) {
                tagsList.push((
                    <a className="text-muted px-2 py-1"
                        params={tag}
                        onClick={this.linkToTag}
                        key={tag}>
                        {tag}
                    </a>
                ));
            }
            switch (this.state.storyView) {
                default:
                    console.error("Invalid view. Defaulting to card view");
                case this.storyViews.card:
                    resultList.push((
                        <div className="card mb-3"
                            key={result._id}>
                            <div className="card-header">
                                <h5 className="card-title text-center"> {result.title} </h5>
                                <h6 className="card-subtitle text-center"> {result.author} </h6>
                                <p className="card-text text-muted text-center">
                                    {tagsList}
                                </p>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    {result.description}
                                </p>
                            </div>
                            <div className="card-footer">
                                <a className="btn btn-primary" params={result.textID} onClick={this.getSearchResults}> Read this story </a>
                            </div>
                        </div>
                    ));

                    break;
                case this.storyViews.details:
                    resultList.push((
                        <tr className=""
                            key={result._id}>
                            <td> <a className="btn w-100" params={result.textID} onClick={this.getSearchResults}> {result.title} </a> </td>
                            <td> <a className="btn w-100" params={result.author} onClick={this.linkToProfile}> {result.author} </a></td>
                            <td> {tagsList}</td>
                            <td> <a className="btn w-100" params={result.textID} onClick={this.getSearchResults}> {result.description} </a> </td>
                            <td> <a className="btn w-100" params={result.textID} onClick={this.getSearchResults}> {result.uploaded} </a> </td>
                            <td> <a className="btn w-100" params={result.textID} onClick={this.getSearchResults}> {result.numPages} </a> </td>
                        </tr>
                    ));
                    break;
                case this.storyViews.list:
                    resultList.push((
                        <tr className=""
                            key={result._id}>

                            <td> <a className="btn w-100" params={result.textID} onClick={this.getSearchResults}> {result.title} </a> </td>
                            <td> <a className="btn w-100" params={result.author} onClick={this.linkToProfile}> {result.author} </a></td>
                            <td> {tagsList}</td>
                            <td> <a className="btn w-100" params={result.textID} onClick={this.getSearchResults}> {result.description} </a> </td>
                        </tr>
                    ));
                    break;
            }
            tagsList = [];
        }

        switch (this.state.storyView) {
            default:
            case this.storyViews.card:
                results = (<div className="card-columns text-dark"> {resultList} </div>);
                break;
            case this.storyViews.details:
                results = (
                    <table className="table table-light text-dark table-striped table-hover">
                        <thead className="thead thead-dark text-center">
                            <tr className="w-100">
                                <th className="col-2" scope="col"> Title </th>
                                <th className="col-2" scope="col"> Author </th>
                                <th className="col-2" scope="col"> Tags </th>
                                <th className="col-4" scope="col"> Description </th>
                                <th className="col-1" scope="col"> Uploaded</th>
                                <th className="col-1" scope="col"> Pages </th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultList}
                        </tbody>
                    </table>);
                break;
            case this.storyViews.list:
                results = (
                    <div className="table-responsive">
                        <table className="table table-light text-dark table-striped table-hover">
                            <thead className="thead thead-dark">
                                <tr>
                                    <th className="col-2" scope="col"> Title </th>
                                    <th className="col-2" scope="col"> Author </th>
                                    <th className="col-1" scope="col"> Tags </th>
                                    <th className="col-7" scope="col"> Description </th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultList}
                            </tbody>
                        </table>
                    </div>);
                break;
        }
        //end building results view

        //begin building search form
        switch (this.state.searchView) {
            default: //go to simple
            case this.searchViews.simple:
                search = (
                    <form>
                        <div className="form-group form-row" >
                            <input className="form-control col-10"
                                type="text"
                                name="search"
                                placeholder="Search Here"
                                required />
                            <input className="btn btn-primary col-1"
                                type="submit"
                                value="Search" />
                        </div>
                    </form>
                );
                break;
            case this.searchViews.complex:
                search = (
                    <form>
                        <div className="form-group form-row justify-content-around" >
                            <input className="form-control col-8"
                                type="text"
                                name="title"
                                placeholder="Title" />
                            <input className="form-control col-3"
                                type="text"
                                name="author"
                                placeholder="Author"
                                value="" /> {/*due to how react creates html elements and only changes what's needed, we have to explicitly change value back*/}
                        </div>
                        <div className="form-group form-row justify-content-around" >
                            <input className="form-control col-4"
                                type="text"
                                name="tags"
                                placeholder="Tags" />
                            <select className="form-control custom-select col-4"
                                name="uploaded">
                                <option value="empty"> All Time </option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year"> This Year</option>
                            </select>
                            <input className="btn btn-primary col-1"
                                type="submit"
                                value="Search" />
                        </div>
                    </form>
                );
                break;
        }
        //end building search form


        //build view switch
        var storyViewSwitch;
        var searchViewSwitch;
        var storyViewList = [];
        var searchViewList = [];
        var tempList = Object.entries(this.storyViews);
        var value;
        for (var i = 0; i < tempList.length; i++) {
            value = tempList[i][1]; //cache
            storyViewList.push((<option value={value} key={value}>{value}</option>));
        }

        storyViewSwitch = (
            <select className="m-1 col-3" value={this.state.storyView} onChange={this.storyViewHandler}>
                {storyViewList}
            </select>
        )

        tempList = Object.entries(this.searchViews);
        for (var i = 0; i < tempList.length; i++) {
            value = tempList[i][1]; //cache
            searchViewList.push((<option value={value} key={value}>{value}</option>));
        }

        searchViewSwitch = (
            <select className="m-1 col-3" value={this.state.searchView} onChange={this.searchViewHandler}>
                {searchViewList}
            </select>
        )

        return (
            <div id="story_div">
                {search}
                <div className="row justify-content-around">
                    {searchViewSwitch}
                    {storyViewSwitch}
                    {postStoryMessage}
                </div>
                {results}
            </div>
        );
    }
}

let StoryDomContainer = document.querySelector('#story_container');
ReactDOM.render(<Story />, StoryDomContainer);
