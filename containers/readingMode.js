import React from 'react';
import { View, Text, Image,TextInput,TouchableOpacity } from 'react-native';
import Header from '../components/header';
import GlobalStyle from "../styles/mainStyle";
import FormStyle from "../styles/formStyle";

export default class readingMode extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            input : "hello"
        }

    }

    componentDidMount(){

        return fetch('https://testappfabulab.herokuapp.com/places')
            .then((response) => response.json())
            .then((responseJson) => {

                // console.log(responseJson)

                let random = Math.floor(Math.random() * Math.floor(responseJson.length));

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    randomPlace:random,
                    randomPlaceName:responseJson[random],
                    colors:responseJson.color
                }, function(){

                });

                if(this.state.randomPlaceName.url){
                    console.log(this.state.randomPlaceName.url)
                }
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    getSounds(){
        return fetch('https://testappfabulab.herokuapp.com/places')
            .then((response) => response.json())
            .then((responseJson) => {

                // console.log(responseJson)

                let random = Math.floor(Math.random() * Math.floor(responseJson.length));

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    randomPlace:random,
                    randomPlaceName:responseJson[random],
                    colors:responseJson.color
                }, function(){

                });

                if(this.state.randomPlaceName.url){
                    console.log(this.state.randomPlaceName.url)
                }
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    getStory(){

    }

    get



    render() {
        return(
            <View style={[GlobalStyle.view]}>

                <Header onPress={() => this.props.navigation.goBack()}/>
                <View style={{ flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>

                    <TextInput style={[FormStyle.question]}
                               placeholder={"Entrer le code"}
                               onChangeText={(text) => this.setState({input: text})}
                    />

                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({input: text})}
                    />
                    <Text>{'user input: ' + this.state.input}</Text>

                    <TouchableOpacity onPress={() => { this.getSounds()} }>
                        <Text style={GlobalStyle.homeBtn}>{'Relire mon histoire'}</Text>
                    </TouchableOpacity>
                    {/*<Text style={GlobalStyle.placePhrase}>Cette histoire se passe </Text>*/}

                    {/*<View style={GlobalStyle.placeContainer}>*/}

                        {/*{this.state.status ?  <Text style={GlobalStyle.placeTitle}>{this.state.randomPlaceName.name}</Text> : null}*/}

                    {/*</View>*/}
                </View>
            </View>
        )
    }
}