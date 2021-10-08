import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, Validate } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
const screenWidth = Dimensions.get('window').width;

interface MessagesScreenProps {
    navigation: any;
}
const MessagesScreen = (props: MessagesScreenProps) => {


    React.useEffect(() => {
        // console.log('rtyuigfghj', props)
    }, []);



    return (

        <View style={styles.container}>
            <CustomStatusBar />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 30 }}>
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 18 }}>Mukesh Sharma</Text>
                        <View style={{ flexDirection: 'row', marginRight: 80, }}>
                            <Text style={{ marginLeft: 10, marginTop: 2, fontSize: 16, color: '#8F8F8F' }}>Lorem Ipsum is simply dummy text of the printing and type setting industry.</Text>


                        </View>

                    </View>


                </View>


                <View
                    style={{
                        height: 2,
                        width: '90%',
                        //  marginTop: 10,
                        marginLeft: 100,
                        // marginRight:10,
                        backgroundColor: '#E9E9E9',
                    }}
                />




                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 30 }}>
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 18 }}>Mukesh Sharma</Text>
                        <View style={{ flexDirection: 'row', marginRight: 80, }}>
                            <Text style={{ marginLeft: 10, marginTop: 2, fontSize: 16, color: '#8F8F8F' }}>Lorem Ipsum is simply dummy text of the printing and type setting industry.</Text>


                        </View>

                    </View>


                </View>


                <View
                    style={{
                        height: 2,
                        width: '90%',
                        //  marginTop: 10,
                        marginLeft: 100,
                        // marginRight:10,
                        backgroundColor: '#E9E9E9',
                    }}
                />




                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 30 }}>
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 18 }}>Mukesh Sharma</Text>
                        <View style={{ flexDirection: 'row', marginRight: 80, }}>
                            <Text style={{ marginLeft: 10, marginTop: 2, fontSize: 16, color: '#8F8F8F' }}>Lorem Ipsum is simply dummy text of the printing and type setting industry.</Text>


                        </View>

                    </View>


                </View>


                <View
                    style={{
                        height: 2,
                        width: '90%',
                        //  marginTop: 10,
                        marginLeft: 100,
                        // marginRight:10,
                        backgroundColor: '#E9E9E9',
                    }}
                />




                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 30 }}>
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 60 / 2 }}
                        source={Images.profile_img2}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ marginLeft: 10, marginTop: 5, fontSize: 18 }}>Mukesh Sharma</Text>
                        <View style={{ flexDirection: 'row', marginRight: 80, }}>
                            <Text style={{ marginLeft: 10, marginTop: 2, fontSize: 16, color: '#8F8F8F' }}>Lorem Ipsum is simply dummy text of the printing and type setting industry.</Text>


                        </View>

                    </View>


                </View>


                <View
                    style={{
                        height: 2,
                        width: '90%',
                        //  marginTop: 10,
                        marginLeft: 100,
                        // marginRight:10,
                        backgroundColor: '#E9E9E9',
                    }}
                />





            </ScrollView>

        </View>
    );
};

export default MessagesScreen;
