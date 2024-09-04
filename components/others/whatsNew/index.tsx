import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { useGlobalData } from '@/context/GlobalContext';

interface Props {
    onPress: () => void
}
export function WhatsNew(props: Props) {
    const { userInfo } = useGlobalData()
    const { t } = useTranslation();

    return (
        <Pressable onPress={props.onPress} style={[styles.Wrapper, { flexDirection: "row" }]} >
            <View style={[styles.textWrapper, { flexDirection: "row" }]} >
                <Avatar src={userInfo.profile_avatar} size={'Medium'} />
                <Text style={styles.text}>{t("home.whatsNew")}</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <MaterialIcons name="camera-alt" size={25} color={'gray'} />
            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: Colors.whitePrimary
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        fontSize: 14,
        color: Colors.grayX2,
        fontWeight: "500"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.grayPrimary,
        width: 42,
        height: 42,
        borderRadius: 30
    }
});
