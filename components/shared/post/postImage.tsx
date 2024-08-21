import { Dimensions, Image, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'


const { width: screenWidth } = Dimensions.get('window');

interface Props {
    onPress: () => void
}
export default function PostImage(props: Props) {

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
            <Pressable onPress={props.onPress}>
                <Image

                    source={imageSource}
                    style={[styles.imageContent, { height: imageHeight }]}
                    resizeMode='contain'
                />
            </Pressable>

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
