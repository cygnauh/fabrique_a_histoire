import React from 'react';
import { View, Text, Button, ActivityIndicator,FlatList, Animated, StyleSheet, Easing} from 'react-native';
import Logo from '../components/logo';
import GlobalStyle from '../styles/mainStyle';
import TimerMixin from 'react-timer-mixin';


export default class Place extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isLoading: true,
            opacity: new Animated.Value(0.7)
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

        // Animated.timing(
        //         this.animatedValue
        //     ).stop(callback)




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



    // changeColor(){
    //         // setTimeout(function(){
    //             this.color = this.colors[0];
    //             return {
    //                 backgroundColor : this.color
    //             }
    //         // }, 500)
    // }

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
                    randomPlaceName:responseJson[random]
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }




    render() {

        const backgroundColorVar = this.animatedValue.interpolate(
            {
                inputRange:[ 0, 0.1, 0.3, 0.5, 0.6, 0.7, 0.8, 1 ],
                outputRange:  this.colors
            });

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <Animated.View style={[GlobalStyle.view, { backgroundColor: backgroundColorVar }]}>
                <Logo/>

                {/*<Animated.View style = {[ styles.container, { backgroundColor: backgroundColorVar } ]}>*/}
                    {/*<Text style = { styles.text }>Animated </Text>*/}
                {/*</Animated.View>*/}

                <View>
                    <Text style={GlobalStyle.titleContent}>Cette histoire se passe </Text>

                    <View style={GlobalStyle.placeContainer}>
                        {/*<Text>{this.state.dataSource[this.state.randomPlace].name}</Text>*/}
                        <Text>{this.state.randomPlaceName.name}</Text>
                    </View>
                </View>
                <Button title={'Continuer'.toUpperCase()} onPress={() => this.props.navigation.navigate('Form', {length: this.state.value} )} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});