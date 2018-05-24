import React from 'react';
import { View, Text, Image,TextInput,TouchableOpacity } from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle';
import Video from 'react-native-video';

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

    getSounds(id){

        if(id !==''){
            var num = parseInt(id)
            if (isNaN(num))
            {
                console.log("not number")
            }else{
                var request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story='+num

                console.log(request)

                return fetch(request)
                    .then((response) => response.json())
                    .then((responseJson) => {

                        console.log(responseJson)

                        if(responseJson.length === 3){
                            this.setState({
                                base_sound :  responseJson[2].base_sound[0]

                            }, function(){

                            });
                        }



                        console.log(this.state.base_sound)

                    })
                    .catch((error) =>{
                        console.error(error);
                    });
            }

        }
    }

    apiRequestForStorySounds(){

        if(!this.state.base_sound){
            return(
                <View>
                    <TextInput
                               placeholder={"Entrer le code"}
                               onChangeText={(text) => this.setState({input: text})}
                               style={{padding:20}}
                               keyboardType='numeric'
                    />



                    <TouchableOpacity onPress={() => { this.getSounds(this.state.input)} }>
                        <Text style={GlobalStyle.homeBtn}>{'Relire mon histoire'}</Text>
                    </TouchableOpacity>
                </View>

            )
        }

    }


    playASound(url) {
            return (
                <Video
                    source={{uri: url}}
                    volume={0.5}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    // onEnd={() => { this.setCanPlayValidationSound(), console.log() }}
                    repeat={this.repeat}
                />
            )
    }

    setBackgroundColor(){
        if(this.state.base_sound){
            return this.state.base_sound.color
        }else{
            return 'transparent'
        }

    }



    render() {
        return(

            <View style={[GlobalStyle.view, GlobalStyle.headerView,{ backgroundColor:this.setBackgroundColor()}]}>

                <Header onPress={() => this.props.navigation.goBack()}/>
                <View style={{ flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>

                    {this.apiRequestForStorySounds()}

                    {
                        this.state.base_sound ? (<View>
                            {/*<Text style={[GlobalStyle.placePhrase, backgroundColor:{this.state.base_sound.color}]}>Cette histoire se passe </Text>*/}
                            <Text style={GlobalStyle.placePhrase}>Cette histoire se passe </Text>

                            <View style={GlobalStyle.placeContainer}>

                                {this.state.base_sound ?  <Text style={GlobalStyle.placeTitle}>{this.state.base_sound.name}</Text> : null}

                            </View>
                        </View> ) : null
                    }


                    {// background sound
                        this.state.base_sound ? this.playASound(this.state.base_sound.url) : null
                    }

                </View>
            </View>
        )
    }
}

