## Instructions

Install dependencies using `npm install`.
Run `npm start` to concurrently start UI in development mode.
Open [http://localhost:3000](http://localhost:3000) to view the UI in the
browser. The page will reload if you make edits.

# Project structure

```Text
- name-project/
  - node-modules/                           # Node.js dependencies
  - src/                                    # The main source code directory
  - constatns/                              # Сontains necessary constants
  - pages/                                  # Represents a specific page in the application
      - components/                         # Reusable components for the page
      - hooks/                              # Custom hooks related to the page
      - types/                              # type definitions for the page
      - index.tsx                           # The main content and logic of the page
   - types/                                 # Type definitions used across different parts of the application
 - ...                                      # Other files or directories not explicitly mentioned
```

# Scripts:

```Text
    start                                   # Starts the development server using react-scripts
    build                                   # Builds the production-ready application
    test                                    # Executes Jest tests
    eject                                   # Ejects from the react-scripts setup
    prettier:fix                            # Formats code using Prettier with auto-fixing
    prettier:check                          # Checks code formatting using Prettier

```

# Tech Stack:

```Text
   - react, react-dom                        # Core libraries for building React app
   - typescript                              # Used for adding static types to JavaScript
   - antd, @ant-design/icons                 # Ant-design components for creating a consistent UI
   - dayjs                                   # JavaScript library that parses, validates, manipulates, and displays dates and times
   - react-uuid                              # Generate Universal Unique Identifiers
   - eslint, eslint-config-airbnb            # ESLint and related plugins for code linting and quality checks
   - jest                                    # Jest testing framework
   - prettier                                # Code formatter for consistent code styling.
```
