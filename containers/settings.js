import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import GlobalStyle from "../styles/mainStyle";
import FormStyle from "../styles/formStyle";
import "../utils/global";

export default class Settings extends React.Component {

    greeting = () => {
        let networkUrl = global.networkIp.filter((test) => { return test.selected === true })[0].address;
        fetch(networkUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'greeting',
            })
        }).then((response) => { // ES6 : change the context
            return response;
        }).catch((error) => {
            return error;
        });
    };

    eventOnVote = (index) => {
        let choices = global.networkIp;
        choices.map((item) => {
            item.selected = false;
        });
        choices[index].selected = true;
        this.setState({ipItems: choices}); // update view
    };

    renderImposedEvent(){
        let choices = [];
        console.log(global.networkIp);
        for (let key = 0, nbChoices = global.networkIp.length; key < nbChoices; key++) {
            const ipItem =
                <TouchableOpacity onPress={this.eventOnVote.bind(this, key, choices)}>
                    {(global.networkIp[key].selected === true)
                        ? <Text style={[FormStyle.voteItem, FormStyle.voteSelected]}>
                            {global.networkIp[key].address}</Text>
                        : <Text style={[FormStyle.voteItem, FormStyle.voteUnselected]}>
                            {global.networkIp[key].address}</Text>
                    }
                </TouchableOpacity>;
            choices.push(React.cloneElement(ipItem, { key })); // active slide
        }
        return(
            <View>
                {choices}
            </View>
        );
    }

    render() {
        return(
            <View style={[GlobalStyle.headerView, GlobalStyle.aboutPageContainer]}>
                <Header
                    leftElm="none" rightElm="back"
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
                <View style={GlobalStyle.settingsContainer}>
                    <TouchableOpacity style={GlobalStyle.settingBtnContainer} onPress={this.greeting}>
                        <Text style={GlobalStyle.settingBtn}>{'Saluer'}</Text>
                    </TouchableOpacity>
                        <Text style={[GlobalStyle.title, GlobalStyle.networkTitle]}>{"Choix du réseau IP pour le Raspi"}</Text>
                        <View>
                            {this.renderImposedEvent()}
                        </View>

                </View>
            </View>
        );
    }
}