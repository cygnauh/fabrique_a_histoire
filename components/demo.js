import React from 'react';
import { View, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';

const Demo = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <TextInput
                placeholder="Email"
                style={styles.input}
            />
            <TextInput
                placeholder="Username"
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
            />
            <View style={{ height: 60 }} />
        </KeyboardAvoidingView>
    );
};

export default Demo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4c69a5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
        // paddingVertical: 5,
        // paddingHorizontal: 15,
        width: window.width - 30,
    },
    register:{
        marginBottom:20,
        width:window.width -100,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        backgroundColor: '#ffae',}
});
