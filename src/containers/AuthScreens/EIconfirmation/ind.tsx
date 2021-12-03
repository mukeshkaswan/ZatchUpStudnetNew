//  <View style={styles.inputContainer}>

//                 {setdatafromlist.length > 0 ? <FlatList
//                     data={setdatafromlist}
//                     // keyExtractor={item => item.id.toString()}
//                     ItemSeparatorComponent={ItemSeprator}

//                     //  ItemSeparatorComponent={this.SeparatorComponent}
//                     renderItem={({ item, index }) =>
//                         <CardView
//                             cardElevation={1}
//                             cardMaxElevation={1}
//                             cornerRadius={10}
//                             style={styles.Cardview}>

//                 <View style={styles.view_Row}>
//                   <Text style={styles.view_Tv_1}>State :</Text>
//                   <Text style={styles.view_Tv_2}>{item.ei_detail.state}</Text>
//                 </View>

//                 <View style={styles.view_Row_}>
//                   <Text style={styles.view_Tv_1}>City :</Text>
//                   <Text style={styles.view_Tv_2}>{item.ei_detail.city}</Text>
//                 </View>

//                 <View style={styles.view_Row_}>
//                   <Text style={styles.view_Tv_1}>School Name :</Text>
//                   <Text
//                     style={{
//                       marginTop: 5,
//                       fontSize: 17,
//                       color: '#565656',
//                       flexWrap: 'wrap',
//                       flex: 1,
//                       marginLeft: 5,
//                     }}>
//                     {item.ei_detail.name_of_school}
//                   </Text>
//                 </View>

//                 <View style={styles.view_Row_}>
//                   <Text style={styles.view_Tv_1}>School Address :</Text>
//                   <Text
//                     style={{
//                       marginTop: 5,
//                       fontSize: 17,
//                       color: '#565656',
//                       flexWrap: 'wrap',
//                       flex: 1,
//                       marginLeft: 5,
//                     }}>
//                     {item.ei_detail.address1 + ' ' + item.ei_detail.address2}
//                   </Text>
//                 </View>

//                 <View style={styles.view_Row_}>
//                   <Text style={styles.view_Tv_1}>University/Board :</Text>
//                   <Text style={styles.view_Tv_2}>
//                     {item.ei_detail.university}
//                   </Text>
//                 </View>

//                                 <TouchableOpacity underlayColor='none' onPress={() => DeleteSchool(item.ei_detail.id)} >
//                                     <Image
//                                         style={{
//                                             height: 30,
//                                             width: 30,

//                                             marginLeft: 20, marginRight: 5
//                                         }}
//                                         source={Images.delete}
//                                     />
//                                 </TouchableOpacity>
                            

//                             <View style={styles.view_Row}>
//                                 <Text style={styles.view_Tv_1}>State :</Text>
//                                 <Text style={styles.view_Tv_2}>{item.ei_detail.state}</Text>
//                             </View>

//                             <View style={styles.view_Row_}>
//                                 <Text style={styles.view_Tv_1}>City :</Text>
//                                 <Text style={styles.view_Tv_2}>{item.ei_detail.city}</Text>
//                             </View>

//                             <View style={styles.view_Row_}>
//                                 <Text style={styles.view_Tv_1}>School Name :</Text>
//                                 <Text style={{ marginTop: 5, fontSize: 17, color: '#565656', flexWrap: 'wrap', flex: 1, marginLeft: 5 }}>{item.ei_detail.name_of_school}</Text>
//                             </View>

//                             <View style={styles.view_Row_}>
//                                 <Text style={styles.view_Tv_1}>School Address :</Text>
//                                 <Text style={{ marginTop: 5, fontSize: 17, color: '#565656', flexWrap: 'wrap', flex: 1, marginLeft: 5 }}>{item.ei_detail.address1 + " " + item.ei_detail.address2}</Text>
//                             </View>

//                             <View style={styles.view_Row_}>
//                                 <Text style={styles.view_Tv_1}>University/Board :</Text>
//                                 <Text style={styles.view_Tv_2}>{item.ei_detail.university}</Text>
//                             </View>

