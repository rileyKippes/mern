class ReadPage extends React.Component {
    constructor(props){
        super();
        var pageId = document.location.search.slice(1);
        this.state = {
            ready: false,
            id: pageId,
            page: null
        }

        this.getPage = this.getPage.bind(this);
        this.linkToPage = this.linkToPage.bind(this);
        this.linkToStory = this.linkToStory.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.getPage();
    }

    linkToPage(event) {
        //event.target.id is set the ObjectID of the page in question
        window.location.href = "/p/story/read/page?id=" + event.target.id;
    }

    updatePage(event){
        //event.target.id is set the ObjectID of the page in question
        window.location.href = "/p/story/update/page?" + event.target.id;
    }

    linkToStory(event) {
        //event.target.id is set the ObjectID of the page in question
        window.location.href = "/p/story/read/?" + event.target.id;
    }

    getPage() {
        fetch('/p/story/search/page?' + this.state.id, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            this.setState({ ready: true, page: myJson });
        });
    }

    render(){
        if (this.state.ready) {
            var links = (
                <div className="row">
                    <a className="btn btn-primary btn-sm mx-1" id={this.state.page.firstPageID} onClick={this.linkToPage}> First Page </a>
                    <a className="btn btn-primary btn-sm mx-1" id={this.state.page.prevPageID} onClick={this.linkToPage}> Prev Page </a>
                    <a className=" btn-sm mx-1" href="#top"> {this.state.page.pageNum} </a>
                    <a className="btn btn-primary btn-sm mx-1" id={this.state.page.nextPageID} onClick={this.linkToPage}> Next Page </a>
                    <a className="btn btn-primary btn-sm mx-1" id={this.state.page.lastPageID} onClick={this.linkToPage}> Last Page </a>
                    <a className="btn btn-primary btn-sm ml-3 mr-1" id={this.state.page.storyID} onClick={this.linkToStory}> Back to Story </a>
                    <a className="btn btn-primary btn-sm ml-3 mr-1" id={this.state.id} onClick={this.updatePage}> Update Page </a>
                </div>
            )
            return (<div> <span name="top"/>
                {links}
                <div>{this.state.page.text}</div>
                {links}
            </div>);
        }
        else {
            return <p> Loading. . .</p>
        }

    }
}

let ReadPageDom = document.querySelector('#read_page_container');
ReactDOM.render(<ReadPage />, ReadPageDom);