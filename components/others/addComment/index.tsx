import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/UI/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { useGlobalData } from '@/context/GlobalContext';

interface Props {
    setCommentContent: (content: string) => void
    addComment: () => void
    isAddingComment: boolean
    commentContent: string
}
export function AddComment(props: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useTranslation();
    const { userInfo } = useGlobalData()


    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputRow, { flexDirection: "row" }]}>
                <Avatar src={userInfo?.profile_avatar} size={'Small'} />
                <TextInput
                    style={[styles.textArea]}
                    placeholder={t("post.addCommentPlaceholder")}
                    placeholderTextColor={Colors.grayX2}
                    multiline={true}
                    onChange={(e) => props.setCommentContent(e.nativeEvent.text)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={props.commentContent}
                />
            </View>

            {isFocused && (
                <View style={[styles.actionsRow, { flexDirection: "row" }]}>
                    <View style={styles.iconsRow}>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="camera-alt" size={25} color={'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="link" size={25} color={'gray'} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ justifyContent: "center", alignItems: "center", height: 35 }}>
                        {
                            props.isAddingComment ?
                                <ActivityIndicator size="small" color={Colors.blueX1} />
                                :
                                <PrimaryButton onPress={props.addComment} title={t("post.postComment")} />
                        }
                    </View>


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
