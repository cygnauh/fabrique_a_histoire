import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Animated, ActivityIndicator} from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle';
import Video from 'react-native-video';

export default class readingMode extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            // input : "hello",
            isLoading: false
        }
    }

    // componentDidMount(){
    //
    //     return fetch('https://testappfabulab.herokuapp.com/places')
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //
    //             // console.log(responseJson)
    //
    //             let random = Math.floor(Math.random() * Math.floor(responseJson.length));
    //
    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson,
    //                 randomPlace:random,
    //                 randomPlaceName:responseJson[random],
    //                 colors:responseJson.color
    //             }, function(){
    //
    //             });
    //
    //             if(this.state.randomPlaceName.url){
    //                 console.log(this.state.randomPlaceName.url)
    //             }
    //         })
    //         .catch((error) =>{
    //             console.error(error);
    //         });
    // }

    getSounds(id){

        this.setState({
            isLoading: true,
            story_not_found :  false,
            story_id_incorrect : false
        });

        if(id !==''){
            var num = parseInt(id)
            if (isNaN(num))
            {
                this.setState({
                    isLoading: false,
                    story_id_incorrect:true
                });
                console.log("not number")
            }else{
                var request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story='+num

                return fetch(request)

                    .then((response) => {
                            console.log(response.status)

                        if(response.status === 500 ){
                            this.setState({
                                story_not_found :  true,
                                isLoading: false
                            })
                        }else{
                            response.json()
                                .then((responseJson) => {
                                    // console.log(responseJson)

                                    if(responseJson && responseJson.length === 4){
                                        this.setState({
                                            base_sound :  responseJson[3].base_sound[0],
                                            story_title: responseJson[0].title

                                        }, function(){

                                        });
                                    }

                                    // console.log(this.state.base_sound)

                                    this.setState({
                                        isLoading: false,
                                    });

                                })
                        }

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

        if(this.state.isLoading){
            return(
                <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                    <Header onPress={() => this.props.navigation.goBack()}/>
                    <View style={{flex: 1,  justifyContent: 'center'}}>
                        <ActivityIndicator/>
                    </View>
                </View>
            )
        }

        return(

            <View style={[GlobalStyle.view, GlobalStyle.headerView,{ backgroundColor:this.setBackgroundColor()}]}>

                <Header onPress={() => this.props.navigation.goBack()}/>
                <View style={{ flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>

                    {this.state.story_not_found ? (<View> <Text style={{color:"#D66853"}}> Nous n'avons pas trouvé d'histoire avec ce code.</Text> </View> ) : null}
                    {this.state.story_id_incorrect ? (<View> <Text style={{color:"#D66853"}}> Il faut entrer seulement des chiffres. </Text> </View> ) : null}

                    {this.apiRequestForStorySounds()}

                    {this.state.base_sound ? (<View>

                            <View style={GlobalStyle.placeContainer}>

                                {this.state.story_title ?  <Text style={GlobalStyle.placeTitle}>{this.state.story_title}</Text> : null}

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

