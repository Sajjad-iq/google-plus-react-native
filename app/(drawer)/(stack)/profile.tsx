import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import FlexibleImage from '@/components/UI/FlexibleImage';
import { Avatar } from '@/components/UI/avatar';
import { SecondaryButton } from '@/components/UI/SecondaryButton';
import { Colors } from '@/constants/Colors';
import { CreateCard } from '@/components/UI/CreateCard';
import Post from '@/components/shared/post';
import { useTranslation } from 'react-i18next';
import { useGlobalData } from '@/context/GlobalContext';
import { router } from 'expo-router';
import { useFetchPosts } from '@/hooks/useFetchPosts';
import { PostType } from '@/types/post';
import { Pencil } from '@/components/others/Pencil';
import { CreatePost } from '@/components/others/createPost';

const backend = process.env.EXPO_PUBLIC_BACKEND;

export default function Profile() {
    const { t } = useTranslation();
    const { userInfo } = useGlobalData()
    const localImage = require('@/assets/images/profile_cover.webp');
    const [limit, setLimit] = useState(2);
    const { posts, loading, stop, reload } = useFetchPosts(`${backend}/posts/${userInfo?.id}?limit=${limit}`); // Initial limit set to 
    const [modalVisible, setModalVisible] = useState(false);
    const showHideCreatePost = () => {
        setModalVisible(!modalVisible);
    };

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
                    contentContainerStyle={{ paddingBottom: 10 }}
                    onEndReached={() => posts.length > 0 && !stop ? setLimit(limit + 2) : null} // Trigger loading more posts
                    onEndReachedThreshold={0.2} // Load more when the list is halfway through
                    ListFooterComponent={() => loading ? (
                        <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} />
                    ) : null}

                    ListHeaderComponent={() => (
                        <View style={styles.container}>
                            <View >
                                <FlexibleImage source={localImage} style={{ height: 200 }} />
                                <Avatar size={'xLarge'} src={userInfo?.profile_avatar} style={{ alignSelf: 'center', marginTop: -40 }} />
                            </View>

                            <View style={{ marginTop: 30, alignItems: 'center', gap: 20 }}>
                                <Text style={{ fontSize: 30, fontWeight: '700' }}>{userInfo?.username}</Text>
                                <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center' }}>kilua description for the profile...</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400' }}>1 follower</Text>
                                <SecondaryButton onPress={() => router.push("/(drawer)/(stack)/settings")}>
                                    <Text style={{ color: Colors.whitePrimary, fontWeight: '600', marginVertical: 10, marginHorizontal: 25 }}>{t("profile.editProfile")}</Text>
                                </SecondaryButton>
                            </View>

                            <View style={{ marginTop: 40, padding: 10, gap: 15, borderTopColor: Colors.grayPrimary, borderTopWidth: 4, alignItems: "flex-start" }}>
                                <Text style={{ color: "gray", fontWeight: 'bold', fontSize: 14, marginTop: 20 }}>{userInfo?.username} {t("profile.interests")}</Text>
                                <View style={{ gap: 10, flexDirection: "row" }}>
                                    <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{t("Collections.createCollection")}</Text></CreateCard>
                                </View>
                            </View>
                        </View>
                    )}

                />
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whitePrimary
        ,
        flex: 1,
    },
    postContainer: {
        gap: 8,
        paddingTop: 8,
    },
});

