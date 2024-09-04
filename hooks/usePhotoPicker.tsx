import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function usePhotoPicker() {
    const [imageUri, setImageUri] = useState<string>();
    const [imageBlob, setImageBlob] = useState<Blob>({} as Blob);
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
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setImageUri(uri);

                const blob = await uriToBlob(uri);
                setImageBlob(blob);
            } else {
                console.log("Image selection was canceled or failed.");
            }
        } catch (err: any) {
            console.log(err.message || "An unknown error occurred while picking an image.");
        }
    };

    const uriToBlob = async (uri: string): Promise<Blob> => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return blob;
        } catch (err: any) {
            console.log("Failed to convert image URI to Blob.");
            throw err;
        }
    };

    const resetImage = () => {
        setImageUri("");
        setImageBlob({} as Blob);
    };

    return {
        imageUri,
        imageBlob,
        pickImage,
        resetImage,
        error,
    };
}
