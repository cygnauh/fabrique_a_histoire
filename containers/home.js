import React from 'react';
import {Image, View, Text, TouchableOpacity, StatusBar, TextInput} from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle.js';
import FormStyle from "../styles/formStyle";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.contentText = "Entrer votre code"
    }


    componentDidMount() {
        StatusBar.setHidden(true);
    }

    checkingMode(id) {

        if(id === "FA8U"){
            this.props.navigation.navigate('Onboarding')
        }
        else {

            this.setState({
                isLoading: true,
                story_not_found: false,
                story_id_incorrect: false
            });

            if (id !== '') {
                var num = parseInt(id)
                if (isNaN(num)) {
                    this.setState({
                        isLoading: false,
                        story_id_incorrect: true
                    });
                } else {
                    var request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story=' + num

                    return fetch(request)

                        .then((response) => {

                            if (response.status === 500) {
                                this.setState({
                                    story_not_found: true,
                                    isLoading: false
                                })
                            } else {
                                response.json()
                                    .then((responseJson) => {
                                        if (responseJson && responseJson.length === 4) {
                                            this.setState({
                                                base_sound: responseJson[3].base_sound[0],
                                                story_title: responseJson[0].title,
                                                sounds_added: responseJson[1].sounds_added,
                                                sounds_added_url: responseJson[2].sounds_added_url
                                            }, function () {

                                            });
                                        }

                                        if (this.state.sounds_added) {
                                            this.handleAddedSound(this.state.sounds_added_url)
                                        }

                                        this.setState({
                                            isLoading: false,
                                        });
                                    })
                            }
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
                <Text style={[GlobalStyle.text, GlobalStyle.homeText]}>
                    Repérer le code de votre machine ou d'une histoire pour commencer l'expérience
                </Text>

                <View>
                    {this.state.story_not_found ? (
                        <Text style={{color: "#D66853"}}> Nous n'avons pas trouvé d'histoire avec ce code.</Text>
                    ) : null}
                    {this.state.story_id_incorrect ? (
                        <Text style={{color: "#D66853"}}> Il faut entrer seulement des chiffres. </Text>
                    ) : null}
                    { this.state.input ? <Text style={FormStyle.errorQuestion}>{this.contentText}</Text> :null}

                    <TextInput
                        placeholder={this.contentText}
                        onChangeText={(text) => this.setState({input: text})}
                        style={[{padding: 20, fontSize: 30, borderBottom:3},FormStyle.inputItem]}
                        multiline={true}
                    />

                </View>
                <TouchableOpacity onPress={() => {
                    this.checkingMode(this.state.input)
                }}>

                {this.state.input && this.state.input.length>3 ?

                        <Text style={GlobalStyle.homeBtn}>{'Valider'}</Text>

                    :null}
                </TouchableOpacity>

            </View>
        );
    }
}