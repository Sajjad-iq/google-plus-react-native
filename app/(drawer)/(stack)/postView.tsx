import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useState } from 'react';
import Post from '@/components/shared/post';
import { Colors } from '@/constants/Colors';
import { AddComment } from '@/components/others/addComment';
import KeyboardAvoidingView from '@/components/shared/KeyboardAvoidingView';
import { PostComment } from '@/components/shared/postComment';
import { useTranslation } from 'react-i18next';
import { useFetchPostByID } from '@/hooks/useFetchPostByID';
import { useGlobalData } from '@/context/GlobalContext';
import { usePostComments } from '@/hooks/usePostComments';
import { PostCommentType } from '@/types/comment';
import { useFocusEffect } from '@react-navigation/native';

export default function PostView() {

    const { t } = useTranslation();
    const { viewPostDataID } = useGlobalData()
    const [limit, setLimit] = useState(2);
    const { post, loading, fetchPost, touched } = useFetchPostByID(viewPostDataID);
    const { setCommentContent, addComment, comments, isFetchingComments, isAddingComments, commentContent, fetchComments } = usePostComments(viewPostDataID, limit, fetchPost)

    useFocusEffect(
        React.useCallback(() => {
            fetchPost();
        }, [viewPostDataID])
    );

    useFocusEffect(
        React.useCallback(() => {
            fetchComments();
        }, [limit])
    );
    return (
        <KeyboardAvoidingView >
            <FlatList
                data={comments}
                ListHeaderComponent={() => (
                    loading && !touched ? <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} /> :
                        <View style={styles.postWrapper}>
                            <Post {...post} previewMode />
                            <View style={styles.statusWrapper}>
                                <Text style={[styles.stateLabel]}>{t('post.previewFooterMessage.public')}</Text>
                            </View>
                        </View>
                )}
                contentContainerStyle={{ gap: 14, backgroundColor: Colors.whitePrimary }}
                keyExtractor={(comment: PostCommentType) => comment.id}
                onEndReached={() => comments.length > 0 && setLimit(limit + 2)} // Trigger loading more posts
                onEndReachedThreshold={0.2} // Load more when the list is halfway through
                renderItem={({ item }: { item: PostCommentType }) => (
                    <PostComment {...item} />
                )}
                ListFooterComponent={() => isFetchingComments && !loading ? (
                    <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} />
                ) : null}
            />

            <AddComment commentContent={commentContent} isAddingComment={isAddingComments} addComment={addComment} setCommentContent={setCommentContent} />
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.whitePrimary,
    },
    wrapper: {
        flex: 1,
    },
    postWrapper: {
        backgroundColor: Colors.grayPrimary,
        paddingBottom: 5,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    statusWrapper: {
        backgroundColor: Colors.whitePrimary,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    stateLabel: {
        fontSize: 14,
        color: Colors.blueX1,
    },
});
