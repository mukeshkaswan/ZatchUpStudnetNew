import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

interface AppProps {
   headerTitle: String,
   navigation: any,
   headerRightcontent:any
  }
  interface State {
  
  }
class HeaderTitleWithBack extends Component<AppProps, State> {

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
      }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.backPressed()} activeOpacity={0.8} style={{position: 'absolute', height:50, width:55, justifyContent:'center', alignItems:'center', alignSelf:'baseline'}}>
                <Icon name="arrow-left" size={28} color="white" />
                </TouchableOpacity>
                <Text allowFontScaling={false} numberOfLines={1} style={styles.titleText}>{this.props.headerTitle}</Text>
            </View>
        );
    }
}

{/* <Icon name="arrow-left" size={30} color="white" /> */}

export default HeaderTitleWithBack;
