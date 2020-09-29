import React from "react";
import logo from "./brand-logo.png"
import "./App.css";
import * as d3 from 'd3'; 

class App extends React.Component { 
  constructor(props) {
    super(props); 
    this.state = { 
      banknames: [], 
      balances: [], 
      showBanknames: true 
    }
    this.Bchart = this.Bchart.bind(this); 
    this.getBalances = this.getBalances.bind(this);
    this.getBanknames = this.getBanknames.bind(this);
    this.showBanknames = this.showBanknames.bind(this);
    this.showBalances = this.showBalances.bind(this);
  }

  
  Bchart() { 
    const margin = { top: 50, right: 50, bottom: 50, left: 50}; // where the chart is to be placed (not the specifications of the chart)
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barGraph") //the specifications of the chart
      .attr("viewBox", '0 0 1000 500') 
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.selectAll("*").remove(); // remove all content assoc with svg so that when there is an update, it removes the previous chart

    var x = d3.scaleBand().range([0,width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(this.state.balances.map(details => details.bank));
    y.domain([0, d3.max(this.state.balances.map(details => details.balance))]); 

    //append rectangles for the bar chart
    svg.selectAll(".bar")
      .data(this.state.balances)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.bank))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.balance))
      .attr("height", d => height - y(d.balance)); 

    //add x-axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    //add y-axis
    svg.append("g")
    .call(d3.axisLeft(y));
  }
   
  
  getBanknames(){
      fetch("http://localhost:5000/banknames")
      .then(res => res.text())
      .then(res => this.setState({ banknames: JSON.parse(res) }))
      .catch(err => err);
      }
   
  
  getBalances(){
      fetch("http://localhost:5000/balances")
      .then(res => res.text())
      .then(res => this.setState({balances: JSON.parse(res)  }))
      .catch(err => err);
      }
  
  componentDidMount() { 
    this.getBanknames();
  }

  componentDidUpdate() { 
    this.Bchart();
  }

  showBalances(){
    this.getBalances(); 
    this.setState({showBanknames: false}); 
  }
 
  showBanknames(){
    this.getBanknames(); 
    this.setState({showBanknames: true}); 
  }
 
 
  render() {
    
    var tableBanks = ( //banks table (not including balances)
      <table className = "striped centered">
        <thead>
          <tr>
            <th>Bank</th>            
          </tr>
        </thead>
        <tbody>
          {this.state.banknames.map(bank => 
          <tr key={bank}>
            <td>{bank}</td>
          </tr>)
          }         
        </tbody>
        </table>
    )

    var tableBalances = ( //showing both bank and banknames
      <table className = "striped centered">
        <thead>
          <tr> 
            <th>Bank</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {this.state.balances.map(details => 
          <tr key = {details.bank}>
            <td>{details.bank}</td>
            <td>{details.balance}</td>
          </tr>
          )}          
        </tbody>
      </table>
    )
    
    
    if (this.state.showBanknames) { 
      return( 
        <div className = "App">
          <header className = "App-header">
            <img src = {logo} className = "App-logo" alt = "logo" />
          
            <div id = "visualization"> 
            <button className = "btn" onClick = {this.showBanknames}>Bank</button> 
            <button className = "btn" onClick = {this.showBalances}>Balance</button>          
           
          </div>
          </header> 

          <body className = "App-body">
          {tableBanks}
          </body>
          
        </div>
      ); 
    } else {
      return (
        <div className = "App">
          <header className = "App-header">
            <img src = {logo} className = "App-logo" alt = "logo" />
          
            <div id = "visualization">  
            <button className = "btn" onClick = {this.showBanknames}>Bank</button> 
            <button className = "btn" onClick = {this.showBalances}>Balance</button>          
            </div>

          </header>

          <body className = "App-body">
          {tableBalances}
            <svg id = "barGraph"></svg>
          </body>
        </div>
      );
    }
  }
}

export default App;



