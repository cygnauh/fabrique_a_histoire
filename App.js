
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './containers/home';
import OnBoarding from './containers/onboarding';

const StackNavigation = StackNavigator(
    {
        Home: { screen: Home },
        Onboarding: { screen: OnBoarding }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);

/*class FetchExample extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }
    componentDidMount(){
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.movies,
                }, function(){
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 4, padding: 120}}>
                  {/!*<ActivityIndicator/>*!/}
                </View>
            )
        }

        return(
            <View style={{height: 250}}>
              <FlatList
                  data={this.state.dataSource}
                  renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                  keyExtractor={(item, index) => index}
              />
             </View>
        );
    }
}*/

export default class App extends React.Component {
    render() {
        return (
            <StackNavigation/>
        );
    }
}