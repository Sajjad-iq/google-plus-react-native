import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileChangeCoverImages() {
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    const pickImage = async (setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {/* Cover Image */}
            <TouchableOpacity onPress={() => pickImage(setCoverImage)}>
                <Image
                    source={coverImage ? { uri: coverImage } : require('@/assets/images/profile_cover.webp')}
                    style={styles.coverImage}
                />
            </TouchableOpacity>

            {/* Avatar Image */}
            <TouchableOpacity onPress={() => pickImage(setAvatarImage)} style={styles.avatarContainer}>
                <Image
                    source={avatarImage ? { uri: avatarImage } : require('@/assets/images/ProfileImg.jpg')}
                    style={styles.avatarImage}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: Colors.whitePrimary,
    },
    coverImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: Colors.grayX2, // Placeholder color
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -80,
        borderRadius: 60,

    },
    avatarImage: {
        width: 110,
        height: 110,
        borderRadius: 60,
        borderColor: Colors.whitePrimary,
        borderWidth: 3,
        backgroundColor: Colors.grayX2, // Placeholder color
    },
});
