import React from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
} from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import TimerMixin from 'react-timer-mixin';

export default class Place extends React.Component {
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.state = {
            value: 1,
            isLoading: true,
            opacity: new Animated.Value(0.7),
            status: false,
            buttonOpacity:0
        };
        this.colors = [
            '#7d7d7d', //ville
            '#66892C', //jungle
            '#E3A34B', //désert
            '#f4ddac', //plage
            '#F79E90',//coquillage
            '#6B9ADB', //cascade
            '#2F0265', //lune
            '#004C34', //forêt
        ]

        this.inputRange = [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 1];
        this.animatedValue = new Animated.Value(0);


    }

    setTimeOutStopAnimation() {
        setTimeout(() => {
            this.ShowHideTextComponentView();
            this.animatedValue.setValue(this.inputRange[this.state.indexColor]); //this will stop the animation and set the value
        }, 3000);
    }


    animateBackgroundColor = () => {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear
            }
        ).start((animation) => {

            if (animation.finished) {
                this.animateBackgroundColor()
            }
        });

        setTimeout(() => {
            if (!this.state.isLoading) {
                this.setTimeOutStopAnimation()
            }
        }, 300)
    };


    componentDidMount() {
        this.animateBackgroundColor();

        setTimeout(()=>{
            this.state.canContinue=true
        }, 3000);
        return fetch('https://testappfabulab.herokuapp.com/places')
            .then((response) => response.json())
            .then((responseJson) => {
                let random = Math.floor(Math.random() * Math.floor(responseJson.length));

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    randomPlace: random,
                    randomPlaceName: responseJson[random],
                    colors: []
                });

                if(this.state.randomPlaceName){
                    setTimeout(()=>{this.state.buttonOpacity=1}, 3000)

                }

                for (let i = 0; i < this.state.dataSource.length; i++) {

                    this.state.colors.push(this.state.dataSource[i].color)
                }

                //check the color to set the this.state.indexColor
                for (let i = 0; i < this.colors.length; i++) {
                    if (this.state.randomPlaceName.color === this.colors[i]) {
                        this.setState({
                            indexColor: i
                        })
                    }
                }

                //default color if there is no correspondance
                if(!this.state.indexColor){
                    this.setState({
                        indexColor: 0
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ShowHideTextComponentView = () => {

        if (this.state.status === false) {
            this.setState({status: true})
        }
    };

    render() {

        const backgroundColorVar = this.animatedValue.interpolate(
            {
                inputRange: this.inputRange,
                outputRange: this.colors
            });

        return (
            <Animated.View
                style={[
                    GlobalStyle.view,
                    GlobalStyle.headerView, {backgroundColor: backgroundColorVar}]}>
                <Header leftElm="whiteBack" centerElm="whiteLogo" rightElm="whiteAbout"
                        onPress={() => this.props.navigation.goBack()}
                        goAbout={() => this.props.navigation.navigate('About')}
                />
                <View>
                    <Text style={GlobalStyle.placePhrase}> — Cette histoire se passe... </Text>

                    <View style={GlobalStyle.placeContainer}>

                        {this.state.status ?
                            <Text style={GlobalStyle.placeTitle}>{this.state.randomPlaceName.name}</Text> : null}

                    </View>
                </View>
                <View style={{opacity:this.state.buttonOpacity}}>
                    {/*{this.state.canContinue ?*/}
                        {/*(*/}
                            <RectangleButton
                        content={'Continuer'}
                        src={require('../assets/images/validate.png')}
                        onPress={() => this.props.navigation.navigate('Form', {
                                place: this.state.randomPlaceName,
                                length: this.length})}

                    />
                        {/*) : null}*/}
                </View>


            </Animated.View>

        );

    }
}
