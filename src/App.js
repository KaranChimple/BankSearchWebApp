import React from 'react';
// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { Component } from 'react';
// import {Text, View, ActivityIndicator, Alert, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
// import {ListItem, SearchBar} from 'react-native-elements';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const cityNames = ["MUMBAI", "BANGALORE", "DELHI", "CHENNAI", "KOLKATA"];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            error: null,
            cityName: cityNames[0],
            dropDownStatus: false,
            query: ''
        }
        this.bankNameArray = [];
    }

    componentDidMount() {
        const { cityName } = this.state;
        this.makeRemoteRequest(cityName);
    }

    makeRemoteRequest = (cityName) => {
        const url = `https://vast-shore-74260.herokuapp.com/banks?city=` + cityName;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    error: res.error || null,
                    isLoading: false,
                });

                this.bankNameArray = res;
                console.log("Bank Name Array -> ", this.bankNameArray);
                console.log("Result JSON -> ", res);
            })
            .catch(error => {
                this.setState({ error, isLoading: false });
            });
    };

    dropDownClicked() {
        this.setState({
            dropDownStatus: !this.state.dropDownStatus,
        });
    }

    dropDownOptionClicked(index) {
        this.setState({
            isLoading: true,
        });
        if (index === 0) {
            this.makeRemoteRequest(cityNames[0]);
        }
        else if (index === 1) {
            this.makeRemoteRequest(cityNames[1]);
        } else if (index === 2) {
            this.makeRemoteRequest(cityNames[2]);
        } else if (index === 3) {
            this.makeRemoteRequest(cityNames[3]);
        } else if (index === 4) {
            this.makeRemoteRequest(cityNames[4]);
        }
        this.setState({
            isLoading: false,
            cityName: cityNames[index],
            dropDownStatus: !this.state.dropDownStatus
        });
    }

    // renderSeparator = () => {
    //     return (
    //       <View
    //         style={{
    //           height: 1,
    //         }}
    //       />
    //     );
    //   };

    searchFilterFunction = (e) => {
        // const { query } = this.state;
        let searchText='';
        const newItem = document.getElementById("searchInput");
        if (newItem.value !== "") {
            console.log("search text entered - "+newItem.value);
            searchText = newItem.value;

            this.setState({
                query: searchText,
            });

            const newData = this.bankNameArray.filter(item => {
                const itemData = item.bank_name.toUpperCase();

                const textData = newItem.value.toUpperCase();
                // console.log("ItemData", itemData);
                // return itemData.indexOf(textData) > -1
                return itemData.includes(textData) ? itemData.indexOf(textData) : -1;
            });
            console.log("new Data - "+newData);
            this.setState({ data: newData });
        }
    };

    render() {
        const { isLoading, cityName, dropDownStatus } = this.state;
        if (isLoading) {
            return (
                <div id="spinner" class="container">
                    <div class="loading"></div>
                </div>
            );
        }
        return (
            <div>
                <div>
                    <div style={{ flexDirection: 'row', height: '20%' }}>
                        <div styles={{ overflowY: 'scroll' }}>
                            <button style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onClick={() => this.dropDownClicked()}>
                                <span style={{ fontSize: 12 }}>{cityName}      </span>

                            </button>
                            {dropDownStatus && <div>
                                <button style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => this.dropDownOptionClicked(0)}>
                                    <span style={{ fontSize: 12 }}>{cityNames[0]}</span>
                                </button>
                                <button style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => this.dropDownOptionClicked(1)}>
                                    <span style={{ fontSize: 12 }}>{cityNames[1]}</span>
                                </button>
                                <button style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => this.dropDownOptionClicked(2)}>
                                    <span style={{ fontSize: 12 }}>{cityNames[2]}</span>
                                </button>
                                <button style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => this.dropDownOptionClicked(3)}>
                                    <span style={{ fontSize: 12 }}>{cityNames[3]}</span>
                                </button>
                                <button style={{ alignItems: 'center', justifyContent: 'center' }} onClick={() => this.dropDownOptionClicked(4)}>
                                    <span style={{ fontSize: 12 }}>{cityNames[4]}</span>
                                </button>
                            </div>}
                        </div>
                        <div style={{ width: '70%' }}>
                            <input
                                id='searchInput'
                                placeholder="Type Here..."
                                value={this.state.query}
                                onChange={text => this.searchFilterFunction(text)}
                            />

                        </div>

                    </div>
                    <div styles={{ width: '100%', height: '80%' }}>
                        {this.state.data.map(i => (
                            <div>
                                <p>{i.bank_name}</p>
                                <div styles={{ height: 1 }} />
                            </div>))}
                    </div>
                </div>


            </div>
        );
    }

}
