import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import { TextField, CustomButton, CustomStatusBar, BackBtn, ModelComponent, CustomHeader, CustomDropdown } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';

interface AddCourseDetailsScreenProps { navigation: any }

const AddCourseDetails = (props: AddCourseDetailsScreenProps) => {
    const [Aadhar, setAadhar] = useState('');
    const [Name, setName] = useState('');
    const [selectedSchool, setselectedSchool] = useState('');
    const [ID, setID] = useState('');
    const [RollNo, setRollNo] = useState('');
    const [Course, setCourse] = useState('');
    const [SchoolID, setSchoolID] = useState('');
    const [Des, setDes] = useState('');
    const [allSelected, setSelected] = useState(false)
    const [value, setValue] = React.useState('first');
    const [Duration, setDuration] = useState('');


    const checkedterm = () => {
        setSelected(!allSelected)

    }
    return (
        <View style={styles.container}>

            <CustomStatusBar />

            <CustomHeader Title={'Add Course Details'} />


            {/*   <View style={styles.backbtnCss}><BackBtn navigation={this.props.navigation} /></View> */}

            <ScrollView>




                <View style={styles.inputContainer}>


                    {/* <View style={styles.view_Row_}>
                        <Text style={styles.view_Tv_1}>Delhi Public School</Text>
                        <Image
                            style={styles.checkbox}
                            source={Images.edit_icon}
                        />
                    </View> */}
                    {/* <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>

                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton value="first" />
                                <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18 }}>Student</Text>

                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: 40 }}>
                                <RadioButton value="second" />
                                <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 18 }}>Alumni</Text>

                            </View>

                        </View>


                    </RadioButton.Group> */}




                    <View>

                        <View style={{ marginTop: '1%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Enter Course Name'} onChangeText={val => setCourse(val)} value={Course}
                            />
                        </View>


                        <View style={{ marginTop: '5%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Enter Duration of the course'} onChangeText={val => setDuration(val)} value={Duration}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>

                            <View style={{ width: '48%' }}>
                                <TextField placeholder={'Start Date'} imageIcon={Images.calendar_icon} editable={false} />
                            </View>

                            <View style={{ marginLeft: '2%', width: '48%' }}>
                                <TextField placeholder={'Ending Date'} imageIcon={Images.calendar_icon} editable={false} />
                            </View>

                        </View>

                        <View style={{ marginTop: '2%', }}>
                            {/* <CustomDropdown label1="Select Standard" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={selectedSchool} SelectedLanguagedata={(selectedValue) => setselectedSchool(selectedValue)} /> */}
                        </View>

                        <View style={{ marginTop: '4%', marginLeft: 3, marginRight: 3, }}>
                            <TextField placeholder={'Select Starting year of standard'} imageIcon={Images.calendar_icon} editable={false} />
                        </View>


                        <View style={{ marginTop: '5%', marginLeft: 3, marginRight: 3, }}>
                            <TextField placeholder={'Select Ending year of standard'} imageIcon={Images.calendar_icon} editable={false} />
                        </View>




                        <View style={{ marginTop: '2%', }}>

                            {/* <CustomDropdown label1="Course Left Standard" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={selectedSchool} SelectedLanguagedata={(selectedValue) => setselectedSchool(selectedValue)} /> */}
                        </View>
                        <View style={{ marginTop: '3%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Add Description of Study...'} onChangeText={val => setDes(val)} value={Des}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: '3%', marginTop: '6%', }}>

                            <Image source={Images.addmore_school_icon} style={styles.checkbox}></Image>
                            <View style={{ marginLeft: 15, marginTop: 5 }}><Text style={styles.fillText_Add}>Add Standard</Text></View>
                        </View>

                    </View>



                    {/* <View>


                        <View style={{ marginTop: '2%', }}>
                            <CustomDropdown label1="Select Course" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={selectedSchool} onValueChange={(selectedValue) => setselectedSchool(selectedValue)} />
                        </View>

                        <View style={{ marginTop: '3%', marginLeft: 3, marginRight: 3, }}>
                            <TextField placeholder={'Date of Birth'} imageIcon={Images.calendar_icon} editable={false} />
                        </View>


                        <View style={{ marginTop: '3%', }}>

                            <CustomDropdown label1="Joining Standard" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={selectedSchool} onValueChange={(selectedValue) => setselectedSchool(selectedValue)} />
                        </View>

                        <View style={{ marginTop: '1%', }}>

                            <CustomDropdown label1="Current Standard" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={selectedSchool} onValueChange={(selectedValue) => setselectedSchool(selectedValue)} />
                        </View>
                        <View style={{ marginTop: '1%', }}>

                            <CustomDropdown label1="Select Class" value1="0" label2="ABC" value2="1" label3="ABC" value3="2" selectedValue={selectedSchool} onValueChange={(selectedValue) => setselectedSchool(selectedValue)} />
                        </View>

                        <View style={{ marginTop: '4%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Enter School ID'} keyboardType='numeric' onChangeText={val => setID(val)} value={ID}
                            />
                        </View>


                        <View style={{ marginTop: '5%', marginLeft: 2, marginRight: 2, }}>

                            <TextField placeholder={'Enter Roll Number'} keyboardType='numeric' onChangeText={val => setRollNo(val)} value={RollNo}
                            />
                        </View>


                        <View style={{ marginTop: '5%', marginLeft: 2, marginRight: 2, marginBottom: '5%', }}>

                            <TextField placeholder={'Enter Course Description'} onChangeText={val => setCourse(val)} value={Course}
                            />
                        </View>


                    </View> */}

                    <View>
                        <CustomButton title={'Submit'} onPress={() => props.navigation.navigate('Approval')} />
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

export default AddCourseDetails;
