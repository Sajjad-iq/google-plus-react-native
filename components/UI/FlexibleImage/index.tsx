import { Dimensions, Image, ImageProps, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const { width: screenWidth } = Dimensions.get('window');

interface Props extends ImageProps {

}
export default function FlexibleImage({ ...props }: Props) {

    return (

        props.src || props.source ?
            <Image
                {...props}
                style={[styles.imageContent, { height: 300 }, props.style]}
                resizeMode='cover'
            />
            : null
    )
}

const styles = StyleSheet.create({
    imageContent: {
        width: '100%',  // Full width of the container
        backgroundColor: 'black',
    },
});
