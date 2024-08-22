import { StyleSheet, Image, ImageProps } from 'react-native'
import React from 'react'

interface Props extends ImageProps {
    src?: string
    size: "Small" | "Medium" | "Large" | "xLarge"
}

export function Avatar(props: Props) {
    const defaultImage = require('@/assets/images/ProfileImg.jpg');
    const imageSource = props.src ? { uri: props.src } : defaultImage;

    return (
        <Image
            source={imageSource}
            style={[
                styles.avatar,
                props.size === "Small" ? styles.smallSize :
                    props.size === "Medium" ? styles.mediumSize :
                        props.size === 'xLarge' ? styles.xLargeSize :
                            styles.largeSize
                ,
                props.style
            ]}
        />
    )
}

const styles = StyleSheet.create({
    avatar: {
        flex: 0,
        borderRadius: 50,
    },
    smallSize: {
        width: 25,
        height: 25
    },
    mediumSize: {
        width: 45,
        height: 45
    },
    largeSize: {
        width: 75,
        height: 75
    },
    xLargeSize: {
        width: 90,
        height: 90
    }
});
