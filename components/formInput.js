import React from 'react';
import {View, TextInput, Animated} from 'react-native';
import {scaleDelta} from "../utils/scale";
import FormStyle from "../styles/formStyle";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isComplete: null
        };
        this.animatedInputValue = new Animated.Value(0);
    }

    componentWillMount() {
        this.inputValue = '';
    }

    inputOnChange = (text) => {
        console.log('child :' + text);
        this.props.inputOnChange(text);
        this.inputValue = text;
        this.setState({
            isComplete: this.inputValue.length > 0
        });
    };

    onFocusField() {
        Animated.timing(this.animatedInputValue, {
            toValue: 100,
            duration: 200
        }).start();
    }

    onBlurField() {
        if (this.inputValue.length> 0) {
            return;
        }
        Animated.timing(this.animatedInputValue, {
            toValue: 0,
            duration: 200
        }).start();
    }

    render() {
        let that = this;
        let interpolatedPlaceholderPosition = that.animatedInputValue.interpolate({
            inputRange: [0, 100], outputRange: [35, 0]
        });
        let interpolatedPlaceholderSize = that.animatedInputValue.interpolate({
            inputRange: [0, 100], outputRange: [scaleDelta(12, .5), scaleDelta(10, .5)]
        });
        let borderColor = (this.state.isComplete === null)? '#999': ((this.state.isComplete === true)? '#e5e3e3': '#d00265');

        return(
            <View style={[FormStyle.underlineInputItem, { borderColor: borderColor}]}>
                <Animated.Text style={{fontSize: interpolatedPlaceholderSize, top: interpolatedPlaceholderPosition, color: '#A6A2A0'}}>
                    {this.props.placeholder}
                </Animated.Text>
                <TextInput
                    style={FormStyle.textInput}
                    onFocus={()=> {this.onFocusField()}}
                    onBlur={()=> {this.onBlurField()}}
                    onChangeText={this.inputOnChange}
                    autoCapitalize={this.props.autoCapitalize}
                    multiline={true}
                />
            </View>
        );
    }
}