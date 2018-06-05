import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
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
        this.length = this.props.navigation.state.params.length
        this.state = {
            value: 1,
            isLoading: true,
            opacity: new Animated.Value(0.7),
            status: false
        };
        this.colors = [

            '#e0650b', //volvan
            '#E3A34B', //désert
            '#f4ddac', //plage
            '#004C34', //jungle
            '#1a507d', //lac
            '#6b9adb', //ciel
            '#2F0265', //lune
            '#7d7d7d', //ville
            // '#4f4640', //grotte
        ]

        this.inputRange=[0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 1]
        this.animatedValue = new Animated.Value(0);
        this.stopAnimation = this.stopAnimation.bind(this);

        // setTimeout(() => {
        //
        // }, 3000);
    }

    stopAnimation() {
        Animated.timing(
            this.animatedValue
        ).stop((value) => {
            console.log(value)
        });

    };

    setTimeOutStopAnimation(){
        setTimeout(() => {
            // this.stopAnimation(this.animatedValue);
            this.ShowHideTextComponentView();

            this.animatedValue.setValue(this.inputRange[this.state.indexColor]);

            console.log(this.inputRange[this.state.indexColor])
            //make another animation to the color
            //display place title
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
            if (this.state.test) {
                console.log('can reseet')
                this.setTimeOutStopAnimation()

            } else {
                console.log('can not reset')
            }
        }, 300)

    }



    componentDidMount() {
        this.animateBackgroundColor();

        return fetch('https://testappfabulab.herokuapp.com/places')
            .then((response) => response.json())
            .then((responseJson) => {
                let random = Math.floor(Math.random() * Math.floor(responseJson.length));

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    randomPlace: random,
                    randomPlaceName: responseJson[random],
                    test: true,
                    colors:[]
                })

                for(let i = 0 ; i<this.state.dataSource.length; i++){

                    this.state.colors.push(this.state.dataSource[i].color)
                }

                //check the color to set the this.state.indexColor
                for(let i = 0 ; i<this.state.dataSource.length; i++){
                    if(this.state.randomPlaceName.color === this.colors[i]){
                        this.setState({
                            indexColor: i
                        })
                    }
                }






                if(this.state.colors.length>0){
                    console.log(this.state.colors)
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

        if (this.state.isLoading) {
            return (
                <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                    <Header
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator/>
                    </View>
                </View>
            )
        } else {
            return (
                <Animated.View
                    style={[GlobalStyle.view, GlobalStyle.headerView, {backgroundColor: backgroundColorVar}]}>
                    <Header onPress={() => this.props.navigation.goBack()}/>
                    <View>
                        <Text style={GlobalStyle.placePhrase}>Cette histoire se passe </Text>

                        <View style={GlobalStyle.placeContainer}>

                            {this.state.status ?
                                <Text style={GlobalStyle.placeTitle}>{this.state.randomPlaceName.name}</Text> : null}

                        </View>
                    </View>
                    <RectangleButton content={'Continuer'} src={require('../assets/images/validate.png')} onPress={
                        () => this.props.navigation.navigate('Form', {
                            place: this.state.randomPlaceName,
                            length: this.length
                        })}/>
                </Animated.View>

            );
        }

    }
}