//                             {item.ei_detail.course_detail.length > 0 && item.ei_detail.course_detail.map(i => {
//                                 return (<View>
//                                     <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5, }}>
//                                         <Text style={{ fontSize: 22, marginLeft: 10, color: '#191C1F', }}>Course Details</Text>

//                                         <TouchableHighlight underlayColor='none' onPress={() => { i.is_current_course == false ? props.navigation.navigate('AlumniNoEdit', { 'school_id': item.ei_detail.id, 'course_id': i.course_id, 'nameofschool': item.ei_detail.name_of_school, 'school_zatchup_id': item.ei_detail.school_code, 'course_name': i.course_name, 'description': i.description, 'roll_no': i.roll_no }) : props.navigation.navigate('EducationProfileEdit', { 'school_id': item.ei_detail.id, 'course_id': i.course_id, 'nameofschool': item.ei_detail.name_of_school, 'school_zatchup_id': item.ei_detail.school_code, 'course_name': i.course_name, 'description': i.description, 'roll_no': i.roll_no }) }}  >

//                                             <Image
//                                                 style={styles.editicon}
//                                                 source={Images.edit_icon}
//                                             />
//                                         </TouchableHighlight>


//                                     </View>
//                                     <View style={styles.view_Row_}>
//                                       <Text style={styles.view_Tv_1_copy}>
//                                         Starting Year :
//                                       </Text>
//                                       <Text style={styles.view_Tv_2}>
//                                         {standarad_i.standard_start_year}
//                                       </Text>
//                                       <TouchableOpacity
//                                         onPress={showDatepicker}>
//                                         <View style={{width: 130}}>
//                                           <TextField
//                                             placeholder={
//                                               standarad_i.standard_start_year
//                                             }
//                                             imageIcon={Images.calendar_icon}
//                                             editable={false}
//                                             value={date_copy.toString()}
//                                           />
//                                         </View>
//                                       </TouchableOpacity>

//                                       <View>

//                                         {show && (
//                                           <DateTimePicker
//                                             testID="dateTimePicker"
//                                             value={date}
//                                             mode={mode}
//                                             minDate={new Date()}
//                                             maximumDate={new Date()}
//                                             is24Hour={true}
//                                             format="YYYY-MMM-DD"
//                                             display="default"
//                                             onChange={onChange}
//                                           />
//                                         )}
//                                       </View>
//                                     </View>
//                                   </View>

//                                   {standarad_i.is_current_standard == false ? (
//                                     <View style={styles.view_Row_}>
//                                       <Text style={styles.view_Tv_1_copy}>
//                                         Ending Year :
//                                       </Text>
//                                       <Text style={styles.view_Tv_2}>
//                                         {standarad_i.standard_end_year}
//                                       </Text>
//                                     </View>
//                                   ) : (
//                                     <View style={styles.view_Row_}>
//                                       <Text style={styles.view_Tv_1_copy}>
//                                         Ending Year :
//                                       </Text>
//                                       <Text style={styles.view_Tv_2}>
//                                         {'To Current'}
//                                       </Text>
//                                       <TouchableOpacity
//                                         onPress={showDatepicker}>
//                                         <View style={{width: 130}}>
//                                           <TextField
//                                             placeholder={'To Current'}
//                                             imageIcon={Images.calendar_icon}
//                                             editable={false}
//                                             value={date_copy.toString()}
//                                           />
//                                         </View>
//                                       </TouchableOpacity>
//                                       <View>
//                                         {show && (
//                                           <DateTimePicker
//                                             testID="dateTimePicker"
//                                             value={date}
//                                             mode={mode}
//                                             minDate={new Date()}
//                                             maximumDate={new Date()}
//                                             is24Hour={true}
//                                             format="YYYY-MMM-DD"
//                                             display="default"
//                                             onChange={onChange}
//                                           />
//                                         )}
//                                       </View>
//                                     </View>

