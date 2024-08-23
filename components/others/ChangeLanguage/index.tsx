import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangeLanguage() {
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const changeLanguage = async (value: string) => {
        if (value !== i18n.language) {
            i18n.changeLanguage(value);
            setSelectedLanguage(value);
            await AsyncStorage.setItem("language", value);
        }
    };

    return (
        <View style={styles.labeledInput}>
            <Text style={styles.inputLabel}>{t("settings.language.title")}</Text>
            <RNPickerSelect
                onValueChange={(value: any) => changeLanguage(value)}
                items={[
                    { label: t("settings.language.english"), value: 'en-US' },
                    { label: t("settings.language.arabic"), value: 'ar-IQ' },
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
