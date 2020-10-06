class Calculator extends React.Component {
    //calculated displacement from bore, stroke, and number of cylinders
    //works in both freedom and metric
    //shows benefits of one-way binding
    //and slightly advanced forms in bootstrap
    constructor(props) {
        super();
        //are you ready for floating point errors? 
        this.state = {
            boreInches: 0.0,
            boreMM: 0.0,
            strokeInches: 0.0,
            strokeMM: 0.0,
            numCylinders: 1,
            cubicInches: 0.0,
            cubicCentimeters: 0.0,
            liters: 0.0
        }
        this.calculate = this.calculate.bind(this);
        this.handleBoreInchesChange = this.handleBoreInchesChange.bind(this);
        this.handleBoreMMChange = this.handleBoreMMChange.bind(this);
        this.handleStrokeInchesChange = this.handleStrokeInchesChange.bind(this);
        this.handleStrokeMMChange = this.handleStrokeMMChange.bind(this);
        this.handleNumCylindersChange = this.handleNumCylindersChange.bind(this);
    }

    calculate() {
        //calculator calculates from inches for simplcity
        const c = 3.14159 / 4;
        var boreSq = (this.state.boreInches) * (this.state.boreInches);
        var stroke = (this.state.strokeInches);
        var numCylinders = (this.state.numCylinders);
        var ci = c * boreSq * stroke * numCylinders;
        var cc = ci * 16.3871;
        var l = ci / 61.024;
        console.log(this.state);
        console.log(" " + ci + " Cubic inches = " + cc + " Cubic centimeters = " + l + " Liters");
        this.setState({
            cubicInches: ci,
            cubicCentimeters: cc,
            liters: l
        });
    }

    handleBoreInchesChange(event) {
        this.state.boreInches = event.target.value;
        this.state.boreMM = this.state.boreInches * 25.4;
        this.calculate();
    }

    handleBoreMMChange(event) {
        this.state.boreMM = event.target.value;
        this.state.boreInches = this.state.boreMM / 25.4;
        this.calculate();
    }

    handleStrokeInchesChange(event) {
        this.state.strokeInches = event.target.value;
        this.state.strokeMM = this.state.strokeInches * 25.4;
        this.calculate();
    }

    handleStrokeMMChange(event) {
        this.state.strokeMM = event.target.value;
        this.state.strokeInches = this.state.strokeMM / 25.4;
        this.calculate();
    }

    handleNumCylindersChange(event) {
        this.state.numCylinders = event.target.value;
        this.calculate();
    }


    render() {
        var form = (
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-right" htmlFor="bore"> Bore in Inches</label>
                    <div className="col-sm-4">
                        <input type="number"
                            name="bore"
                            className="form-control"
                            value={this.state.boreInches}
                            min="0"
                            onChange={this.handleBoreInchesChange}>
                        </input>
                    </div>
                    <label className="col-sm-2 col-form-label text-right" htmlFor="bore"> Bore in MM </label>
                    <div className="col-sm-4">
                        <input type="number"
                            name="bore"
                            className="form-control"
                            value={this.state.boreMM}
                            min="0"
                            onChange={this.handleBoreMMChange}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label text-right" htmlFor="stroke"> Stroke in Inches </label>
                    <div className="col-sm-4">
                        <input type="number"
                            name="stroke"
                            className="form-control"
                            min="0"
                            value={this.state.strokeInches}
                            onChange={this.handleStrokeInchesChange}>
                        </input>
                    </div>
                    <label className="col-sm-2 col-form-label text-right" htmlFor="stroke"> Stroke in MM</label>
                    <div className="col-sm-4">
                        <input type="number"
                            name="stroke"
                            className="form-control"
                            min="0"
                            value={this.state.strokeMM}
                            onChange={this.handleStrokeMMChange}>
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
                            onChange={this.handleNumCylindersChange}>
                        </input>
                    </div>
                </div>
                <div className="form-group form-row">
                    <label className="col-sm-2 col-form-label text-right"> Cubic Inches </label>
                    <div className="col-sm-2 col-form-label text-left">
                        {this.state.cubicInches}
                    </div>
                    <label className="col-sm-2 col-form-label text-right"> Cubic Centimeters  </label>
                    <div className="col-sm-2 col-form-label text-left">
                        {this.state.cubicCentimeters}
                    </div>
                    <label className="col-sm-2 col-form-label text-right"> Liters  </label>
                    <div className="col-sm-2 col-form-label text-left">
                        {this.state.liters}
                    </div>
                </div>
            </form>
        )
        return (<div> {form} </div>);
    }
}

let CalcDomContainer = document.querySelector('#calculator_container');
ReactDOM.render(<Calculator />, CalcDomContainer);