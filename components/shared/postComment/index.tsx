import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';

interface Props {
    lastOne: boolean
}
export function PostComment(props: Props) {
    return (
        <View style={styles.wrapper}>
            <Avatar size='Small' />
            <View style={[styles.innerWrapper]} >
                <View style={{ gap: 5, flex: 1 }}>
                    <Text style={styles.arthur}>KILUA ZOLDYK</Text>
                    <Text>some text here...</Text>
                </View>

                <Text style={{ flex: 0, marginRight: 20 }}>42m</Text>
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
        paddingLeft: 20
    },
    innerWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        borderBottomColor: Colors.grayX3,
    },
    arthur: {
        fontWeight: 'bold',
        fontSize: 14
    }

});
