# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0](https://github.com/comeleleu/portfolio-2026/compare/1.1.0...1.2.0) - 2026-07-14

### Added

- Complete multi-language support across the portfolio.
- Proxy middleware for language detection and routing.
- Localized fields using Next-Intl.
- Interactive settings menu for language switching.
- Created the `robots.txt` file.

### Changed

- Improved accessibility in the navbar to include the new `SettingsMenu`.
- Refined global layout including navbar, footer, and assets.
- Optimized caching strategy by locale.

## [1.1.0](https://github.com/comeleleu/portfolio-2026/compare/1.0.10...1.1.0) - 2026-06-05

### Added

- Created the custom `Icon` field for collections.

### Changed

- Updated the `Icon` component configuration.
- Updated the `Location` visuals to match the new `Icon` field.

## [1.0.10](https://github.com/comeleleu/portfolio-2026/compare/1.0.9...1.0.10) - 2026-06-03

### Added

- Added documentation for key components and utilities.
- Created the `README.md` file.

## [1.0.9](https://github.com/comeleleu/portfolio-2026/compare/1.0.8...1.0.9) - 2026-06-02

### Changed

- Updated Navbar spacing and padding on mobile devices.

## [1.0.8](https://github.com/comeleleu/portfolio-2026/compare/1.0.7...1.0.8) - 2026-06-02

### Changed

- Adjusted layout padding and spacing.

## [1.0.7](https://github.com/comeleleu/portfolio-2026/compare/1.0.6...1.0.7) - 2026-06-02

### Fixed

- Fixed component layout spacing issues.

## [1.0.6](https://github.com/comeleleu/portfolio-2026/compare/1.0.5...1.0.6) - 2026-06-02

### Changed

- Updated UI component responsive breakpoints and layout logic for tablets.

## [1.0.5](https://github.com/comeleleu/portfolio-2026/compare/1.0.4...1.0.5) - 2026-05-20

### Fixed

- Fixed typo in the context type within the `Projects` collection.

## [1.0.4](https://github.com/comeleleu/portfolio-2026/compare/1.0.3...1.0.4) - 2026-05-19

### Changed

- Improved title readability and location display.
- Enhanced accessibility for the scroll-to-top button.

## [1.0.3](https://github.com/comeleleu/portfolio-2026/compare/1.0.2...1.0.3) - 2026-05-13

### Fixed

- Fixed dark mode display issues on devices using a light theme.

## [1.0.2](https://github.com/comeleleu/portfolio-2026/compare/1.0.1...1.0.2) - 2026-05-12

### Added

- Added favicon URL to the configuration.

### Changed

- Adjusted some template component styles.

## [1.0.1](https://github.com/comeleleu/portfolio-2026/compare/1.0.0...1.0.1) - 2026-05-12

### Changed

- Improved mobile layout and UI component styles.

## [1.0.0](https://github.com/comeleleu/portfolio-2026/compare/v1.0.0-rc.5...1.0.0) - 2026-05-11

### Added

- Integrated `Vercel Blob` for media management.
- Reconfigured database connection to support `Supabase` and `PostgreSQL`.

### Changed

- Updated `Next.js` and `Payload CMS` configurations.
- Adjusted cache tags for database requests.
- Reorganized imports and updated `package-lock.json`.

### Fixed

- Fixed cache clearing for collections.

## [1.0.0-rc.5](https://github.com/comeleleu/portfolio-2026/compare/v1.0.0-rc.4...v1.0.0-rc.5) - 2026-04-24

### Added

- Added start and end dates to `Projects` collection.

### Fixed

- Fixed active section selection logic on larger screens.

## [1.0.0-rc.4](https://github.com/comeleleu/portfolio-2026/compare/v1.0.0-rc.3...v1.0.0-rc.4) - 2026-04-23

### Changed

- Improved badge display on mobile devices.

## [1.0.0-rc.3](https://github.com/comeleleu/portfolio-2026/compare/v1.0.0-rc.2...v1.0.0-rc.3) - 2026-04-23

### Changed

- Updated all project dependencies to their latest versions.

## [v1.0.0-rc.2](https://github.com/comeleleu/portfolio-2026/compare/v0.13.0-beta...v1.0.0-rc.2) - 2026-04-23

### Changed

- Renamed the `RenderLink` component to `Link`.

## [0.13.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.12.0-beta...v0.13.0-beta) - 2026-04-23

