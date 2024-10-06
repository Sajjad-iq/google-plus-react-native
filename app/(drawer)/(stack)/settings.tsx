import { View, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LabeledInput from '@/components/shared/LabeledInput';
import ProfileChangeCoverImages from '@/components/others/ProfileChangeCoverImages';
import ChangeLanguage from '@/components/others/ChangeLanguage';
import KeyboardAvoidingView from '@/components/shared/KeyboardAvoidingView';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useGlobalData } from '@/context/GlobalContext';
import { UserInfo } from '@/types/user';

export default function Settings() {
    const { t } = useTranslation();
    const { setUserInfo } = useGlobalData();

    const logOut = async () => {
        await AsyncStorage.removeItem("@user")
        setUserInfo({} as UserInfo)
        router.push("/");
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8, gap: 40, paddingVertical: 10, backgroundColor: Colors.whitePrimary }}>
                <View style={styles.container}>
                    <View style={{ gap: 30 }}>
                        <ProfileChangeCoverImages />
                        <LabeledInput label={t("settings.firstName")} />
                        <LabeledInput label={t("settings.lastName")} />
                    </View>
                </View>


                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 20 }}>
                    <PrimaryButton title={t("settings.save")} />
                    <PrimaryButton onPress={logOut} title='LogOut' />
                </View>

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
