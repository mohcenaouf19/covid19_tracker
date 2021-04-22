import React , {useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Bar, Line } from 'react-chartjs-2';

import styles from './Charts.module.css';

const Charts = ({data :{confirmed ,recovered,deaths},country}) =>{
    const [dailyData ,setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {

            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        }



        fetchApi();
        
    },[]);


    const barchart = (
        confirmed ?
            (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', ' Deaths'],
                    datasets: [{
                            label: 'peopel',
                            backgroundColor: ['rgb(0, 0, 255,0.5)', 'rgb(0,255, 0,0.5)', 'rgb(255, 0,0,0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value],

                        },],
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` },
                    }}
                />
            ) : null
    );


    const lineChart = ( 
        dailyData[0] ?
        (
        <Line data={{
            labels : dailyData.map(({date }) => new Date(date).toLocaleDateString()),


            datasets :[{

                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              },
            {
                data: dailyData.map((data) => data.death),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },
            
            ],
        }}
        />) :null
);
console.log("Country here ", country);

    
    
    return(
        <div className={styles.container}>
            
            {country ? barchart : lineChart} 

        </div>
        
    );
};

export default Charts;