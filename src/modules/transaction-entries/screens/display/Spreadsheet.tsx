import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/base';
import { ITransactionEntry } from '../../types/definitions';


type Props = {
    entries: ITransactionEntry[] //array of entries
}

const Spreadsheet: React.FC<Props> = ({ entries }) => {

    return (
        <View style={styles.container}>
            <Text h4 style={{color: 'tomato', margin: 12, textAlign: 'center'}}> [Error]: Spreadsheet display type is not supported on this device!</Text>
            <Text h4 style={{color: 'grey', margin: 12, textAlign: 'center'}}> [Note]: Select another format from 'Settings' menu above.</Text>
        </View>
    )
}

Spreadsheet.defaultProps = {
    entries: []
}

export default Spreadsheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 16, color: 'black' },
});