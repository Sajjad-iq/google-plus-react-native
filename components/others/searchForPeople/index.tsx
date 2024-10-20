import { TextInput, Dimensions, Platform } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useSearch } from '@/hooks/useSearch';

export default function SearchForPeople() {
    const screenWidth = Dimensions.get('window').width; // Get device width

    // Set width based on platform
    const inputWidth = Platform.OS === 'ios' ? screenWidth - 50 : screenWidth - 80;
    const { handleSearchQueryChange } = useSearch()
    return (
        <TextInput
            placeholder={"أبحث عن شخص..."}
            style={[{
                width: inputWidth, // Conditionally set width based on platform
                color: Colors.whitePrimary,
                fontSize: 16,
            }]}
            placeholderTextColor={Colors.whitePrimary}
            onChangeText={handleSearchQueryChange} // Use this to trigger search with debounce
        />
    )
}
