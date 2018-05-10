import React from 'react';
// import Sound from 'react-native-sound';
import { View, Text, Button, ActivityIndicator,FlatList, Animated, StyleSheet, Easing} from 'react-native';
import Logo from '../components/logo';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import TimerMixin from 'react-timer-mixin';


export default class Place extends React.Component{
    constructor(props) {
        super(props);
        this.length =
        this.state = {
            value: 1,
            isLoading: true,
            opacity: new Animated.Value(0.7),
            status:false,
            length: this.props.navigation.state.params.length
        };

        this.colors =[

            '#e0650b', //volvan
            '#e3a34b', //désert
            '#f4ddac', //plage
            '#66892c', //jungle
            // '#004c34', //forêt
            '#1a507d', //lac
            '#6b9adb', //ciel
            '#c6c1b8', //montagne
            '#7d7d7d', //ville
            // '#4f4640', //grotte
        ]

        // this.color="#aaa"
        // // this.changeColor(Colors, this.color)

        this.animatedValue = new Animated.Value(0);

        setTimeout( ()=>{
            this.ShowHideTextComponentView();
        }, 3000);
    }

    animateBackgroundColor = () =>
    {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear
            }
        ).start((animation) => {

            // this.animateBackgroundColor()
            if (animation.finished) {
                this.animateBackgroundColor()
                // this.spin();
            }});

        let callback = (value) => {
            console.log(value)
        }

        let stopAnimation = function(){
            Animated.timing(
                this.animatedValue
            ).stop((value)=>{
                console.log(value)
            });

        };
        stopAnimation = stopAnimation.bind(this);

        setTimeout( ()=>{
            stopAnimation(this.animatedValue);
        }, 3000);



    }

    componentDidMount(){
        this.animateBackgroundColor();

        return fetch('https://testappfabulab.herokuapp.com/places')
            .then((response) => response.json())
            .then((responseJson) => {

                // console.log(responseJson)

                var random = Math.floor(Math.random() * Math.floor(responseJson.length));

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    randomPlace:random,
                    randomPlaceName:responseJson[random],
                    colors:responseJson.color
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    ShowHideTextComponentView = () =>{

        if(this.state.status == true)
        {
            this.setState({status: false})
        }
        else
        {
            this.setState({status: true})
        }
    }

    render() {

        const backgroundColorVar = this.animatedValue.interpolate(
            {
                inputRange:[ 0, 0.1,0.3,0.4,0.5,0.6,0.7, 1 ],
                outputRange:  this.colors
            });


        if(this.state.isLoading){
            return(
                <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                    <Header onPress={() => this.props.navigation.goBack()}/>
                    <View style={{flex: 1,  justifyContent: 'center'}}>


                        <ActivityIndicator/>
                    </View>
                </View>
            )
        }
        return(
            <Animated.View style={[GlobalStyle.view, GlobalStyle.headerView, { backgroundColor: backgroundColorVar }]}>
                <Header onPress={() => this.props.navigation.goBack()}/>

                {/*<Animated.View style = {[ styles.container, { backgroundColor: backgroundColorVar } ]}>*/}
                    {/*<Text style = { styles.text }>Animated </Text>*/}
                {/*</Animated.View>*/}

                <View>
                    <Text style={GlobalStyle.placePhrase}>Cette histoire se passe </Text>

                    <View style={GlobalStyle.placeContainer}>
                        {/*<Text>{this.state.dataSource[this.state.randomPlace].name}</Text>*/}

                        {
                            // Pass any View or Component inside the curly bracket.
                            // Here the ? Question Mark represent the ternary operator.

                            this.state.status ?  <Text style={GlobalStyle.placeTitle}>{this.state.randomPlaceName.name}</Text> : null
                        }

                    </View>
                </View>
                <RectangleButton content={'Continuer'} src={require('../assets/images/validate.png')} onPress={
                    () => this.props.navigation.navigate('Form',{place: this.state.randomPlaceName.name, length: this.state.length} )}/>
                {/*<RectangleButton title={'Continuer'()} onPress={() => this.props.navigation.navigate('Form', {place: this.state.randomPlaceName.name} )} />*/}
            </Animated.View>

        );
    }
}


const styles = StyleSheet.create({

    MainContainer :{

// Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex:1,
        margin: 10

    }

});