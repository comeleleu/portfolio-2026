import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from '@fortawesome/free-solid-svg-icons';
import * as Fab from '@fortawesome/free-brands-svg-icons';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type IconProps = {
    name?: string | null;
    className?: string;
};

/**
 * A generic Icon component that dynamically renders a FontAwesome icon
 * based on its string name. It searches in solid, regular, and brand icon sets.
 */
export function Icon({
    name,
    className
}: IconProps): React.ReactElement | null {
    // If no name is provided, do not render anything
    if (!name) return null;

    const FasPack = Fas as unknown as Record<string, IconDefinition>;
    const FabPack = Fab as unknown as Record<string, IconDefinition>;

    // Attempt to find the icon in the solid, regular, and brand icons set
    const solidIcon = FasPack[name];
    const brandIcon = FabPack[name];

    // Use the solid icon if found, fallback to regular, then brand icon
    const icon = solidIcon || brandIcon;

    // If the icon is not found in any set, return null to avoid errors
    if (!icon) return null;

    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
        />
    );
}
