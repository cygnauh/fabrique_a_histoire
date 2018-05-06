import React from 'react';
import { View, Text, Button, ActivityIndicator,FlatList } from 'react-native';
import Logo from '../components/logo';
import GlobalStyle from '../styles/mainStyle';
import TimerMixin from 'react-timer-mixin';


export default class Place extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isLoading: true
        };

        this.colors =[
            '#3A7BD2',
            '#FFFF8D',
            '#000',
            '#C62828',
            '#673AB7',
            '#3F51B5',
            '#009688',
            '#FF9800',
            '#9C27B0',
            '#4CAF50'
        ]

        this.color="#aaa"
        // this.changeColor(Colors, this.color)


    }

    changeColor(){
            // setTimeout(function(){
                this.color = this.colors[0];
                return {
                    backgroundColor : this.color
                }
            // }, 500)
    }

    componentDidMount(){
        let url = 'https://testappfabulab.herokuapp.com/places'
        return fetch((url,{
            //  mode:"no-cors",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "text/plain"
            }
        }))
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                    this.setState({
                        isLoading: false,
                        dataSource: json,
                    }, function(){

                    });
                return {
                    city: json.name,
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
        // return fetch('https://testappfabulab.herokuapp.com/places')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //     //
        //     //     this.setState({
        //     //         isLoading: false,
        //     //         dataSource: responseJson,
        //     //     }, function(){
        //     //
        //     //     });
        //     //
        //     })
        //     // .catch((error) =>{
        //     //     console.error(error);
        //     // });
    }



    render() {

        // if(this.state.isLoading){
        //     return(
        //         <View style={{flex: 1, padding: 20}}>
        //             <ActivityIndicator/>
        //         </View>
        //     )
        // }
        return(
            <View style={[GlobalStyle.view, this.changeColor()]}>
                <Logo/>
                <View>
                    <Text style={GlobalStyle.titleContent}>Cette histoire se passe ...</Text>

                    <View style={GlobalStyle.placeContainer}>
                        <Text>Cette histoire se passe ...</Text>
                        <View style={{flex: 1, paddingTop:20}}>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                                keyExtractor={(item, index) => index}
                            />
                        </View>

                    </View>
                </View>
                <Button title={'Continuer'.toUpperCase()} onPress={() => this.props.navigation.navigate('Form', {length: this.state.value} )} />
            </View>
        );
    }
}