import { Dimensions, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'


const { width: screenWidth } = Dimensions.get('window');

export default function PostImage() {

    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const imageSource = require('@/assets/images/profile_cover.webp');

    useEffect(() => {
        // Get image dimensions using Image.resolveAssetSource
        const { width: imageWidth, height: imageHeight } = Image.resolveAssetSource(imageSource);
        const calculatedHeight = (imageHeight / imageWidth) * screenWidth;
        setImageHeight(calculatedHeight);
    }, []);

    return (
        imageHeight && (
            <Image
                source={imageSource}
                style={[styles.imageContent, { height: imageHeight }]}
                resizeMode='contain'
            />
        )
    )
}

const styles = StyleSheet.create({

    imageContent: {
        width: '100%',  // Full width of the container
        marginTop: 20,
        backgroundColor: 'black',
    },
});
