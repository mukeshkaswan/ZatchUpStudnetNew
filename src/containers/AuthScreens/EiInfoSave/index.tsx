import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, CustomHeader } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown-v2';
import CardView from 'react-native-cardview'

interface EiInfoSaveScreenProps { navigation: any }

const EiInfoSave = (props: EiInfoSaveScreenProps) => {
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            <CustomStatusBar />

            <CustomHeader Title={'School Information'} />

            <ScrollView>

                <View style={styles.inputContainer}>
                    <CardView
                        cardElevation={1}
                        cardMaxElevation={1}
                        // cornerRadius={1}
                        style={styles.Cardview}>

                        <View style={{ marginLeft: 20, marginTop: 20 }}><Text style={styles.fillText_Add}>Delhi Public School</Text></View>

                        <View style={{ marginLeft: 20, marginTop: 5 }}><Text style={styles.fillText_Add_Sub}>A-100, Sector 28 Noida, Uttar Pradesh</Text></View>

                        <View
                            style={styles.underview}
                        />

                        <View style={{ marginLeft: 20, marginTop: 25 }}><Text style={styles.fillText_Add}>Batch & Grade Details</Text></View>
                        <View style={{ flexDirection: 'row', marginLeft: 30, padding: 5, }}>
                            <Text style={styles.fillText_Add_Grade}>Grade:</Text>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 16, color: '#A5A5A5' }}>5th (Batch 2015-2016)</Text>
                                <Text style={{ marginLeft: 20, marginTop: 5, fontSize: 16, color: '#4B2A6A' }}>Complete in 1 year</Text>
                            </View>

                        </View>
                        <View
                            style={styles.underview_copy}
                        />

                        <View style={{ flexDirection: 'row', marginLeft: 30, padding: 5, marginBottom: 20, }}>
                            <Text style={styles.fillText_Add_Grade}>Grade:</Text>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 16, color: '#A5A5A5' }}>6th (Batch 2016-2017)</Text>
                                <Text style={{ marginLeft: 20, marginTop: 5, fontSize: 16, color: '#4B2A6A' }}>Complete in 1 year</Text>
                            </View>

                        </View>

                    </CardView>

                    {/* <View style={styles.fillTextContainer}><Text style={styles.fillText}>Add Batch</Text></View> */}







                    {/* <View style={{ flexDirection: 'row' }}>

            <Image source={Images.addmore_school_icon} style={styles.checkbox}></Image>
            <View style={{ marginLeft: 15, marginTop: 5 }}><Text style={styles.fillText_Add}>Add More School</Text></View>
          </View> */}

                    <View style={{ marginTop: 60, marginLeft: 20, marginRight: 20 }}>
                        <CustomButton title={'Save'} onPress={() => props.navigation.navigate('Approval')}  />
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

export default EiInfoSave;
