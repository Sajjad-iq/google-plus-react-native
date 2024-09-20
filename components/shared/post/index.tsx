import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import PostHeader from './postHeader';
import { PostFooter } from './postFooter';
import { router } from 'expo-router';
import FlexibleImage from '@/components/UI/FlexibleImage';
import { PostType } from '@/types/post';
import { useGlobalData } from '@/context/GlobalContext';

interface Props extends PostType {
    previewMode?: boolean
}
export default function Post(props: Props) {

    const { setViewPostDataID } = useGlobalData()

    const previewPost = () => {
        if (props.previewMode) return

        setViewPostDataID(props.id)
        router.push("/(stack)/postView")
    }
    return (
        <View style={styles.postWrapper}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <PostHeader {...props} />
            </View>

            <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                <Text style={styles.textContent}>{props.body}</Text>
            </View>
            <TouchableOpacity onPress={previewPost} >
                <FlexibleImage src={props.image_url} />
            </TouchableOpacity>

            <PostFooter {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    postWrapper: {
        backgroundColor: 'white', // Add a background color to make the shadow visible
        shadowColor: 'rgba(149, 157, 165, 0.2)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 10, // For Android
    },
    textContent: {
        fontSize: 14,
        fontWeight: '500',
    },
});
