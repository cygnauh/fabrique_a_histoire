import React from 'react';
import { View, Text, Image, Button, Slider } from 'react-native';
import GlobalStyle from '../styles/main';

export default class Length extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    onChange(value) {
        this.setState(() => {
            return { value : value } // update value
        });
    }

    render() {
        return(
            <View style={GlobalStyle.view}>
                <Image style={GlobalStyle.logo} source={require('../images/colorfulLogo.png')} />
                <View>
                    <Text style={GlobalStyle.title}>Longueur du récit</Text>
                    <Slider step={1} maximumValue={2} value={this.state.value} onValueChange={(value) => this.onChange(value)}/>
                </View>
                <Button title={'Continuer'.toUpperCase()} onPress={() => this.props.navigation.navigate('Form', {length: this.state.value} )} />
            </View>
        );
    }
}