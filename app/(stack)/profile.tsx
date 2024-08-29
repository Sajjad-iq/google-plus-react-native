import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FlexibleImage from '@/components/UI/FlexibleImage';
import { Avatar } from '@/components/UI/avatar';
import { SecondaryButton } from '@/components/UI/SecondaryButton';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { CreateCard } from '@/components/UI/CreateCard';
import Post from '@/components/shared/post';
import { useTranslation } from 'react-i18next';
import { useLayoutDirection } from '@/context/GlobalContext';

export default function Profile() {
    const { t } = useTranslation();
    const { currentLayoutDirection } = useLayoutDirection()
    const align = currentLayoutDirection == 'rtl' ? 'flex-end' : 'flex-start'

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
                    <Text style={{ color: Colors.whitePrimary, fontWeight: '500', marginVertical: 10, marginHorizontal: 25 }}>{t("profile.editProfile")}</Text>
                </SecondaryButton>
            </View>

            <View style={{ marginTop: 40, padding: 10, gap: 15, borderTopColor: Colors.grayPrimary, borderTopWidth: 4, alignItems: align }}>
                <Text style={{ color: "gray", fontWeight: 'bold', fontSize: 14, marginTop: 20 }}>KILUA ZOLDYK {t("profile.interests")}</Text>
                <View style={{ gap: 10, flexDirection: "row" }}>
                    <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{t("Collections.createCollection")}</Text></CreateCard>
                </View>
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
