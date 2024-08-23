import { View, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LabeledInput from '@/components/shared/LabeledInput';
import ProfileChangeCoverImages from '@/components/others/ProfileChangeCoverImages';
import ChangeLanguage from '@/components/others/ChangeLanguage';
import KeyboardAvoidingView from '@/components/shared/KeyboardAvoidingView';
import { PrimaryButton } from '@/components/UI/PrimaryButton';

export default function Settings() {

    return (
        <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, gap: 40, paddingVertical: 10, backgroundColor: Colors.whitePrimary }}>
                <View style={styles.container}>
                    <View style={{ gap: 30 }}>
                        <ProfileChangeCoverImages />
                        <LabeledInput label='First Name' placeholder='john' />
                        <LabeledInput label='Last Name' placeholder='Doe' />
                    </View>
                </View>

                <View style={[styles.container, { paddingBottom: 60 }]}>
                    <View style={{ gap: 30 }}>
                        <ChangeLanguage />
                    </View>
                </View>

                <PrimaryButton style={{ alignSelf: 'flex-end', marginBottom: 20 }} title='SAVE' />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 30,
    },
    HeaderLabel: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: '700',
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: '700',
        padding: 10,
    }
});
