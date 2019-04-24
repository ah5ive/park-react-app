import React from 'react';
// import result from '../result/result';
import './searchbar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        };

    };

    render() {
        // if (this.props.searchDisplayProps){
        //     console.log("SearchBar",this.props.searchDisplayProps)
        //     return <Redirect to="/result"/>
        // };
        return(
            <React.Fragment>
                <div className="searchBar">
                    <form onSubmit={this.props.onSubmitHandlerProps} >
                        <label>Search HDB Parking Availablity</label><br/>
                        <input placeholder="Type in street name" value={this.props.searchInputProps} onChange={this.props.onChangeHandlerProps}/>
                        <button>Search</button>
                    </form>
                </div>
            </React.Fragment>
            )
    }

}

export default SearchBar;