//                                     {i.is_current_course == false ? <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 7, }}>
//                                         <Text style={styles.view_Tv_1}>Ending Year :</Text>
//                                         <Text style={styles.view_Tv_2}>{i.end_year}</Text>
//                                     </View> : <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 7, }}>
//                                         <Text style={styles.view_Tv_1}>Ending Year :</Text>
//                                         <Text style={styles.view_Tv_2}>{'To Current'}</Text>
//                                     </View>}

//                                     {i.standard_detail && i.standard_detail.map(standarad_i => {
//                                         return (<View>

//                                             <CardView
//                                                 cardElevation={10}
//                                                 cardMaxElevation={10}
//                                                 cornerRadius={5}
//                                                 style={styles.Cardview}>
//                                                 <View style={{ flexDirection: 'column', marginRight: 10, marginTop: 5, }}>

//                                                     <View style={styles.view_Row_}>
//                                                         <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10, color: '#CCCCCC' }}>Standard :</Text>
//                                                         <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, color: '#565656', }}>{standarad_i.standard_name}</Text>

//                                                         {standarad_i.is_current_standard == false ? <TouchableOpacity
//                                                             //  style={{}}
//                                                             style={[styles.button_, { height: hp(2.7), borderColor: '#000', width: wp(15), alignItems: 'center', alignSelf: 'flex-end', marginTop: 5, marginLeft: 15, }]}

//                                                             // onPress={onPressSave}
//                                                             onPress={() => Skippedstandard(standarad_i.standard_id)}
//                                                         >
//                                                             <Text style={{ color: '#000', fontSize: hp(1.4), fontFamily: 'SFUIDisplay-Heavy', }}>Skipped</Text>
//                                                         </TouchableOpacity> : null}
//                                                         <TouchableOpacity
//                                                             // onPress={onPressSave}
//                                                             onPress={() => onPressEdit(standarad_i.standard_id, standarad_i.org_start_date, standarad_i.org_end_date)}
//                                                         >
//                                                             <Image
//                                                                 style={{
//                                                                     height: 25,
//                                                                     width: 25,
//                                                                     marginTop: 2,
//                                                                     marginRight: 5,
//                                                                     marginLeft: 20,
//                                                                 }}
//                                                                 source={Images.edit_icon}
//                                                             />
//                                                         </TouchableOpacity>

//                                                     </View>

//                                                     <View style={{ flexDirection: 'row', marginTop: 10, }}>
//                                                         <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10, color: '#CCCCCC' }}>
//                                                             Starting Year :
//                                                         </Text>
//                                                         <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, color: '#565656', }}>
//                                                             {standarad_i.standard_start_year}
//                                                         </Text>
//                                                         {standarad_i.standard_id == standardid && standarad_i.is_current_standard == false ? <TouchableOpacity
//                                                             onPress={showDatepicker}>
//                                                             <View style={{ width: 130, marginLeft: 13 }}>
//                                                                 <TextFieldCopy
//                                                                     placeholder={
//                                                                         standarad_i.org_start_date
//                                                                     }
//                                                                     imageIcon={Images.calendar_icon}
//                                                                     editable={false}
//                                                                     value={date_copy.toString()}
//                                                                 />
//                                                             </View>
//                                                         </TouchableOpacity> : null}

//                                                         <View>
//                                                     </View>

//                                                             {show && (
//                                                                 <DateTimePicker
//                                                                     testID="dateTimePicker"
//                                                                     value={moment(date, "YYYY-MM-DD").toDate()}
//                                                                     mode={mode}
//                                                                     minimumDate={new Date(org_start_date)}
//                                                                     maximumDate={new Date(org_end_date)}
//                                                                     is24Hour={true}
//                                                                     // format="YYYY-MMM-DD"
//                                                                     display="default"
//                                                                     onChange={onChange}
//                                                                 />
//                                                             )}

