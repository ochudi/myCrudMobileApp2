import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Icon, Text, Button } from '@rneui/base';
import { ITransactionEntry } from '../../types/definitions';
import { showDeleteConfirmation } from '../../../../global/tools/show-alert';
import { useNavigation } from '@react-navigation/native';
import { TransactionEntryContext } from '../../contexts/Contexts';
import moment from 'moment';

type Props = {
    item: ITransactionEntry;
}

const EntryFlatListItem: React.FC<Props> = ({ item }) => {

    const navigation = useNavigation();

    const transactionEntryContext = useContext(TransactionEntryContext);

    const { deleteEntry } = transactionEntryContext!
    
    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{ fontSize: 20 }}>Task: {item.description}</Text>
            <Text style={{ fontSize: 15 }}>[Urgent]: {item.expense ? "No" : "Very!"}</Text>
            <Text style={{ fontSize: 12 }}>Date: {moment([item.txnYear!, item.txnMonth!, item.txnDay!]).format('LL')}</Text>
            <Text style={{ fontSize: 12 }}>Deadline: {item.amount}</Text>
            <ButtonGroup
                containerStyle={{ backgroundColor: 'skyblue', width: '40%', borderColor: 'skyblue' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="grey"
                            size={20}
                        />}
                        type="clear"
                        title="Change"
                        titleStyle={{ fontSize: 12 }}
                        onPress={() => navigation.navigate("EditEntryScreen" as never,{transactionEntryToEdit: item} as never)}
                    />,
                    <Button
                        icon={<Icon
                            name="delete"
                            color="tomato"
                            size={20}
                        />}
                        type="clear"
                        title="Remove"
                        titleStyle={{ fontSize: 12 }}
                        onPress={() => {
                            //deleteEntry(item.id!)
                            showDeleteConfirmation(
                                "About to Delete",
                                "Are you sure that you want to remove this task?",
                                item.id!,
                                deleteEntry
                            )
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

export default EntryFlatListItem;

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});