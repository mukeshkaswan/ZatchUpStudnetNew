import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, CustomHeader } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown-v2';
interface EIInformationScreenProps { navigation: any }
import { RadioButton } from 'react-native-paper';
const EIInformation = (props: EIInformationScreenProps) => {
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

      <CustomStatusBar />

      {/* <CustomHeader Title={'School Information'} /> */}

      <ScrollView>

        <View style={styles.inputContainer}>


          <View
            style={styles.stateWrapper}>
            <View style={styles.stateInnerWrapper}>
              <Dropdown
                placeholder="State"
                dropdownOffset={{ top: 6, left: 0 }}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 0.7,
                  borderColor: 'rgba(51,51,51,0.5)',
                  justifyContent: 'center',
                  width: '100%',
                  height: '70%',
                }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                  marginLeft: '5%',
                }}
                itemTextStyle={[{ fontFamily: 'Lato-Regular', fontSize: 10 }]}
                data={[{
                  value: 'ABC',
                }, {
                  value: 'BAC',
                }, {
                  value: 'CBA',
                }]}
                //  value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}
              //  onChangeText={(value) => this.setState({month: value})}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Dropdown
                placeholder="City"
                dropdownOffset={{ top: 6, left: 0 }}
                containerStyle={{

                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 0.7,
                  borderColor: 'rgba(51,51,51,0.5)',
                  justifyContent: 'center',
                  width: '100%',
                  height: '70%',

                }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                  marginLeft: '5%',

                }}
                itemTextStyle={[{ fontFamily: 'Lato-Regular', fontSize: 10 }]}
                data={[{
                  value: 'ABC',
                }, {
                  value: 'BAC',
                }, {
                  value: 'CBA',
                }]}
                //  value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}
              // onChangeText={(value) => this.setState({month: value})}
              />
            </View>
          </View>


          <View style={styles.paddingDividerWrapper_}>
            <View style={{ flex: 1 }}>
              <Dropdown
                placeholder="Select School Name"
                dropdownOffset={{ top: 6, left: 0 }}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 0.7,
                  borderColor: 'rgba(51,51,51,0.5)',
                  justifyContent: 'center',
                  width: '100%',
                  height: '70%',
                }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                  marginLeft: '5%',
                }}
                itemTextStyle={[{ fontFamily: 'Lato-Regular', fontSize: 10 }]}
                data={[{
                  value: 'ABC',
                }, {
                  value: 'BAC',
                }, {
                  value: 'CBA',
                }]}
                // value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}
              // onChangeText={(value) => this.setState({month: value})}
              />
            </View>
          </View>


          <View style={styles.paddingDividerWrappers}>
            <TextField
              placeholder={'Enter our Address'}
              onChangeText={val => setPassword(val)} value={password}
              onIconPress={() => { }}
              multiline={true}
              numberOfLines={3}
            // value={this.state.name}
            />
          </View>

          <View style={styles.paddingDividerWrapperss}>
            <View style={{ flex: 1 }}>
              <Dropdown
                placeholder="Select Board/University"
                dropdownOffset={{ top: 6, left: 0 }}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 0.7,
                  borderColor: 'rgba(51,51,51,0.5)',
                  justifyContent: 'center',
                  width: '100%',
                  height: '70%',
                }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                  marginLeft: '5%',
                }}
                itemTextStyle={[{ fontFamily: 'Lato-Regular', fontSize: 10 }]}
                data={[{
                  value: 'ABC',
                }, {
                  value: 'BAC',
                }, {
                  value: 'CBA',
                }]}
                // value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}
              // onChangeText={(value) => this.setState({month: value})}
              />
            </View>
          </View>

          <View style={styles.fillTextContainer}><Text style={styles.fillText}>Add Batch</Text></View>



          <View
            style={styles.stateWrapper_cop}>
            <View style={styles.stateInnerWrapper}>
              <Dropdown
                placeholder="Select Grade"
                dropdownOffset={{ top: 6, left: 0 }}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 0.7,
                  borderColor: 'rgba(51,51,51,0.5)',
                  justifyContent: 'center',

                  width: '100%',
                  height: '65%',
                }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                  marginLeft: '5%',
                }}
                itemTextStyle={[{ fontFamily: 'Lato-Regular', fontSize: 10 }]}
                data={[{
                  value: 'ABC',
                }, {
                  value: 'BAC',
                }, {
                  value: 'CBA',
                }]}
                //  value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}
              //  onChangeText={(value) => this.setState({month: value})}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextField placeholder={'From'} imageIcon={Images.calendar_icon} editable={false} />
            </View>
          </View>



          <View
            style={styles.stateWrapper_copy}>
            <View style={styles.stateInnerWrapper}>
              <Dropdown
                placeholder="Select Grade"
                dropdownOffset={{ top: 6, left: 0 }}
                containerStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 0.7,
                  borderColor: 'rgba(51,51,51,0.5)',
                  justifyContent: 'center',
                  width: '100%',
                  height: '65%',
                }}
                inputContainerStyle={{
                  borderBottomColor: 'transparent',
                  marginLeft: '5%',
                }}
                itemTextStyle={[{ fontFamily: 'Lato-Regular', fontSize: 10 }]}
                data={[{
                  value: 'ABC',
                }, {
                  value: 'BAC',
                }, {
                  value: 'CBA',
                }]}
                //  value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}
              //  onChangeText={(value) => this.setState({month: value})}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TextField placeholder={'To'} imageIcon={Images.calendar_icon} editable={false} />
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <Image source={Images.addmore_school_icon} style={styles.checkbox}></Image>
            <View style={{ marginLeft: 15, marginTop: 5 }}><Text style={styles.fillText_Add}>Add More School</Text></View>
          </View>





          {/* 
          <View style={[styles.firstnameContainer, styles.inputmarginBottom]}>
              <View style={[styles.inputmarginBottom, { flex: 1, }]}>
                <Dropdown
                  placeholder="State"
                  dropdownOffset={{ top: 6, left: 0 }}
                  containerStyle={{
                    backgroundColor: '#fff', borderRadius: 12,
                    borderWidth: 0.7, borderColor: 'rgba(51,51,51,0.5)', justifyContent: "center", width: '100%'
                  }}
                  inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft: '5%' }}
                  itemTextStyle={[{ fontFamily: 'LatoRegular', fontSize: 10 }]}
                  textColor={'rgba(51,51,51,0.5)'}
                  selectedItemColor={'rgba(51,51,51,0.5)'}
                  data={[
                    {label: 'USA'},
                    {label: 'UK'},
                    {label: 'France'}
                ]}
                  // value={'State'}
                //  onChangeText={(value: any) => this.GetCity(value)}
                />
              </View>

              <View style={[styles.inputmarginBottom, { flex: 1, }]}>
                <Dropdown
                  placeholder="State"
                  dropdownOffset={{ top: 6, left: 0 }}
                  containerStyle={{
                    backgroundColor: '#fff', borderRadius: 12,
                    borderWidth: 0.7, borderColor: 'rgba(51,51,51,0.5)', justifyContent: "center", width: '100%'
                  }}
                  inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft: '5%' }}
                  itemTextStyle={[{ fontFamily: 'LatoRegular', fontSize: 10 }]}
                  textColor={'rgba(51,51,51,0.5)'}
                  selectedItemColor={'rgba(51,51,51,0.5)'}
                  data={[{
                    value: 'Banana',
                  }, {
                    value: 'Mango',
                  }, {
                    value: 'Pear',
                  }]}
                  // value={'State'}
                //  onChangeText={(value: any) => this.GetCity(value)}
                />
              </View>

            </View> */}
          {/* <View style={{ marginBottom: '5%', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>


           
            <View style={{ marginRight: '2%', marginTop: 20, alignItems: 'center', }}>
              <Dropdown
                placeholder='Select'
                dropdownOffset={{ top: 6, left: 0, }}
                containerStyle={{
                  backgroundColor: '#fff', borderRadius: 10,
                  borderWidth: 1, borderColor: 'rgba(51,51,51,0.5)', justifyContent: "center", width: '85%', padding: 5
                }}
                inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft: '5%' }}
                itemTextStyle={[{ fontFamily: 'LatoRegular', fontSize: 10 }]}
                //data={monthArr}
                // value={this.state.month}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}

              // onChangeText={(value) => this.setState({ month: value })}
              />
            </View>


          </View> */}


          {/* <View style={{ marginBottom: '5%', flex: 1, }}>

            <View style={{ flex: 1 }}>
              <Dropdown
                placeholder='Month'
                dropdownOffset={{ top: 10, left: 0 }}
                containerStyle={{
                  backgroundColor: '#fff', borderRadius: 12,
                  borderWidth: 0.7, borderColor: 'rgba(51,51,51,0.5)', justifyContent: "center", width: '100%'
                }}
                inputContainerStyle={{ borderBottomColor: 'transparent', marginLeft: '5%' }}
                itemTextStyle={[{ fontFamily: 'LatoRegular', fontSize: 10 }]}
                //  data={monthArr}
                //  value={this.state.document_type}
                textColor={'rgba(51,51,51,0.5)'}
                selectedItemColor={'rgba(51,51,51,0.5)'}

              //  onChangeText={(value: any) => this.setState({ document_type: value })}
              />
            </View>


          </View> */}

          <View>
            <CustomButton title={'Continue'} onPress={() => props.navigation.navigate('EiInfoSave')} />
          </View>
        </View>


      </ScrollView>
    </View>
  );
};

export default EIInformation;
