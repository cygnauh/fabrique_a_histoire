
import React from 'react';
import { View, Text, Button,FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Home Screen</Text>
              <Button
                  title="Go to the form"
                  onPress={() => this.props.navigation.navigate('Details')}
              />
            </View>


        );
    }
}


class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{height: 250, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Form</Text>
              {/*<Button*/}
                  {/*title="Go to Details... again"*/}
                  {/*onPress={() => this.props.navigation.navigate('Details')}*/}
              {/*/>*/}
              <FetchExample/>
              <Button
                  title="Go back"
                  onPress={() => this.props.navigation.goBack()}
              />
            </View>
        );
    }
}

const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
    },
    {
        initialRouteName: 'Home',
    }
);

class FetchExample extends React.Component {

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
                  {/*<ActivityIndicator/>*/}
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
}


export default class App extends React.Component {
    render() {
        return <View style={{flex: 1, flexDirection: 'row'}}>

          <RootStack />
        </View>;
    }
}