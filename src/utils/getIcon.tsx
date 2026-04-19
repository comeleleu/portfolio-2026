import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as Fas from '@fortawesome/free-solid-svg-icons';
import * as Fab from '@fortawesome/free-brands-svg-icons';

/**
 * Récupère un objet icône FontAwesome ou retourne directement le composant <FontAwesomeIcon />
 *
 * @param name
 * @param asComponent
 * @param className
 */
export function getIcon(name?: string | null): IconDefinition | null;
export function getIcon(name: string | null | undefined, asComponent: true, className?: string): React.ReactElement | null;
export function getIcon(
    name?: string | null,
    asComponent: boolean = false,
    className: string = ''
): IconDefinition | React.ReactElement | null {
    if (!name) return null;

    const solidIcon = (Fas as any)[name];
    const brandIcon = (Fab as any)[name];

    const icon = solidIcon || brandIcon;

    if (!icon) return null;

    if (asComponent) {
        return <FontAwesomeIcon icon={icon} className={className} />;
    }

    return icon;
}
