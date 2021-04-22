import React from "react";
import { Cards, Charts, CountryPicker } from './component';
import styles from './App.module.css';
import { fetchData } from './api';
import imgCorona from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        country: "",
    }



    async componentDidMount() {

        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });

    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData ,country: country});

        //console.log(fetchedData);
        //console.log(country);
        //fetch th data 
        //set the state 


    }

    render() {

        const { data ,country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} alt="covid19" src={imgCorona}/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data } country ={country} />
                

            </div>


        )

    }

}
export default App;
