import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/UI/avatar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { useGlobalData } from '@/context/GlobalContext';

interface Props {
    submitCallback: () => void
}
export function CratePostHeader(props: Props) {
    const { t } = useTranslation();
    const { userInfo } = useGlobalData()

    return (
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', gap: 15, padding: 20,
        }}>
            <Avatar src={userInfo?.profile_avatar} size={"Medium"} />
            <View style={{ flexDirection: 'column', gap: 5, flex: 1, alignItems: 'flex-start' }}>
                <Text style={styles.arthurName} >{userInfo?.username}</Text>
                <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="earth" size={24} color={Colors.bluePrimary} />
                    <Text style={{ color: Colors.bluePrimary, fontWeight: '500' }}>{t('createPost.postState.public')}</Text>
                </View>
            </View>
            <PrimaryButton onPress={props.submitCallback} title={t('createPost.post')} />
        </View>
    )
}

const styles = StyleSheet.create({
    postButton: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
        borderRadius: 5,
    },
    postButtonText: {
        color: Colors.bluePrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    arthurName: {
        fontWeight: 'bold',
    },
}); //PrimaryButton
