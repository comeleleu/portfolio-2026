import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Fas from '@fortawesome/free-solid-svg-icons';
import * as Fab from '@fortawesome/free-brands-svg-icons';

type IconProps = {
    name?: string | null;
    className?: string;
};

export function Icon({
    name,
    className
}: IconProps): React.ReactElement | null {
    if (!name) return null;

    const solidIcon = (Fas as any)[name];
    const brandIcon = (Fab as any)[name];

    const icon = solidIcon || brandIcon;

    if (!icon) return null;

    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
        />
    );
}
