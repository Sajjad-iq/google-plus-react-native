import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';
import Post from '@/components/shared/post';
import { WhatsNew } from '@/components/others/whatsNew';
import { Pencil } from '@/components/others/Pencil';
import { CreatePost } from '@/components/others/createPost';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
    const { setHeaderTitle, setHeaderColor } = useHeader();
    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation();

    const showHideCratePost = () => {
        setModalVisible(!modalVisible)
    }
    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t('home.title'));
            setHeaderColor(Colors.redPrimary);
        }, [setHeaderTitle])
    );

    return (
        <View>
            <Pencil onPress={showHideCratePost} />
            <CreatePost hideCallback={showHideCratePost} isActive={modalVisible} />
            <ScrollView contentContainerStyle={{ gap: 10, paddingVertical: 5 }}>
                <WhatsNew onPress={showHideCratePost} />
                <Post />
                <Post />
                <Post />
                <Post />
            </ScrollView>
        </View>

    );
}
