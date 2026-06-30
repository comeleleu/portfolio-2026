'use client'

import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect} from 'react';
import { TextInput, useField, useLocale } from '@payloadcms/ui';

/**
 * Represents a geographic feature returned by the Photon (Komoot) Geocoding API.
 */
type Feature = {
  properties: {
    name?: string
    city?: string
    state?: string
    country?: string
    osm_key?: string
    osm_value?: string
  }
}

/**
 * Mapping of US states and Canadian provinces to their standard 2-letter abbreviations.
 */
const STATE_MAPPING: Record<string, string> = {
  // Canada
  'Alberta': 'AB',
  'British Columbia': 'BC',
  'Colombie-Britannique': 'BC',
  'Manitoba': 'MB',
  'New Brunswick': 'NB',
  'Nouveau-Brunswick': 'NB',
  'Newfoundland and Labrador': 'NL',
  'Terre-Neuve-et-Labrador': 'NL',
  'Nova Scotia': 'NS',
  'Nouvelle-Écosse': 'NS',
  'Northwest Territories': 'NT',
  'Territoires du Nord-Ouest': 'NT',
  'Nunavut': 'NU',
  'Ontario': 'ON',
  'Prince Edward Island': 'PE',
  'Île-du-Prince-Édouard': 'PE',
  'Quebec': 'QC',
  'Québec': 'QC',
  'Saskatchewan': 'SK',
  'Yukon': 'YT',

  // USA
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arizona': 'AZ',
  'Arkansas': 'AR',
  'California': 'CA',
  'Californie': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'Florida': 'FL',
  'Floride': 'FL',
  'Georgia': 'GA',
  'Géorgie': 'GA',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Louisiane': 'LA',
  'Maine': 'ME',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'Nouveau-Mexique': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'Caroline du Nord': 'NC',
  'North Dakota': 'ND',
  'Dakota du Nord': 'ND',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Pennsylvanie': 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'Caroline du Sud': 'SC',
  'South Dakota': 'SD',
  'Dakota du Sud': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virginia': 'VA',
  'Virginie': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Virginie-Occidentale': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY',
  'District of Columbia': 'DC'
};

/**
 * Formats/normalizes the state or province name to its 2-letter abbreviation if in North America.
 * 
 * @param properties - The feature properties from the Photon API.
 * @returns The 2-letter abbreviation of the state/province, or the original state name, or undefined.
 */
const getStateToDisplay = (properties: Feature['properties']) => {
  const isNorthAmerica = ['United States', 'Canada'].includes(properties.country || '');
  
  if (!isNorthAmerica || !properties.state) return undefined;

  return STATE_MAPPING[properties.state] || properties.state;
}

/**
 * A custom React client component for Payload CMS admin interface.
 * Implements a debounced location search using the Photon Komoot geocoding API.
 * 
 * Features:
 * - Debounced searches (500ms delay) to prevent hitting API rate limits.
 * - Keyboard navigation (closes suggestions dropdown with Escape).
 * - Automatic formatting of chosen suggestions with state abbreviations for US/Canada.
 * - Mouse hover and keyboard focus styling for autocomplete results.
 * 
 * @param props.path - The database field path.
 * @param props.label - Optional label for the text input.
 */
export const LocationComponent = ({ path, label }: { path: string; label?: string }) => {
  const { value, setValue } = useField<string>({ path });
  const { code: locale } = useLocale();
  const [suggestions, setSuggestions] = useState<Feature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setValue(query);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (query.length <= 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=${locale}&limit=5&layer=city&osm_tag=place`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error while searching for location:', error);
      }
    }, 500);
  };

  const focusInput = () => {
    const input = wrapperRef.current?.querySelector('input')
    input?.focus()
  }

  const handleSelect = (feature: Feature) => {
    const { name, city, country } = feature.properties;
    const stateToDisplay = getStateToDisplay(feature.properties);
    const parts = [name, stateToDisplay, country].filter((part) => part && part !== city);
    
    if (city && !parts.includes(city) && name !== city) {
        parts.splice(1, 0, city);
    }
    
    const formatted = parts.join(', ');
    setValue(formatted);
    setShowSuggestions(false);
    focusInput();
  };

  return (
    <div
      className="field-type text"
      ref={wrapperRef}
      style={{ position: 'relative', marginBottom: 'var(--spacing-field)' }}
    >
      <TextInput
        path={path}
        label={label || `Location — ${locale === 'en' ? 'English' : locale === 'fr' ? 'French' : ''}`}
        value={value || ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Escape') setShowSuggestions(false)
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
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
            borderRadius: '4px'
        }}>
          {suggestions.map((feature, i) => {
            const stateToDisplay = getStateToDisplay(feature.properties);

            return (
              <li
                key={i}
                onClick={() => handleSelect(feature)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSelect(feature)
                  }
                  if (e.key === 'Escape') {
                    setShowSuggestions(false)
                    focusInput()
                  }
                }}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--theme-elevation-150)',
                  outlineOffset: '-2px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onFocus={(e) => e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)'}
                onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <strong>{feature.properties.name}</strong>
                <div style={{ fontSize: '0.85em', opacity: 0.7 }}>
                  {[feature.properties.city, stateToDisplay, feature.properties.country]
                    .filter(Boolean)
                    .join(', ')}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
};