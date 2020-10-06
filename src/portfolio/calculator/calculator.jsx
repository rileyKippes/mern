class Calculator extends React.Component {
    //calculated displacement from bore, stroke, and number of cylinders
    //shows benefits of one-way binding
    constructor(props) {
        super();
        this.state = {
            bore: 0.0,
            stroke: 0.0,
            numCylinders: 1,
            displacement: 0.0
        }
    }

    calculate() {
        //calculator is based on inches, but
        //it also works if you think everything is the same length unit
        //millimeters and cubic millimeters, centimeters and cubic centimeters
        const c = 3.14159 / 4;
        var boreSq = (this.state.bore) * (this.state.bore);
        var stroke = (this.state.stroke);
        var numCylinders = (this.state.numCylinders);
        return c * boreSq * stroke * numCylinders;
    }

    handleBoreChange(event) {
        this.state.bore = event.target.value;
        this.setState({ displacement: this.calculate() })
    }

    handleStrokeChange(event) {
        this.state.stroke = event.target.value;
        this.setState({ displacement: this.calculate() })
    }

    handleNumCylindersChange(event) {
        this.state.numCylinders = event.target.value;
        this.setState({ displacement: this.calculate() })
    }


    render() {
        var form = (
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-right" htmlFor="bore"> Bore </label>
                    <div className="col-sm-10">
                        <input type="number"
                            name="bore"
                            className="form-control"
                            value={this.state.bore}
                            min="0"
                            onChange={this.handleBoreChange.bind(this)}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-right" htmlFor="stroke"> Stroke </label>
                    <div className="col-sm-10">
                        <input type="number"
                            name="stroke"
                            className="form-control"
                            min="0"
                            value={this.state.stroke}
                            onChange={this.handleStrokeChange.bind(this)}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-right" htmlFor="numCylinders"> Number of Cylinders </label>
                    <div className="col-sm-10">
                        <input type="number"
                            name="numCylinders"
                            className="form-control"
                            min="1"
                            value={this.state.numCylinders}
                            onChange={this.handleNumCylindersChange.bind(this)}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-right"> Calculated Displacement  </label>
                    <div className="col-sm-10 col-form-label text-left">
                        {this.state.displacement}
                    </div>
                </div>
            </form>
        )
        return (<div> {form} </div>);
    }
}

let CalcDomContainer = document.querySelector('#calculator_container');
ReactDOM.render(<Calculator />, CalcDomContainer);