//                                                             {showendate && (
//                                                                 <DateTimePicker
//                                                                     testID="dateTimePicker"
//                                                                     value={moment(dateenddate, "YYYY-MM-DD").toDate()}
//                                                                     mode={modeenddate}
//                                                                     minimumDate={new Date(org_end_date)}
//                                                                     maximumDate={new Date()}
//                                                                     //  maximumDate={new Date('2021-01-01')}
//                                                                     is24Hour={true}
//                                                                     format="YYYY-MMM-DD"
//                                                                     display="default"
//                                                                     onChange={onChangeEndDate}
//                                                                 />
//                                                             )}


//                                                         </View>
//                                                     </View>

//                                                     {standarad_i.is_current_standard == false ? <View style={styles.view_Row_}>
//                                                         <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10, color: '#CCCCCC' }}>Ending Year :</Text>
//                                                         <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, color: '#565656', }}>{standarad_i.standard_end_year}</Text>
//                                                         {standarad_i.standard_id == standardid && standarad_i.is_current_standard == false ? <TouchableOpacity
//                                                             onPress={showDatepickerEndDate}>
//                                                             <View style={{ width: 130, marginLeft: 20, marginTop: 5 }}>
//                                                                 <TextFieldCopy
//                                                                     placeholder={
//                                                                         standarad_i.org_end_date
//                                                                     } imageIcon={Images.calendar_icon}
//                                                                     editable={false}
//                                                                     value={date_copy_end_date.toString()}
//                                                                 />
//                                                             </View>
//                                                         </TouchableOpacity> : null}
//                                                     </View> : <View style={styles.view_Row_}>
//                                                         <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10, color: '#CCCCCC' }}>Ending Year :</Text>
//                                                         <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, color: '#565656', }}>{'To Current'}</Text>
//                                                     </View>}
//                                                     {standarad_i.is_current_standard == true ? <View>
//                                                         {standarad_i.class_detail.map(class_i => {
//                                                             return (<View style={styles.view_Row_Copy}>
//                                                                 <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10, color: '#CCCCCC' }}>Section :</Text>
//                                                                 <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, color: '#565656', }}>{class_i.class_name}</Text>

//                                                             </View>)
//                                                         })}</View> : <View>
//                                                         <View style={styles.view_Row_Copy}>
//                                                             <Text style={{ marginTop: 5, fontSize: 15, marginLeft: 10, color: '#CCCCCC' }}>Section :</Text>
//                                                             <Text style={{ marginTop: 5, fontSize: 14, marginLeft: 5, color: '#565656', }}>{''}</Text>
//                                                             {standarad_i.standard_id == standardid && standarad_i.is_current_standard == false ? <View
//                                                                 style={{
//                                                                     width: 130,
//                                                                     alignSelf: 'center',
//                                                                     marginTop: -7,
//                                                                     marginLeft: 20
//                                                                 }}>
//                                                                 <CustomDropdownCopy
//                                                                     placeholder={'Section'}
//                                                                     data={classlist}
//                                                                     selectedValue={
//                                                                         KYC_type_doc_Selected
//                                                                     }
//                                                                     SelectedLanguagedata={(selectedValue) => {

//                                                                         if (selectedValue !== null) {
//                                                                             CallApiEditDropDown(selectedValue);

//                                                                         }
//                                                                     }}
//                                                                 />


//                                                             </View> : null}
//                                                         </View>
//                                                     </View>}
//                                                 </View>

//                                             </CardView>
//                                         </View>)
//                                     })}
//                                 </View>)
//                             })}
//                         </CardView>}
//                 /> : <View style={{
//                     flex: 1,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     //  backgroundColor: '#979797'
//                 }}>
//                     <Text style={{ color: '#7B7B7B', fontSize: 26, fontWeight: 'bold' }}>
//                         No School Available
//                     </Text>
//                 </View>}


//                 <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 30 }}>
//                     {setdatafromlist.length > 0 ? <CustomButton title={'Send for verification'} onPress={() => props.navigation.navigate('Personalinfo')} /> : <CustomButton title={'Send for verification'} />}
//                 </View>
//             </View>