import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text, Button, Icon } from '@rneui/base';
import { showAlert, showDeleteConfirmation } from '../../../../global/tools/show-alert';
import { ITransactionEntry } from '../../types/definitions';
import { TransactionEntryContext } from '../../contexts/Contexts';
import { useNavigation } from '@react-navigation/native';


type Props = {
    item: ITransactionEntry;
}

const EntrySectionListItem: React.FC<Props> = ({ item }) => {

    const transactionEntryContext = useContext(TransactionEntryContext);
    
    const navigation = useNavigation();
    
    const { deleteEntry } = transactionEntryContext!
    
    return (
        <View style={styles.inputContainerStyle}>
            <Text style={{ fontSize: 20 }}>Task: {item.description}</Text>
            <Text style={{ fontSize: 15 }}>[Urgent]: {item.expense ? "No" : "Very!"}</Text>
            <Text style={{ fontSize: 12 }}>Deadline: {item.amount}</Text>
            <ButtonGroup
                containerStyle={{ backgroundColor: 'lightgrey', width: '40%', borderColor: 'lightgrey' }}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="grey"
                            size={20}
                        />}
                        type="clear"
                        title="Edit"
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

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});

export default EntrySectionListItem;