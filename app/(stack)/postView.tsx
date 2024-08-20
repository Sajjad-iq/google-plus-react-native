import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import Post from '@/components/shared/post';
import { Colors } from '@/constants/Colors';
import { AddComment } from '@/components/others/addComment';
import KeyboardAvoidingView from '@/components/shared/KeyboardAvoidingView';
import { PostComment } from '@/components/shared/postComment';

export default function PostView() {
    return (
        <KeyboardAvoidingView >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Post />
                <View style={styles.statusWrapper}>
                    <Text style={styles.stateLabel}>Shared publicly . View activity</Text>
                </View>

                <View style={styles.commentsWrapper}>
                    <PostComment lastOne={false} />
                    <PostComment lastOne={false} />
                    <PostComment lastOne={false} />
                    <PostComment lastOne={false} />
                    <PostComment lastOne={true} />

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
        paddingTop: 20,
        backgroundColor: Colors.whitePrimary,
        gap: 20

    },
    scrollViewContent: {
        paddingVertical: 5,
        flexGrow: 1,
    },
    statusWrapper: {
        backgroundColor: Colors.whitePrimary,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    stateLabel: {
        fontSize: 14,
        color: Colors.bluePrimary,
    },
});
