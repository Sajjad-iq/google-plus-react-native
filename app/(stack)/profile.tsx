import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FlexibleImage from '@/components/UI/FlexibleImage';
import { Avatar } from '@/components/UI/avatar';
import { SecondaryButton } from '@/components/UI/SecondaryButton';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { CreateCard } from '@/components/shared/CreateCard';
import Post from '@/components/shared/post';

export default function Profile() {
    return (
        <ScrollView style={styles.container}>
            <View >
                <FlexibleImage style={{ height: 200, overflow: 'hidden' }} />
                <Avatar size={'xLarge'} style={{ alignSelf: 'center', marginTop: -40 }} />
            </View>

            <View style={{ marginTop: 30, alignItems: 'center', gap: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>KILUA ZOLDYK</Text>
                <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center' }}>kilua description for the profile...</Text>
                <Text style={{ fontSize: 14, fontWeight: '400' }}>1 follower</Text>
                <SecondaryButton>
                    <Text style={{ color: Colors.whitePrimary, fontWeight: '500', marginVertical: 10, marginHorizontal: 25 }}>EDIT PROFILE</Text>
                </SecondaryButton>
            </View>

            <View style={{ marginTop: 40, padding: 10, gap: 15, borderTopColor: Colors.grayPrimary, borderTopWidth: 4 }}>
                <Text style={{ color: "gray", fontWeight: 'bold', fontSize: 14, marginTop: 20 }}>KILUA ZOLDYK interests</Text>
                <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Create a Collection</Text></CreateCard>
            </View>

            <View style={{ marginTop: 40, gap: 10, paddingVertical: 20 }}>
                <Post />
                <Post />
                <Post />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whitePrimary
    }
});
