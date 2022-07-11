import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Button, Input, Text, CheckBox } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker'; //installation required
import { TransactionEntryContext } from '../../contexts/Contexts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TransactionEntry } from '../../entities/transaction-entry.entity';
import moment from 'moment';

/**
 * Type for state variable for the form
 */
type IState = {
    id: number,
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    description: string;
    amount: string | null;
    expense: boolean
}

const EditEntry: React.FC = () => {

    const { updateEntry } = useContext(TransactionEntryContext)!;

    //const route = useRoute();
    //below is the right declaration for TypeScript but looks complicated.
    const route = useRoute<RouteProp<Record<string, { transactionEntryToEdit: TransactionEntry }>>>();
    const transactionEntryToEdit = route.params.transactionEntryToEdit;

    const navigation = useNavigation();

    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        id: transactionEntryToEdit.id,
        txnDay: transactionEntryToEdit.txnDay,
        txnMonth: transactionEntryToEdit.txnMonth,
        txnYear: transactionEntryToEdit.txnYear,
        date: new Date(transactionEntryToEdit.txnYear, transactionEntryToEdit.txnMonth, transactionEntryToEdit.txnDay),
        description: transactionEntryToEdit.description,
        amount: transactionEntryToEdit.amount,
        expense: transactionEntryToEdit.expense ? true : false
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text h4 style={styles.inputContainerStyle}>Make changes:</Text>
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
                    containerStyle={[styles.inputContainerStyle, { marginTop: 10, borderColor: '#fffff2' }]}
                    checked={!state.expense}
                    onPress={() => { setState({ ...state, expense: !state.expense }) }}
                />
                <Input
                    label="Task"
                    value={state.description}
                    placeholder="Input task here..."
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={description => setState({ ...state, description })}
                    style={styles.inputStyle}
                    autoFocus={false}
                />
                <Input
                    label="Deadline"
                    value={state.amount.toString()}
                    placeholder="dd-mm-yyy"
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={amount => setState({ ...state, amount: amount })}
                    style={styles.inputStyle}
                    autoFocus={false}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                        title="Change"
                        onPress={() => {
                            //call create which will also make the form disappear
                            //remove date before sending because it is not in the TransactionEntry table. Only the breakdown day, month, year are there
                            const { date, ...updatedTransactionEntryData } = state;
                            updateEntry(updatedTransactionEntryData, navigation);
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
        backgroundColor: '#fffff2',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 18
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fffff2'
    },
    inputStyle: {
        backgroundColor: '#F2F3F5',
        borderRadius: 6,
        height: '100%',
        padding: 6
    }
});

export default EditEntry;