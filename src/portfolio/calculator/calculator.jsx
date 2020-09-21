class Calculator extends React.Component {
    //calculated displacement from bore, stroke, and number of cylinders
    //shows benefits of one-way binding
    constructor(props) {
        super();
        this.state = {
            bore:0.0,
            stroke:0.0,
            numCylinders:1,
            displacement:0.0
        }
    }

    calculate(){
        const c = 3.14159/4;
        var boreSq = (this.state.bore) * (this.state.bore);
        var stroke = (this.state.stroke);
        var numCylinders = (this.state.numCylinders);
        return c * boreSq * stroke * numCylinders;
    }


    //me repeating code? it's more likely than you think!
    //although three examples of 3 lines each isn't huge,
    //I'd still like to make this better
    //But that's low on my list priorities
    handleBoreChange(event){
        this.state.bore = event.target.value;
        this.setState({displacement: this.calculate()})
    }

    handleStrokeChange(event){
        this.state.stroke = event.target.value;
        this.setState({displacement: this.calculate()})
    }

    handleNumCylindersChange(event){
        this.state.numCylinders = event.target.value;
        this.setState({displacement: this.calculate()})
    }

    
    render() {
        var form = (
            <form>
                <label style={{width:"100%"}}> Engine Displacement Calculator </label>
                <div>
                <label> Bore </label>
                <input type="number"
                    name="bore"
                    value={this.state.bore}
                    min="0"
                    onChange={this.handleBoreChange.bind(this)}>
                </input>
                </div>
                <div>
                <label> Stroke </label>
                <input type="number"
                    name="stroke"
                    min="0"
                    value={this.state.stroke}
                    onChange={this.handleStrokeChange.bind(this)}>
                </input>
                </div>
                <div>
                <label> Number of Cylinders </label>
                <input type="number"
                    name="numCylinders"
                    min="1"
                    value={this.state.numCylinders}
                    onChange={this.handleNumCylindersChange.bind(this)}>
                </input>
                </div>
                <div>
                <label> Calculated Displacement </label>
                <input type="number"
                    name="displacement"
                    value={this.state.displacement}
                    readOnly >
                </input>
                </div>
            </form>
        )
        return ( <div> {form} </div>);
    }
}

let CalcDomContainer = document.querySelector('#calculator_container');
ReactDOM.render(<Calculator />, CalcDomContainer);