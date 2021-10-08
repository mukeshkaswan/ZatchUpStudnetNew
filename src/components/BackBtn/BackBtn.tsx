import React, { Component } from 'react';
import { View, Text, TextInput, Image, Pressable, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
interface AppProps {
  navigation: any;
}
interface State {

}
export default class BackBtn extends Component<AppProps, State> {
  constructor(props: AppProps) {
    super(props);
    this.backPressed = this.backPressed.bind(this);
    this.state = {

    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }
  backPressed = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    return (
     
        <TouchableOpacity onPress={this.backPressed} style={styles.buttonContainer}>
          <Icon name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
     
    );
  }

}



