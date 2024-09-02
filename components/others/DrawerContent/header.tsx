import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../../UI/avatar';
import { Colors } from '@/constants/Colors';
import { useGlobalData } from '@/context/GlobalContext';

export function Header() {

    const insets = useSafeAreaInsets();
    const { userInfo } = useGlobalData()

    return (
        <ImageBackground
            source={require('@/assets/images/profile_cover.webp')}  // Replace with your image path
            style={styles.wrapper}
            resizeMode="cover" // Optional: adjusts how the image is resized to fit the view
        >
            <View style={styles.userDetailsWrapper}>
                <View style={[{ marginTop: insets.top + 15 }]} >
                    <Avatar size={'Large'} src={userInfo?.picture} />
                </View>


                <View style={styles.detailsWrapper}>
                    <Text style={styles.userName}>{userInfo?.name}</Text>
                    <Text style={styles.userEmail}>{userInfo?.email}</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center', // Centers the content vertically
        alignItems: 'center',
        // Centers the content horizontally
    },
    detailsWrapper: {
        alignItems: 'flex-start',
        width: '100%',
    },
    userDetailsWrapper: {
        alignItems: 'flex-start',
        width: '100%',
        gap: 10,
    },
    userEmail: {
        color: Colors.grayPrimary,
        fontSize: 12,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.15) ', // Shadow color
        textShadowOffset: { width: -1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow blur radius
        // Optional: makes the text bold
    }, userName: {
        color: Colors.whitePrimary,
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.40)', // Shadow color
        textShadowOffset: { width: -1, height: 1 }, // Shadow offset
        textShadowRadius: 5, // Shadow blur radius
        // Optional: makes the text bold
    },
});
