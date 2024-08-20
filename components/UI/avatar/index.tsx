import { StyleSheet, Image } from 'react-native'
import React from 'react'

interface Props {
    src?: string
    size: "Small" | "Medium" | "Large"
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
                        styles.largeSize
            ]}
        />
    )
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 50,
    },
    smallSize: {
        width: 25,
        height: 25
    },
    mediumSize: {
        width: 40,
        height: 40
    },
    largeSize: {
        width: 65,
        height: 65
    }
});
