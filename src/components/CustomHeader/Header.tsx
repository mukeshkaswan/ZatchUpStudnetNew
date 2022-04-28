import React, { Component } from 'react';
import { View, StatusBar, Platform, Image, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import { Text } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from '..';
interface StatusBarProps {
    backgroundColor?: string;
    barStyle?: string;
    Title?: string;
    Back?: string;
    navigation: any;

}
interface StatusBarState {

}
export default class Header extends Component<StatusBarProps, StatusBarState> {
    static defaultProps = {
        barStyle: 'default',
        backgroundColor: 'rgb(70,50,103)',
    };
    constructor(props: StatusBarProps) {
        super(props);
        this.state = {
        };
    }

    backPressed = () => {
        this.props.navigation.goBack(null);
        return true;
    }


    render() {
        return (

            <View style={{
                height: Platform.OS === 'ios' ? '10%' : '7%',
                backgroundColor: 'rgb(70,50,103)',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,

            }}>
                <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', }}>

                    {this.props.Back === 'true' ?
                        <TouchableOpacity onPress={this.backPressed}
                            style={{ marginTop: Platform.OS === 'ios' ? 30 : 10, marginLeft: 10 }} >
                            <Icon name="arrow-left" size={25} color="white" />
                        </TouchableOpacity>

                        : null}

                    {this.props.Back === 'true' ? <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            textAlignVertical: "center",
                            textAlign: "center",
                            color: 'white',
                            fontSize: hp(2.8),
                            fontFamily: 'Lato-Regular',
                            marginRight: 20,
                            marginTop: Platform.OS === 'ios' ? 30 : 5,
                        }}>{this.props.Title}</Text>
                    </View> : <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <Text style={{
                            textAlignVertical: "center",
                            textAlign: "center",
                            color: 'white',
                            fontSize: hp(2.8),
                            fontFamily: 'Lato-Regular',
                            marginTop: Platform.OS === 'ios' ? 30 : 10,
                        }}>{this.props.Title}</Text>
                    </View>}

                    {/* <Text style={{
                        // justifyContent: 'center', 
                        color: 'white',
                        // alignContent: 'center',
                        alignSelf: 'center',
                        fontFamily: 'Lato-Regular',
                        flex:1,justifyContent: "center",alignItems: "center",
                        fontSize: hp(2.8),
                        marginTop: Platform.OS === 'ios' ? 30 : 10,
                    }}>{this.props.Title}</Text> */}
                </View>




                {/* <View style={{ flex:1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{
                        color: 'white', fontFamily: 'LatoRegular',
                        fontSize: hp(2.5),justifyContent: 'center'
                    }}>eKYC</Text>

                    <Text style={{flexDirection: 'row',
                        color: 'white', fontFamily: 'LatoRegular',
                        fontSize: hp(2.5),position: 'absolute',right: 15


                    }}>Skip</Text>
                </View> */}
            </View>


            // <StatusBar barStyle={this.props.barStyle} backgroundColor={this.props.backgroundColor} networkActivityIndicatorVisible={true} />

        );
    }

}



