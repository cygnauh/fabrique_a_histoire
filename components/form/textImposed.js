import React from "react";
import { Text } from "react-native";
import FormStyle from "../../styles/formStyle";

export default class FormTextImposed extends React.Component {
    constructor(props) {
        super(props);
        this.position = this.props.position;
    }
    render() {
        let position = this.position;
        switch (position) {
            case 'start':
                position = FormStyle.startItem;
                break;
            case 'end':
                position = FormStyle.endItem;
                break;
            default:
                break;
        }
        return(
            <Text style={[FormStyle.formItem, FormStyle.textItem, position]}>{this.props.value}</Text>
        );
    }
}
