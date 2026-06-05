'use client'

import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { TextInput, useField, FieldLabel } from '@payloadcms/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as Fas from '@fortawesome/free-solid-svg-icons';
import * as Fab from '@fortawesome/free-brands-svg-icons';

/**
 * Interface mapping FontAwesome icon name to its type and definition object.
 */
interface IconItem {
  name: string;
  icon: IconDefinition;
  type: 'solid' | 'brand';
}

/**
 * Filter and assemble all FontAwesome icons once when the module loads.
 */
const ALL_ICONS: IconItem[] = [
  ...Object.entries(Fas)
    .filter(([key]) => key.startsWith('fa') && key !== 'fas')
    .map(([key, value]) => ({ name: key, icon: value as IconDefinition, type: 'solid' as const })),
  ...Object.entries(Fab)
    .filter(([key]) => key.startsWith('fa') && key !== 'fab')
    .map(([key, value]) => ({ name: key, icon: value as IconDefinition, type: 'brand' as const })),
];

/**
 * Pre-selected list of common/popular icons shown when the input is focused but empty.
 */
const POPULAR_ICON_NAMES = [
  'faFileAlt',
  'faGlobe',
  'faLink',
  'faSquareLinkedin',
  'faGithub',
  'faGitlab',
];

/**
 * IconComponent allows selecting an icon from FontAwesome using search-as-you-type autocomplete.
 * 
 * Features:
 * - Local searching/filtering over 1500+ icons instantly.
 * - Icon previews for search results and the currently selected value.
 * - Displays a set of common "popular" icons when search is blank.
 * - Keyboard accessibility (Escape, Enter keys support).
 * - Styled to match the Payload CMS admin interface dark/light theme.
 */
export const IconComponent = ({ path, label }: { path: string; label?: string }) => {
  const { value, setValue } = useField<string>({ path });
  const displayLabel = label ?? 'Icon';
  const [searchText, setSearchText] = useState(value || '');
  const [prevValue, setPrevValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState<IconItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Synchronize state when the external value changes (recommended React pattern)
  if (value !== prevValue) {
    setPrevValue(value);
    setSearchText(value || '');
  }

  // Click outside detection to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchText(query);
    setShowSuggestions(true);

    if (!query.trim()) {
      // Show popular icons
      const popular = ALL_ICONS.filter((item) => POPULAR_ICON_NAMES.includes(item.name));
      setFilteredIcons(popular);
      return;
    }

    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matches = ALL_ICONS.filter((item) =>
      item.name.toLowerCase().includes(cleanQuery)
    ).slice(0, 100); // Limit results for performance
    setFilteredIcons(matches);
  };

  const focusInput = () => {
    const input = wrapperRef.current?.querySelector('input');
    input?.focus();
  };

  const handleSelect = (item: IconItem) => {
    setValue(item.name);
    setSearchText(item.name);
    setShowSuggestions(false);
    focusInput();
  };

  // Find corresponding FontAwesome icon object for the active value
  const selectedIconObj = ALL_ICONS.find((item) => item.name === value)?.icon;

  // Initialize suggestions on input focus
  const handleFocus = () => {
    if (!searchText.trim()) {
      const popular = ALL_ICONS.filter((item) => POPULAR_ICON_NAMES.includes(item.name));
      setFilteredIcons(popular);
    } else {
      const cleanQuery = searchText.toLowerCase().replace(/[^a-z0-9]/g, '');
      const matches = ALL_ICONS.filter((item) =>
        item.name.toLowerCase().includes(cleanQuery)
      ).slice(0, 100);
      setFilteredIcons(matches);
    }
    setShowSuggestions(true);
  };

  return (
    <div
      className="field-type text"
      ref={wrapperRef}
      onFocus={handleFocus}
      style={{ position: 'relative', marginBottom: 'var(--spacing-field)' }}
    >
      <FieldLabel label={displayLabel} path={path} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Selected Icon Preview container */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '4px',
          background: 'var(--theme-elevation-50)',
          fontSize: '1.2rem',
          color: selectedIconObj ? 'inherit' : 'var(--theme-elevation-400)',
          flexShrink: 0
        }}>
          {selectedIconObj ? (
            <FontAwesomeIcon icon={selectedIconObj} />
          ) : null}
        </div>
        <div style={{ flex: 1 }}>
          <TextInput
            path={path}
            label=""
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Escape') setShowSuggestions(false);
            }}
          />
        </div>
      </div>

      {showSuggestions && filteredIcons.length > 0 && (
        <ul className="suggestions-list" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-elevation-200)',
          zIndex: 100,
          listStyle: 'none',
          padding: 0,
          margin: '4px 0 0 0',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          maxHeight: '250px',
          overflowY: 'auto',
          borderRadius: '4px'
        }}>
          {filteredIcons.map((item) => (
            <li
              key={item.name}
              onClick={() => handleSelect(item)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSelect(item);
                }
                if (e.key === 'Escape') {
                  setShowSuggestions(false);
                  focusInput();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 15px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--theme-elevation-150)',
                gap: '10px',
                outlineOffset: '-2px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onFocus={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)'}
              onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '20px', display: 'flex', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--theme-elevation-800)' }}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--theme-elevation-800)' }}>{item.name}</span>
              </div>
              <span style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                background: 'var(--theme-elevation-200)',
                color: 'var(--theme-elevation-600)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              }}>
                {item.type}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
