import React from 'react';
import { View, Text, Button, Slider } from 'react-native';
import Logo from '../components/logo';
import GlobalStyle from '../styles/mainStyle';

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
                <Logo/>
                <View>
                    <Text style={GlobalStyle.titleContent}>Longueur du récit</Text>
                    <Slider step={1}
                            maximumValue={2}
                            value={this.state.value}
                            onValueChange={(value) => this.onChange(value)}/>
                    <View style={GlobalStyle.lengthContainer}>
                        <Text>Court</Text>
                        <Text>Moyen</Text>
                        <Text>Long</Text>
                    </View>
                </View>
                <Button title={'Continuer'.toUpperCase()} onPress={() => this.props.navigation.navigate('Form', {length: this.state.value} )} />
            </View>
        );
    }
}