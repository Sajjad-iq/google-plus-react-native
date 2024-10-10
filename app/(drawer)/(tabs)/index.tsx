import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/GlobalContext';
import Post from '@/components/shared/post';
import { WhatsNew } from '@/components/others/whatsNew';
import { Pencil } from '@/components/others/Pencil';
import { CreatePost } from '@/components/others/createPost';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { PostType } from '@/types/post';
import { useFetchPosts } from '@/hooks/useFetchPosts';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function HomeScreen() {
    const { setHeaderTitle } = useHeader();
    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation();
    const [limit, setLimit] = useState(2);
    const backend = process.env.EXPO_PUBLIC_BACKEND;
    const { posts, loading, reload, stop } = useFetchPosts(`${backend}/posts?limit=${limit} `); // Initial limit set to 
    const { expoPushToken } = usePushNotifications();

    console.log(expoPushToken)
    const showHideCreatePost = () => {
        setModalVisible(!modalVisible);
    };

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t('home.title'));
        }, [setHeaderTitle, t])
    );

    return (
        <View style={{ flex: 1 }}>
            <Pencil onPress={showHideCreatePost} />
            <CreatePost postsReloadCallback={reload} hideCallback={showHideCreatePost} isActive={modalVisible} />
            {loading && posts.length === 0 ? (
                <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} />
            ) : (
                <FlatList
                    data={posts}
                    keyExtractor={(post: PostType) => post.id}
                    renderItem={({ item }: { item: PostType }) => (
                        <View style={styles.postContainer}>
                            <Post {...item} />
                        </View>
                    )}
                    ListHeaderComponent={() => <WhatsNew onPress={showHideCreatePost} />}
                    onEndReached={() => posts.length > 0 && !stop ? setLimit(limit + 2) : null} // Trigger loading more posts
                    onEndReachedThreshold={0.2} // Load more when the list is halfway through
                    ListFooterComponent={() => loading ? (
                        <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} />
                    ) : null}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        gap: 8,
        paddingTop: 8,
    },
});
