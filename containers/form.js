import React from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import Header from '../components/header';
import RadioButton from '../components/radioButton';
import Input from '../components/input';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";

const data = require('../assets/data/data_structure.json');

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.state = {
            place: 'dans la jungle',
            hero_who: '',
            hero_appearance: '',
            hero_hobbies: '',
            hero_current_action: ''
        }
    }

    radioBtnOnChange(index, array) {
        array.map( (item) => {
            item.selected = false;
        });
        array[index].selected = true;
        this.setState({ radioItems: array }); // update view
    }
    inputOnChange = (name, value) => {
        this.setState(() => ({ [name]: value }));
    };

    printStory() {
        // Retrieve text
        let expression_1 = data.introduction.expression_1.filter((exp) => {return exp.selected === true}),
            hero = this.state.hero_who,
            appearance = this.state.hero_appearance,
            expression_2 = data.introduction.expression_2.filter((exp) => {return exp.selected === true}),
            hobbies = this.state.hero_hobbies,
            current_action = this.state.hero_current_action,
            place = this.state.place,
            text_elm = [expression_1[0].label, hero, appearance, expression_2[0].label, hobbies, current_action, place],
            story = '';

        for (let i = 0, count = text_elm.length; i < count; i++) {
            if (i === text_elm.length - 1) {
                story += text_elm[i] + '.';
            } else {
                story += text_elm[i] + ' ';
            }
        }
        console.log(story);

        // Send a request
        let home_url = 'http://192.168.0.37:8080/',
            christine_url = 'http://192.168.43.70:8080/';
        fetch(christine_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: story
            })
        }).then(function(response) {
            console.log(response);
            return response;
        }).catch(function(error) {
            return error;
        });

        // Save the story in the database
    }

    renderRadioBtn(label) {
        return(
            <View style={FormStyle.radioGroup}>
                {label.map(
                    (item, key) => (
                        <RadioButton key = { key } button = { item } onClick = {
                            this.radioBtnOnChange.bind(this, key, label)
                        }/>
                    )
                )}
            </View>
        )
    }
    renderInput(name, placeholder, state) {
        return(
            <Input onChange={(text) => this.inputOnChange(name, text)} placeholder = { placeholder } value = { state } />
        )
    }

    renderIntroduction() {
        return (
            <View style={FormStyle.formContainer}>
                {this.renderRadioBtn(data.introduction.expression_1)}
                {this.renderInput("hero_who", data.introduction.hero.who.placeholder, this.state.hero_who)}
                {this.renderInput("hero_appearance", data.introduction.hero.appearance.placeholder, this.state.hero_appearance)}
                {this.renderRadioBtn(data.introduction.expression_2)}
                {this.renderInput("hero_hobbies", data.introduction.hero_detail.hobbies.placeholder, this.state.hero_hobbies)}
                {this.renderInput("hero_current_action", data.introduction.hero_detail.current_action.placeholder, this.state.hero_current_action)}
                <TextInput style={[FormStyle.formItem, FormStyle.placeItem]} editable={false} selectTextOnFocus={false} value = {this.state.place + '.'}/>
            </View>
        );
    }

    render() {
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                {/*<Text style={FormStyle.currentPart}>{'Introduction'.toUpperCase()}</Text>*/}
                {/*<ScrollView style={FormStyle.scrollContainer}>*/}
                    {this.renderIntroduction()}
                    {/*{this.renderIntroduction()}
                </ScrollView>*/}
                <RectangleButton content={'Imprimer'} onPress = { this.printStory.bind(this) }/>
                {/*<Text>{'Length : ' + this.length}</Text>*/}
            </View>
        );
    }
}