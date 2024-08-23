import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import RNPickerSelect from 'react-native-picker-select';

export default function ChangeLanguage() {
    const [selectedLanguage, setSelectedLanguage] = useState('EN');

    return (
        <View style={styles.labeledInput}>
            <Text style={styles.inputLabel}>Language</Text>
            <RNPickerSelect
                onValueChange={(value: any) => setSelectedLanguage(value)}
                items={[
                    { label: 'English', value: 'EN' },
                    { label: 'Arabic', value: 'AR' },
                ]}
                style={pickerSelectStyles}
                value={selectedLanguage}
                placeholder={{}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    labeledInput: {
        gap: 10,
    },
    inputLabel: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '500',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.grayX2,
        borderRadius: 4,
        color: Colors.text,
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: Colors.whitePrimary,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: Colors.grayX2,
        borderRadius: 4,
        color: Colors.text,
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: Colors.whitePrimary,
    },
});
