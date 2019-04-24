import React, { Component } from 'react';
import SearchBar from './component/searchbar/searchBar';
import Result from './component/result/result';
import CarParkResult from './component/carparkresult/carparkresult'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.onChangeHandle = this.onChangeHandle.bind( this );
        this.onSubmitHandler =  this.onSubmitHandler.bind( this );
        this.checkAvailabiltyHandler = this.checkAvailabiltyHandler.bind( this );
        this.state = {
            message:'',
            searchInput:'',
            searchDisplay: false,
            result:[ ],
            filterResult:[ ],
            carParks:[ ],
            finalResult:[ ],
            singleCarPark: null,
        }

    };

    onChangeHandle(event){
        //console.log("HALO",event.target.value);
        this.setState({searchInput: event.target.value});
        // console.log("STATE",this.state.searchInput);
    };

    onSubmitHandler(event){
      event.preventDefault();
      var reactThis = this;
      this.setState({searchDisplay: true})
      //fetch api
      console.log("onSubmitHandler", this.state.searchInput);
      const baseUrl = 'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&q='
      fetch (baseUrl + this.state.searchInput.toLowerCase())
        .then((response)=> {
          return response.json()
        })
        .then((data)=> {
          console.log("FETCH",data.result.records);
          //filter the api
          reactThis.setState({result: data.result.records, searchDisplay: false});
          const results = this.state.result;
          //console.log("xxxxx",myResults[0].address);
          const filterResult = results.filter( result => {
            return result.address.toLowerCase().includes(this.state.searchInput.toLowerCase());
          });

            if(filterResult.length < 1 || filterResult === undefined){
                reactThis.setState({message: 'Address Not Found'});
            } else {
                //setState of result
                reactThis.setState({filterResult: filterResult});
                console.log("AFTER FILTER",this.state.filterResult);
            };

        }).catch((err)=>{
            console.log(err)
            reactThis.setState({message: err })
        });
    }

    checkAvailabiltyHandler(carpark,index){
        this.setState({singleCarPark: carpark});
        //get the real time api
        var reactThis = this
        //YYYY-MM-DD[T]HH:mm:ss (+8:00)
        const getMyDate =  new Date().toISOString();
        console.log("mydate", getMyDate);
        const baseCarparkAvailableURL = 'https://api.data.gov.sg/v1/transport/carpark-availability?' + getMyDate;
        //console.log(baseCarparkAvailableURL);

        fetch (baseCarparkAvailableURL,{
            method:'GET',
            mode: "cors",
            headers:{
                'Content-Type':'application/json',
            },
        })
        .then((response)=> {
          return response.json();
        })
        .then((data)=>{
            console.log("===",data.items[0].carpark_data);
            reactThis.setState({carParks: data.items[0].carpark_data});
            const carParks = this.state.carParks;
            const searchCarPark = carParks.filter( carPark => {
                return carPark.carpark_number === carpark.car_park_no;
            });
            if (searchCarPark.length < 1 || searchCarPark === undefined){
              reactThis.setState({message: 'Car Park Not Found, Please Search Again'})
            } else {
              reactThis.setState({finalResult: searchCarPark, message: ''})
            };

            console.log("SearchCarPark",searchCarPark)
            console.log("Check Availabilty index", index, carpark.car_park_no);
               //search for the carpark ID from the availablitiy api
        })
        .catch((err)=>{
          console.log(err)
        });

    }

  render() {
    return (
      <div className="App">
      <BrowserRouter>
          <header>
            <p>I AM AT APP</p>
          </header>
          <main>
            <Switch>
              {Object.keys(this.state.finalResult).length !== 0 && <Redirect from="/result" to= "/carparkresult" exact />}

              {this.state.searchDisplay && <Redirect from="/" to="/result" exact />}

              <Route exact path="/result" render = {()=>(<Result
                                                            filterResultProps={this.state.filterResult}
                                                            checkAvailabiltyHandlerProps={this.checkAvailabiltyHandler}/>)}/>
              <Route exact path="/carparkresult"
                      render = {()=>(<CarParkResult
                                        finalResultProps={this.state.finalResult}
                                        singleCarParkProps={this.state.singleCarPark}
                                        />)}/>
              <Route exact path="/"
                     render = {()=>(<SearchBar
                                        onChangeHandlerProps={this.onChangeHandle}
                                        searchInputProps={this.state.searchInput}
                                        onSubmitHandlerProps={this.onSubmitHandler}/>)}/>
            </Switch>
          </main>
          <footer><p>{this.state.message}</p></footer>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;