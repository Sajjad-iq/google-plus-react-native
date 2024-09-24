import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PostType } from '@/types/post';
import { useAddLike } from '@/hooks/addPostLike';


interface Props extends PostType {

}
export function PostFooter(props: Props) {

    const { toggleLike, touched, isLiked, likesCount } = useAddLike(props.id);

    return (
        <View style={[styles.container, {
            flexDirection: "row"
        }]}>
            <View style={styles.buttonWrapper} >
                <TouchableOpacity onPress={toggleLike} style={[styles.button, { backgroundColor: touched ? isLiked ? Colors.redPrimary : Colors.grayPrimary : props.your_like ? Colors.redPrimary : Colors.grayPrimary }]}>
                    <MaterialIcons name="exposure-plus-1" size={24} color={touched ? isLiked ? Colors.whitePrimary : 'gray' : props.your_like ? Colors.whitePrimary : 'gray'} />
                </TouchableOpacity>
                <Text style={styles.counterLabel}>{touched ? likesCount : props.likes_count}</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 20 }}>
                <View style={styles.buttonWrapper} >
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name="comment" size={20} color={'gray'} />
                    </TouchableOpacity>
                    <Text style={styles.counterLabel}>{props.comments_count}</Text>
                </View>

                <View style={styles.buttonWrapper} >
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name="share" size={20} color={'gray'} />
                    </TouchableOpacity>
                    <Text style={styles.counterLabel}>{0}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    counterLabel: {
        color: Colors.grayX2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: 20
    }
});
