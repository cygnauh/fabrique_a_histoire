import React from 'react';
import {
    Button
} from 'react-native';
export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Jane's profile"
                onPress={() =>
                    navigate('Profile', { name: 'Jane' })
                }
            />
        );
    }
}