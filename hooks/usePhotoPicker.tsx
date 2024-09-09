import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function usePhotoPicker() {
    const [imageUri, setImageUri] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access the photo library is required!");
                console.log("Permission required", "You need to grant permission to access photos.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.75
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setImageUri(uri);
            } else {
                console.log("Image selection was canceled or failed.");
            }
        } catch (err: any) {
            console.log(err.message || "An unknown error occurred while picking an image.");
        }
    };

    const resetImage = () => {
        setImageUri("");
    };

    return {
        imageUri,
        pickImage,
        resetImage,
        error,
    };
}
