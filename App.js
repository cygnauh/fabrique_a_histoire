
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './containers/home';
import OnBoarding from './containers/onboarding';
import Length from './containers/length';
import Form from './containers/form';

const StackNavigation = StackNavigator(
    {
        Home: { screen: Home },
        Onboarding: { screen: OnBoarding },
        Length: { screen: Length },
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