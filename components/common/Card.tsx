import React from 'react';
import { LucideIcon } from 'lucide-react'; 

// Define a flexible type for the icon prop
type DynamicIcon = LucideIcon | string; 

// Define the comprehensive props interface for the Card component
export interface CardProps {
    icon: DynamicIcon; 
    title: string;
    description: string;
    // Optional props for styling (used by 'features' data)
    bgColor?: string; 
    iconColor?: string;
    
    // Optional prop for different card styling
    variant?: 'feature' | 'hero'; 
}

export const Card: React.FC<CardProps> = ({ 
    icon: DynamicIcon, // The icon prop can be a component or a string
    title, 
    description, 
    bgColor, 
    iconColor,
    variant = 'feature' // Default to the 'feature' look
}) => {
    const ICON_SIZE = 28;

    // --- Dynamic Class Styling based on variant ---
    let iconContainerClasses = `w-14 h-14 mb-4 rounded-xl flex items-center justify-center `;
    
    if (variant === 'feature') {
        // Feature Card (the one with colored background)
        iconContainerClasses += `${bgColor || 'bg-gray-100'} `;
    } else if (variant === 'hero') {
        // Hero Card (e.g., larger icon, no dynamic background color class)
        iconContainerClasses = `w-16 h-16 mb-4 flex items-center justify-center text-4xl `; 
    }
    
    // --- Render Logic for the Dynamic Icon ---
    const renderIcon = () => {
        if (typeof DynamicIcon === 'string') {
            // Case 1: Icon is a string (e.g., an emoji from heroFeatures)
            return <span className='text-3xl'>{DynamicIcon}</span>;
        } else {
            // Case 2: Icon is a LucideIcon component (from features)
            return <DynamicIcon size={ICON_SIZE} className={`${iconColor || 'text-gray-600'}`} />;
        }
    }

    return (
        // Main Card Container
        <div className="
            flex flex-col items-start p-6 
            bg-white rounded-xl shadow-lg 
            transition duration-300 ease-in-out transform 
            hover:shadow-xl hover:scale-[1.02]
        ">
            
            {/* Icon Container */}
            <div className={iconContainerClasses}>
                {renderIcon()}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500">
                {description}
            </p>
        </div>
    );
};