import React from 'react';
import {Image, View, Text, TouchableOpacity, StatusBar, TextInput, ActivityIndicator} from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle.js';
import FormStyle from "../styles/formStyle";
import ReadingMode from "./readingMode";
import {scaleDelta, scaleHeight} from "../utils/scale";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            story_not_found: 0,
            story_id_incorrect: 0,
            canValidate: true
        };
        this.contentText = "Entrer votre code";
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    checkingMode(code) {


        if (code.toUpperCase() === "FA8U") {
            this.setState({
                isLoading: false
            });
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

                    this.state.isLoading = true
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
                                                response: responseJson,
                                                isLoading: false
                                            });
                                        }

                                        if (responseJson && this.state.response) {
                                            this.props.navigation.navigate('ReadingMode', {
                                                responseJson: this.state.response,
                                                num: num
                                            })
                                        }
                                        this.setState({
                                            isLoading: false,
                                        });
                                    })
                            }

                            this.setState({
                                canValidate: true
                            })
                        })

                        .catch((error) => {
                            this.state.isLoading = false;
                            console.error(error);
                        });
                }

            }
        }
    }


    render() {
        return (
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Header
                    leftElm="none" rightElm="about"
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
                <View style={GlobalStyle.titleHeader}>
                    <View style={GlobalStyle.titleContainer}>
                        <Text style={GlobalStyle.title}>Bienvenue dans</Text>
                        <Image style={GlobalStyle.imageTitle} source={require("../assets/images/logo/logotypeTrame.png")}/>
                    </View>
                    <View style={GlobalStyle.line}/>
                </View>

                <View>

                </View>

                <Text style={[GlobalStyle.text, GlobalStyle.homeText]}>
                    Repérer le code de votre machine ou d'une histoire pour commencer l'expérience
                </Text>

                <View style={[GlobalStyle.homeCodeContainer]}>

                    <TouchableOpacity style={{paddingTop:30}} onPress={() => {
                        this.props.navigation.navigate('Redirection')
                    }}>
                        <Image source={require("../assets/images/scan/btnScan.png")}/>;

                        <Text style={GlobalStyle.textBtnScan}>{'SCAN POUR COMMENCER'}</Text>

                    </TouchableOpacity>
                    <View>
                        {/*ENTER BY INPUT*/}
                        <Text style={{color: "#D66853",opacity:this.state.story_id_incorrect, paddingTop:40}}>{"Le code est incorrect."}  </Text>

                    </View>

                    {/*ENTER BY INPUT*/}

                    <View>
                        {this.state.input ? <Text
                            style={[FormStyle.errorQuestion, {paddingBottom: 20}]}>{this.contentText}</Text> : null}
                        <TextInput
                            placeholder={this.contentText}
                            onChangeText={(text) => this.setState({input: text})}
                            style={FormStyle.inputItem}
                            autoCapitalize={'characters'}
                            maxLength={7}
                            textAlign={'center'}
                        />
                    </View>

                    {this.state.isLoading ?
                        (
                            <View style={{padding:10}}>
                                <ActivityIndicator/>
                            </View>
                        ) : null
                    }

                    <TouchableOpacity onPress={() => {
                        this.checkingMode(this.state.input)
                    }}>

                        {this.state.input && this.state.input.length > 3 ?

                            <Text style={[GlobalStyle.homeBtn, {textAlign: 'center'}]}>{'Valider'}</Text>

                            : null}
                    </TouchableOpacity>

                    }



                </View>
            </View>
        );
    }
}