
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './containers/home';
import OnBoarding from './containers/onboarding';
import Length from './containers/length';
import Place from './containers/place';
import Form from './containers/form/form';
import Correction from './containers/reReading';
import readingMode from './containers/readingMode';
import About from './containers/about';

const StackNavigation = StackNavigator(
    {
        Home: { screen: Home },
        Onboarding: { screen: OnBoarding },
        Length: { screen: Length },
        Place: { screen: Place },
        Form: { screen: Form },
        Correction: { screen: Correction },
        readingMode: { screen: readingMode },
        About: { screen: About},
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