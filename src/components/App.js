import React from 'react';
import axios from 'axios';

const api = {
    baseURL : "http://localhost:3000",
    casos : "/cases"
};
let sumDeaths = 0, sumCases = 0;
let cases = [];

function sumOfAllDeathsAndCases(array){

    array.forEach(element => {
        sumDeaths += Number(element.deaths);
        sumCases += Number(element.cases);
    });
}

function getLastFifteenDays(array) {
    let newArray = new Array();
    
    for(let i = 0; i < 15; i++){        
        newArray.push(array[i]);
    }
    return newArray;
}

class App extends React.Component {
    
    async componentDidMount(){
        await axios
        .get(api.baseURL + api.casos)
        .then(async (res) => {
            cases = await getLastFifteenDays(Object.values(res.data));
            sumOfAllDeathsAndCases(Object.values(res.data));

        });
        
        
                

    }
    
    render() {
        return (
            <h1>Hello </h1>
        )
    }
};

export default App;