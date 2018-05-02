import React from 'react';
import { View, Text, Button } from 'react-native';
import Logo from '../components/logo';
import RadioButton from '../components/radioButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.state = {
            intro: [{
                label : "Il était une fois,",
                selected: true
            }, {
                label : "Il y a bien longtemps,",
                selected: false
            }, {
                label : "C'est l'histoire",
                selected: false
            }]
        }
    }

    changeRadioButton(index) {
        this.state.intro.map( (item) => {
            item.selected = false;
        });
        this.state.intro[index].selected = true;
        this.setState({ radioItems: this.state.intro });
    }

    render() {
        return(
            <View style={GlobalStyle.view}>
                <View>
                    <Button title={'Retour'.toUpperCase()} onPress={() => this.props.navigation.goBack()}/>
                    <Logo/>
                </View>
                <View style={FormStyle.radioGroup}>
                    {this.state.intro.map( (item, key) =>
                        (
                            <RadioButton key = { key } button = { item } onClick = { this.changeRadioButton.bind(this, key) }/>
                        )
                    )}
                </View>
                <Text>{'Length : ' + this.length}</Text>
            </View>
        );
    }
}