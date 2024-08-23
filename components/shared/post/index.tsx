import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import PostHeader from './postHeader';
import { PostFooter } from './postFooter';
import { router } from 'expo-router';
import FlexibleImage from '@/components/UI/FlexibleImage';
import { useTranslation } from 'react-i18next';

export default function Post() {

    const { t } = useTranslation();
    return (
        <View style={styles.postWrapper}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <PostHeader avatar="" userName="KILUA ZOLDYK" date={`2 ${t('post.postTimer.d')} `} status={t('post.postState.public')} />
            </View>

            <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
                <Text style={styles.textContent}>Lorem ipsum</Text>
            </View>
            <FlexibleImage onPress={() => {
                router.push("/(stack)/postView");
            }} />
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
