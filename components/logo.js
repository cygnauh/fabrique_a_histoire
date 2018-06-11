import React from 'react';
import { Image } from 'react-native';
import GlobalStyle from '../styles/mainStyle';

export default class Logo extends React.Component {
    render() {
        return(
            <Image style={GlobalStyle.logo} source={require('../assets/images/logo/colorfulLogo.png')} />
        );
    }
}