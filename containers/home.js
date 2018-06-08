import React from 'react';
import {Image, View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle.js';
import FormStyle from "../styles/formStyle";
import ReadingMode from "./readingMode";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            story_not_found:0,
            story_id_incorrect: 0,
            canValidate:true
        }
        this.contentText = "Entrer votre code"
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    checkingMode(code) {

        this.setState({
            canValidate:false
        })

        if(code.toUpperCase() === "FA8U"){
            this.props.navigation.navigate('Onboarding')
        }
        else {

            this.setState({
                isLoading: true,
                story_not_found: 0,
                story_id_incorrect: 0
            });

            if (code !== '') {

                if (isNaN(code)) {
                    this.setState({
                        isLoading: false,
                        story_id_incorrect: 1
                    });
                } else {

                    let num = parseInt(code)

                    let request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story=' + num;

                    return fetch(request)

                        .then((response) => {

                            if (response.status === 500) {
                                this.setState({
                                    story_not_found: 1,
                                    isLoading: false
                                })
                            } else {
                                response.json()
                                    .then((responseJson) => {
                                        if (responseJson && responseJson.length === 4) {
                                            this.setState({
                                                response:responseJson
                                            });
                                        }

                                        if(responseJson && this.state.response){
                                            this.props.navigation.navigate('ReadingMode',{responseJson: this.state.response})
                                        }
                                        // this.setState({
                                        //     isLoading: false,
                                        // });
                                    })
                            }

                            this.setState({
                                canValidate:true
                            })
                        })

                        .catch((error) => {
                            console.error(error);
                        });
                }

            }
        }
    }


    render() {
        return (
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')}/>
                <Header
                    leftElm="none" rightElm="about"
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
                <View style={GlobalStyle.titleHeader}>
                    <View style={GlobalStyle.titleContainer}>
                        <Text style={GlobalStyle.title}>Bienvenue</Text>
                        <Text style={GlobalStyle.subtitle}>dans Fabulab</Text>
                    </View>
                    <View style={GlobalStyle.line}/>
                </View>

                <View>

                </View>

                <Text style={[GlobalStyle.text, GlobalStyle.homeText]}>
                    Repérer le code de votre machine ou d'une histoire pour commencer l'expérience
                </Text>

                <View style={[GlobalStyle.homeCodeContainer]}>
                    <View>
                        {/*{this.state.story_not_found ? (*/}
                            {/*<Text style={{color: "#D66853", opacity:this.state.story_not_found}}>{"Aucune histoire n'a été trouvée."} </Text>*/}
                        {/*) : null}*/}

                        {/*{this.state.story_id_incorrect ? (*/}
                            <Text style={{color: "#D66853",opacity:this.state.story_id_incorrect, paddingTop:12}}>{"Le code est incorrect."}  </Text>
                        {/*) : null}*/}


                    </View>
                    <View>
                        { this.state.input ? <Text style={[FormStyle.errorQuestion,{paddingBottom: 20, }]}>{this.contentText}</Text> :null}
                        <TextInput
                            placeholder={this.contentText}
                            onChangeText={(text) => this.setState({input: text})}
                            style={FormStyle.inputItem}
                            autoCapitalize={'characters'}
                            maxLength={7}
                            textAlign={'center'}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {
                        if(this.state.canValidate){
                            this.checkingMode(this.state.input)
                        }
                    }}>

                        {this.state.input && this.state.input.length>3 ?

                            <Text style={[GlobalStyle.homeBtn, {textAlign:'center'}]}>{'Valider'}</Text>

                            :null}
                    </TouchableOpacity>


                    {/*<TouchableOpacity onPress={() => {*/}
                        {/*this.props.navigation.navigate('Redirection')*/}
                    {/*}}>*/}

                            {/*<Text style={{textAlign:'center'}}>{'SCAN'}</Text>*/}


                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        );
    }
}