import * as DropdownMenu from 'zeego/dropdown-menu';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function PostOptionsMenu() {
    // Function to handle the "Delete" option click
    const handleDelete = () => {
        console.log('Delete option clicked');
        // Add your delete functionality here
    };

    // Function to handle the "Edit" option click
    const handleEdit = () => {
        console.log('Edit option clicked');
        // Add your edit functionality here
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={Colors.whitePrimary} />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                side="bottom"           // Specify the side (e.g., "top", "bottom", "left", "right")
                align="start"           // Specify the alignment (e.g., "start", "center", "end")
                alignOffset={0}         // Offset for alignment (optional)
                sideOffset={10}         // Offset for the side (optional)
                loop={false}            // Set whether the menu should loop through items
                avoidCollisions={true}  // Avoid collisions with screen edges
                collisionPadding={5}    // Padding used to avoid collisions (can be adjusted)
            >
                <DropdownMenu.Item key='Delete' onSelect={handleDelete}>
                    <DropdownMenu.ItemTitle>
                        Delete
                    </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>

                <DropdownMenu.Item key='Edit' onSelect={handleEdit}>
                    <DropdownMenu.ItemTitle>
                        Edit
                    </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>

            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
