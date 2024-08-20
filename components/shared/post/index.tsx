import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import PostHeader from './postHeader';
import PostImage from './postImage';
import { PostFooter } from './postFooter';

export default function Post() {
    return (
        <View style={styles.postWrapper}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <PostHeader avatar="" userName="Kilua Zoldyk" date="2d" status="Public" />
            </View>

            <View style={{ paddingVertical: 0, paddingHorizontal: 20 }}>
                <Text style={styles.textContent}>Lorem ipsum</Text>
            </View>
            <PostImage />
            <PostFooter />
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