### Added

- Created the `Icon` component to replace the `getIcon` utility.

### Changed

- Refactored icon handling to use the new `Icon` component.
- Improved documentation and code comments for icons.

## [0.12.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.11.0-beta...v0.12.0-beta) - 2026-04-22

### Added

- Added the `TitleImage` component for Experiences and Studies sections.

## [0.11.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.10.0-beta...v0.11.0-beta) - 2026-04-22

### Added

- Created the `RenderLink` component.

### Changed

- Updated collections to use the `Links` collection instead of URL fields.
- Refactored import paths and link handling across all components to use `RenderLink`.

## [0.10.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v1.0.0-rc.1...v0.10.0-beta) - 2026-04-18

### Added

- Created the `getIcon` utility.

### Changed

- Refactored icon handling across components to use the `getIcon` utility.

## [1.0.0-rc.1](https://github.com/comeleleu/portfolio-2026/compare/v0.9.0-beta...v1.0.0-rc.1) - 2026-04-17

### Added

- Added short section titles specifically for the navbar.

## [0.9.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.8.0-beta...v0.9.0-beta) - 2026-04-17

### Added

- Implemented caching and tag revalidation for collections and globals.

### Fixed

- Fixed `LocationComponent` import path.
- Fixed accessibility issues identified in Lighthouse reports.

## [0.8.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.7.0-beta...v0.8.0-beta) - 2026-04-16

### Added

- Added new media fields for experiences and studies.

### Changed

- Major visual overhaul: updated color palette to use zinc and oklch, adjusted typography and spacing.
- Improved external link handling.
- Cleaned up unused CSS classes and unified component code.

## [0.7.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.6.0-beta...v0.7.0-beta) - 2026-03-26

### Changed

- Completely redesigned the navbar.
- Adjusted all sections to align with the new design.

## [0.6.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.5.0-beta...v0.6.0-beta) - 2026-02-24

### Added

- Created the `Schools` and `Studies` collections and corresponding templates.

## [0.5.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.4.0-beta...v0.5.0-beta) - 2026-02-23

### Added

- Created the `Links` and `Medias` collections.
- Created the `Sections` globals.
- Created globals tables for sections.
- Created models for specific fields.
- Created the custom field `RichText`.

### Changed

- Adjusted templates to display the new collections and globals data.

## [0.4.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.3.0-beta...v0.4.0-beta) - 2026-02-18

### Added

- Created the `Companies` and `Experiences` collections.
- Created the custom field `Location` to retrieve structured location data.
- Integrated Photon API calls for locations.
- Created the `getDate` utility to format dates.
- Created `sectionHeader` and `noResultMessage` sub-components.

### Changed

- Reorganized file structure.
- Applied minor fixes to templates.
- Adjusted Tag field labels and templates.

## [0.3.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.2.0-beta...v0.3.0-beta) - 2026-02-18

### Added

- Created the `Projects` and `Tags` collections.
- Implemented rich-text for the Description sub-component.

### Changed

- Adjusted `Projects` collection fields and associated templates.
- Adjusted `Projects` and `Tags` templates to fetch content lists from Payload.

### Fixed

- Fixed the display of empty tags.

## [0.2.0-beta](https://github.com/comeleleu/portfolio-2026/compare/v0.1.0-alpha.3...v0.2.0-beta) - 2026-02-12

### Added

- Integrated [Payload CMS](https://payloadcms.com/) into the project.

## [0.1.0-alpha.3](https://github.com/comeleleu/portfolio-2026/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) - 2026-02-12

### Added

- Added real experience data.
- Created specific sub-components for cards (`Badge`, `Description`, `Title`, `Tags`).

### Changed

- Reorganized component files.
- Improved section titles and button styles.

### Fixed

- Fixed external URL animations.

## [0.1.0-alpha.2](https://github.com/comeleleu/portfolio-2026/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) - 2026-01-26

### Added

- Created `Card` component with glowing borders.
- Created `Experience`, `Project`, and `About` sections.

## [0.1.0-alpha.1](https://github.com/comeleleu/portfolio-2026/releases/tag/v0.1.0-alpha.1) - 2026-01-08

### Added

- Initialized the project with [Create Next App](https://nextjs.org/)
- Set up the base layout, navbar, and footer.
- Added [Font Awesome](https://fontawesome.com/) dependencies and a [Google Font](https://fonts.google.com/).
