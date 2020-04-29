import React from 'react';
import './styles.css';
import 'rc-footer/assets/index.css';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



const api = {
    baseURL : "https://covid19brazilbackend.herokuapp.com",
    casos : "/cases"
};

function sumOfAllDeathsAndCases(array){


    let deaths = 0, cases = 0, death = 0;

    array.forEach(element => {
        if(Number(element.deaths) > death){
            death = Number(element.deaths);
        }
        deaths += Number(element.deaths);
        cases += Number(element.cases);
    });

    return [deaths, cases, death]
}

function getLastFifteenDays(array) {
    let newArray = new Array();
    
    for(let i = 0; i < 15; i++){        
        newArray.push(array[i]);
    }
    return newArray;
}

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cases: [],
            sumDeaths: 0,
            sumCases: 0,
            dayWithMore: 0
        };
      }
    
    async componentDidMount(){
        await axios
        .get(api.baseURL + api.casos)
        .then(async (res) => {
            this.setState({ cases: await getLastFifteenDays(Object.values(res.data)).reverse()});
            let [deaths, casess, death] = sumOfAllDeathsAndCases(Object.values(res.data));
            this.setState({sumCases: casess});
            this.setState({sumDeaths: deaths});
            this.setState({dayWithMore: death});
        });
        
        
    }
    
    render() {
        return (
            <div>
                
                <h1>Mortes nos últimos 15 dias em território brasileiro</h1>
                <LineChart className="chart"
                        width={900} height={500} data={this.state.cases}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="dateRep"/>
                    <YAxis yAxisId="left" type="number" domain={[0,this.state.dayWithMore+50]}/>
                    <Tooltip/>
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="deaths" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
                <h1>Soma de todas as mortes no Brasil: {this.state.sumDeaths}</h1>
                <br></br>
                <br></br>
                <div className="footer" >
                    <p> Feito por : João Pedro Noronha </p>
                    <a href="https://www.linkedin.com/in/joão-pedro-noronha-0750b1161">Visite meu Likedin</a>
                </div>
                
            </div>
            
        )
    }
};

export default App;