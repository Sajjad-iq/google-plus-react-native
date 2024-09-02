import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

interface Props {
    author?: string
}
export function PostComment(props: Props) {

    const { t } = useTranslation();

    return (
        <View style={[styles.wrapper, { flexDirection: "row" }]}>
            <Avatar size='Small' />
            <View style={[styles.innerWrapper, { flexDirection: "row" }]} >
                <View style={{ gap: 5, flex: 1 }}>
                    <Text style={[styles.arthur, { textAlign: 'left' }]}>{props.author}</Text>
                    <Text>some text here...</Text>
                </View>

                <Text style={{ flex: 0, color: Colors.grayX2 }}>{`42 ${t("post.postTimer.m")}`}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 15,
        backgroundColor: Colors.whitePrimary,
        paddingHorizontal: 20
    },
    innerWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        gap: 15,
        borderBottomColor: Colors.grayX3,
    },
    arthur: {
        fontWeight: 'bold',
        fontSize: 14,
        flex: 0
    }
});
