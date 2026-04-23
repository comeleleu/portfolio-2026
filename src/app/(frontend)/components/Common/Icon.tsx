import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from '@fortawesome/free-solid-svg-icons';
import * as Fab from '@fortawesome/free-brands-svg-icons';

type IconProps = {
    name?: string | null;
    className?: string;
};

/**
 * A generic Icon component that dynamically renders a FontAwesome icon
 * based on its string name. It searches in both solid and brand icon sets.
 */
export function Icon({
    name,
    className
}: IconProps): React.ReactElement | null {
    // If no name is provided, do not render anything
    if (!name) return null;

    // Attempt to find the icon in the solid and brand icons set
    const solidIcon = (Fas as any)[name];
    const brandIcon = (Fab as any)[name];

    // Use the solid icon if found, otherwise fallback to the brand icon
    const icon = solidIcon || brandIcon;

    // If the icon is not found in either set, return null to avoid errors
    if (!icon) return null;

    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
        />
    );
}
