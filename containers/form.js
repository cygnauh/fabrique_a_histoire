import React from 'react';
import { View, TextInput } from 'react-native';
import Header from '../components/header';
import RadioButton from '../components/radioButton';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";
import {scaleHeight} from "../utils/scale";

const data = require('../assets/data/data_structure.json');

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.state = {
            place: "dans la jungle",
            hero_who: "",
            hero_characteristic: "",
            hero_description: "",
            hero_hobbies: "",
            hero_current_action: ""
        };
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
            characteristic = this.state.hero_characteristic,
            description = this.state.hero_description,
            expression_2 = data.introduction.expression_2.filter((exp) => {return exp.selected === true}),
            hobbies = this.state.hero_hobbies,
            current_action = this.state.hero_current_action,
            place = this.state.place,
            text_elm = [expression_1[0].label, hero, characteristic, description, expression_2[0].label, hobbies, current_action, place],
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
        let question = null,
            input = <TextInput
                style={[FormStyle.inputItem, FormStyle.formItem, state !== "" && FormStyle.onChange]}
                onChangeText={(text) => this.inputOnChange(name, text)} multiline={true} placeholder={placeholder} value={state}/>;
        if (state !== "") {
            question = <TextInput style={[FormStyle.question]} editable={false} selectTextOnFocus={false} value = {placeholder}/>;
        }
        return(
            <View>
                {question}{input}
            </View>
        )
    }

    renderIntroduction() {
        return (
            <View style={FormStyle.formContainer}>
                {this.renderRadioBtn(data.introduction.expression_1)}
                {this.renderInput("hero_who", data.introduction.hero.who.placeholder, this.state.hero_who)}
                {this.renderInput("hero_characteristic", data.introduction.hero.characteristic.placeholder, this.state.hero_characteristic)}
                {this.renderInput("hero_description", data.introduction.hero.description.placeholder, this.state.hero_description)}
                {this.renderRadioBtn(data.introduction.expression_2)}
                {this.renderInput("hero_hobbies", data.introduction.hero_detail.hobbies.placeholder, this.state.hero_hobbies)}
                {this.renderInput("hero_current_action", data.introduction.hero_detail.current_action.placeholder, this.state.hero_current_action)}
                <TextInput
                    style={[FormStyle.formItem, FormStyle.placeItem]}
                    editable={false} selectTextOnFocus={false}
                    value = {this.state.place + '.'}/>
            </View>
        );
    }

    render() {

        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                {this.renderIntroduction()}
                <RectangleButton
                    content={'Imprimer'}
                    src={require('../assets/images/print.png')}
                    onPress = { this.printStory.bind(this) }/>
                {/*<Text>{'Length : ' + this.length}</Text>*/}
            </View>
        );
    }
}