import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/UI/avatar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { useLayoutDirection } from '@/context/GlobalContext';

export function CratePostHeader() {
    const { t } = useTranslation();
    const { currentLayoutDirection } = useLayoutDirection()
    const flexDirection = currentLayoutDirection == 'rtl' ? 'row-reverse' : 'row'

    return (
        <View style={{
            flexDirection: flexDirection, justifyContent: 'space-between', gap: 15, padding: 20,
        }}>
            <Avatar size={"Medium"} />
            <View style={{ flexDirection: 'column', gap: 5, flex: 1, alignItems: currentLayoutDirection === 'rtl' ? 'flex-end' : 'flex-start' }}>
                <Text style={styles.arthurName} >KILUA ZOLDYK</Text>
                <View style={{ flexDirection: flexDirection, gap: 5, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="earth" size={24} color={Colors.bluePrimary} />
                    <Text style={{ color: Colors.bluePrimary, fontWeight: '500' }}>{t('createPost.postState.public')}</Text>
                </View>
            </View>
            <PrimaryButton title={t('createPost.post')} />
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
