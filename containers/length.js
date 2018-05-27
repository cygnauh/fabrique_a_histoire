import React from 'react';
import { View, Text, Slider, Image } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';

export default class Length extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    onChange(value) {
        this.renderLength(value);
        this.setState(() => {
            return { value : value } // update value
        });
    }

    renderLength = (value) => {
        let lengthText = ['Court', 'Moyen', 'Long'],
            lengths = [];
        const currentLength = <Text style={[GlobalStyle.lengthItem, GlobalStyle.currentLength]}>{ lengthText[value] }</Text>;
        for (let key = 0, nbLengths = lengthText.length; key < nbLengths; key++) {
            const otherLength = <Text style={[GlobalStyle.lengthItem]}>{ lengthText[key] }</Text>;
            lengths.push(React.cloneElement(otherLength, { key }));
        }

        if (value !== '') {
            let key = value;
            switch (value) {
                case 0:
                    lengths.splice(0, 1, React.cloneElement(currentLength, { key }));
                    break;
                case 2:
                    lengths.splice(2, 1, React.cloneElement(currentLength, { key }));
                    break;
                default:
                    lengths.splice(1, 1, React.cloneElement(currentLength, { key }));
                    break;
            }
        }

        return (
            <View style={GlobalStyle.lengthContainer}>
                {lengths}
            </View>
        );

    };

    render() {
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                <Header onPress={() => this.props.navigation.goBack()}/>
                <View>
                    <Text style={GlobalStyle.titleContent}>Longueur du récit</Text>
                    <View style={GlobalStyle.lengthSliderContainer}>
                        <Text style={GlobalStyle.manageLength}>-</Text>
                        <View>
                            <Slider style={GlobalStyle.lengthSlider} step={1}
                                    minimumTrackTintColor={'#4D4641'}
                                    maximumValue={2}
                                    value={this.state.value}
                                    thumbImage={require('../assets/images/trackSlider.png')}
                                    onValueChange={(value) => this.onChange(value)}/>
                            {this.renderLength(this.state.value)}
                        </View>
                        <Text style={GlobalStyle.manageLength}>+</Text>
                    </View>
                </View>
                <RectangleButton content={'Continuer'} src={require('../assets/images/validate.png')} onPress={
                    () => this.props.navigation.navigate('Place', {length: this.state.value} )}/>
            </View>
        );
    }
}