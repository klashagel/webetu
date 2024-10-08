# EMP Pro Application Modification Guide

## Key Components and Considerations

1. Theme Management:
   - The application uses a dark/light theme system.
   - Theme state is managed in `src/contexts/ThemeContext.js`.
   - When modifying components, ensure they respond to theme changes.

2. Internationalization (i18n):
   - Language support is implemented using i18next.
   - Translations are stored in `public/locales/[lang]/translation.json`.
   - Always use translation keys instead of hardcoded strings.

3. Tailwind CSS:
   - The app uses Tailwind for styling. Prefer Tailwind classes over custom CSS.
   - Custom styles, if needed, should be added to component-specific CSS modules.

4. Component Structure:
   - Main components are in `src/components/`.
   - Page components are in `src/pages/`.
   - Reusable logic should be extracted into custom hooks in `src/hooks/`.

5. State Management:
   - Global state is managed using React Context (see `src/contexts/`).
   - Use local state for component-specific data.

6. Routing:
   - React Router is used for navigation. Routes are defined in `src/App.js`.
   - Ensure new pages are added to the routing configuration.

7. API Communication:
   - API calls are centralized in context providers (e.g., `ControllersDataProvider`).
   - Use the provided contexts to access and update data.

8. Error Handling:
   - Implement error boundaries for critical components.
   - Use try-catch blocks for async operations.

9. Performance Optimization:
   - Use React.memo, useMemo, and useCallback where appropriate.
   - Avoid unnecessary re-renders by optimizing component structure.

10. Accessibility:
    - Ensure all interactive elements are keyboard accessible.
    - Use appropriate ARIA attributes where necessary.

11. Responsive Design:
    - Use Tailwind's responsive classes to ensure the app works on various screen sizes.

12. Testing:
    - Write unit tests for new components and functions.
    - Update existing tests when modifying components.

## Modification Workflow

1. Understand the requirement and its impact on existing components.
2. Plan the changes, considering the above key points.
3. Implement changes in a new branch.
4. Test thoroughly, including different themes and languages.
5. Update documentation and comments as necessary.
6. Create a pull request for review.

## Important Files to Consider

- `src/App.js`: Main application structure and routing
- `src/components/Header.js`: Application header with theme and language controls
- `src/components/Etu.js`: Main dashboard component
- `src/contexts/ThemeContext.js`: Theme management
- `src/i18n.js`: Internationalization setup
- `tailwind.config.js`: Tailwind CSS configuration

Remember to maintain consistency with the existing code style and patterns when making modifications.

