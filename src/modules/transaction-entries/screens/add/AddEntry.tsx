import React, { useContext, useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, CheckBox } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker'; //installation required
import { TransactionEntryContext } from '../../contexts/Contexts';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

/**
 * Type for state variable for the form
 */
type IState = {
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    description: string;
    amount: string | null;
    expense: boolean;
}

const AddEntry: React.FC = () => {

    const { createEntry } = useContext(TransactionEntryContext)!;

    const navigation = useNavigation();

    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        txnDay: date.getDate(),
        txnMonth: date.getMonth(),
        txnYear: date.getFullYear(),
        date,
        description: '',
        amount: '',
        expense: true
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <ScrollView>
            <View style={styles.container}>


                    <Text h4 style={styles.inputContainerStyle}>New Task:</Text>
                    {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
                    <View style={[styles.inputContainerStyle, { flexDirection: 'row', alignSelf: 'flex-start' }]}>
                        {Platform.OS !== "ios" && <Button
                            radius={6}
                            title={moment(state.date).format("LL")}
                            onPress={() => {
                                setShowDatePicker(true);
                            }}
                        />}
                        {showDatePicker && <DateTimePicker
                            style={styles.inputContainerStyle}
                            value={state.date}
                            mode={'date'}
                            //is24Hour={true}
                            display="default"
                            onChange={(_event: any, selectedDate: any) => {
                                const date: Date = selectedDate as Date;
                                setState({
                                    ...state,
                                    date: selectedDate,
                                    txnDay: date.getDate(),
                                    txnMonth: date.getMonth(),
                                    txnYear: date.getFullYear()
                                })
                                setShowDatePicker(Platform.OS === "ios" ? true : false);
                            }}
                        />}
                    </View>

                    <CheckBox
                        title='Urgent?'
                        containerStyle={[styles.inputContainerStyle, { marginTop: 10 }]}
                        checked={!state.expense}
                        onPress={() => { setState({ ...state, expense: !state.expense }) }}
                        style={styles.inputStyle}
                    />
                    <Input
                        label="Task"
                        placeholder="Input task..."
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={description => setState({ ...state, description })}
                        style={styles.inputStyle}
                        autoFocus= {false}
                    />
                    <Input
                        label="Deadline"
                        placeholder="dd-mm-yyy"
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={amount => setState({ ...state, amount: amount })}
                        style={styles.inputStyle}
                        autoFocus= {false}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                            title="Create"
                            onPress={() => {
                                //call create which will also make the form disappear
                                createEntry(state, navigation);
                            }}
                        /><Button style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                            title="Cancel"
                            onPress={() => {
                                //call create which will also make the form disappear
                                navigation.goBack();
                            }}
                            buttonStyle={{ backgroundColor: 'tomato' }}
                        />
                    </View>



            </View>
        </ScrollView>



    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 18
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fffff2',
        borderRadius: 10,
    },
    inputStyle: {
        backgroundColor: 'lightgrey',
        borderRadius: 6,
        height: '100%',
        padding: 6
    }
});

export default AddEntry;