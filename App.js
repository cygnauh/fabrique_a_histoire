
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './containers/home';
import OnBoarding from './containers/onboarding';
import Length from './containers/length';
import Place from './containers/place';
import Form from './containers/form';
import {Animated} from "react-native";

const StackNavigation = StackNavigator(
    {
        Home: { screen: Home },
        Onboarding: { screen: OnBoarding },
        Length: { screen: Length },
        Place: { screen: Place },
        Form: { screen: Form},
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);



export default class App extends React.Component {

    render() {
        return (
                <StackNavigation/>
        );
    }
}