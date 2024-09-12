import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import Post from '@/components/shared/post';
import { Colors } from '@/constants/Colors';
import { AddComment } from '@/components/others/addComment';
import KeyboardAvoidingView from '@/components/shared/KeyboardAvoidingView';
import { PostComment } from '@/components/shared/postComment';
import { useTranslation } from 'react-i18next';
import { useFetchPostByID } from '@/hooks/useFetchPostByID';
import { useGlobalData } from '@/context/GlobalContext';

export default function PostView() {

    const { t } = useTranslation();
    const { viewPostDataID } = useGlobalData()
    const { post, loading } = useFetchPostByID(viewPostDataID);

    return (
        loading ? <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} /> :

            <KeyboardAvoidingView >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Post {...post} previewMode />
                    <View style={styles.statusWrapper}>
                        <Text style={[styles.stateLabel]}>{t('post.previewFooterMessage.public')}</Text>
                    </View>

                    <View style={styles.commentsWrapper}>
                        <PostComment author='KILUA ZOLDYK' />
                        <PostComment author='محمد كاظم' />
                    </View>
                </ScrollView>

                <AddComment />
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
    }, commentsWrapper: {
        paddingVertical: 25,
        backgroundColor: Colors.whitePrimary,
        gap: 20,
        borderTopColor: Colors.grayPrimary,
        borderTopWidth: 2,
        marginTop: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    statusWrapper: {
        backgroundColor: Colors.whitePrimary,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    stateLabel: {
        fontSize: 14,
        color: Colors.blueX1,
    },
});
