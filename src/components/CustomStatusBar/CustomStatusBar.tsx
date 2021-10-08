import React, { Component } from 'react';
import { View, StatusBar} from 'react-native';
import PropTypes from "prop-types";
import styles from './styles';
interface StatusBarProps {
    backgroundColor?: string;
  barStyle?: string;
}
interface StatusBarState {

}
export default class CustomStatusBar extends Component<StatusBarProps, StatusBarState> {

  
   static defaultProps = {
    barStyle: 'default',
    backgroundColor: 'rgb(70,50,103)',
  };
  constructor(props: StatusBarProps) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
     
        <StatusBar barStyle={this.props.barStyle} backgroundColor={this.props.backgroundColor} networkActivityIndicatorVisible={true} />
        
    );
  }

}



