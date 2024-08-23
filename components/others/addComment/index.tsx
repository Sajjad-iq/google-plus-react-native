import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/UI/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { useLayoutDirection } from '@/context/GlobalContext';

export function AddComment() {
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useTranslation();
    const { currentLayoutDirection } = useLayoutDirection()
    const flexDirection = currentLayoutDirection == 'rtl' ? 'row-reverse' : 'row'
    const align = currentLayoutDirection == 'rtl' ? 'right' : 'left'

    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputRow, { flexDirection: flexDirection }]}>
                <Avatar size={'Small'} />
                <TextInput
                    style={[styles.textArea, { textAlign: align }]}
                    placeholder={t("post.addCommentPlaceholder")}
                    placeholderTextColor={Colors.grayX2}
                    multiline={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>

            {isFocused && (
                <View style={[styles.actionsRow, { flexDirection: flexDirection }]}>
                    <View style={styles.iconsRow}>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="camera-alt" size={25} color={'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="link" size={25} color={'gray'} />
                        </TouchableOpacity>
                    </View>

                    <PrimaryButton title={t("post.postComment")} />

                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.whitePrimary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopColor: Colors.grayX3,
        borderTopWidth: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textArea: {
        flex: 1,
        backgroundColor: Colors.whitePrimary,
        borderRadius: 5,
        marginLeft: 15,
        color: Colors.text,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    iconsRow: {
        flexDirection: 'row',
        gap: 25,
    },
    iconButton: {
    }
});
