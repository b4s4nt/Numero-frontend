import { MantineTheme, MantineThemeOverride } from "@mantine/core";

export const numeroTheme: MantineThemeOverride = {
    // Defines color scheme for all components, defaults to "light"
    colorScheme: "light",

    // Controls focus ring styles:
    // auto – display focus ring only when user navigates with keyboard (default)
    // always – display focus ring when user navigates with keyboard and mouse
    // never – focus ring is always hidden (not recommended)
    focusRing: "auto",

    // Change focus ring styles
    // focusRingStyles: {
    //   styles(theme: MantineThemeBase): CSSObject;
    //   resetStyles(theme: MantineThemeBase): CSSObject;
    //   inputStyles(theme: MantineThemeBase): CSSObject;
    // };

    // Determines whether motion based animations should be disabled for
    // users who prefer to reduce motion in their OS settings
    respectReducedMotion: false,

    // Determines whether elements that do not have pointer cursor by default
    // (checkboxes, radio, native select) should have it
    cursorType: "pointer",

    // Default border-radius used for most elements
    // defaultRadius: "md",

    // White and black colors, defaults to '#fff' and '#000'
    white: "#fff",
    black: "#121212",

    // Object of arrays with 10 colors
    // colors: Record<string, Tuple<string, 10>>;
    colors: {
        red: [
            "#FFA9AC",
            "#FA4E53",
            "#EB1119",
            "#AD151A", // main shade
            "#7E090D",
            "#5D0205",
            "#440001",
            "#310000",
            "#220000",
            "#180000",
        ],
        green: [
            "#6DFFB5",
            "#13FF87",
            "#00E766",
            "#00A94F",
            "#007C37",
            "#005726",
            "#003D1B",
            "#002B13",
            "#001E0D",
            "#001509",
        ],
        yellow: [
            "#FFE49B",
            "#FFD155",
            "#FFC019",
            "#FFAA00",
            "#E69200",
            "#BD7800",
            "#9B6200",
            "#7F5100",
            "#684200",
            "#553600",
        ],
        gray: [
            "#FBFAFA",
            "#F4F2F2",
            "#EDEAEA",
            "#E7E3E3",
            "#E1DCDC",
            "#DBD4D4",
            "#D5CDCD",
            "#CFC7C7",
            "#C9C0C0",
            "#C4BABA",
        ],
    },

    // Key of theme.colors
    primaryColor: "red",

    // Index of color from theme.colors that is considered primary, Shade type is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    primaryShade: 3,

    // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
    // defaultGradient: { deg: number; from: MantineColor; to: MantineColor };

    // font-family and line-height used in most components
    fontFamily:
        "Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    lineHeight: "1.5",

    // Timing function used for animations, defaults to 'ease'
    // transitionTimingFunction: string;

    // Monospace font-family, used in Code, Kbd and Prism components
    fontFamilyMonospace:
        "Monaco, ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, Courier New, monospace",

    // Sizes for corresponding properties
    fontSizes: {
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 32,
    },
    radius: {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 16,
        xl: 24,
    },
    spacing: {
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 32,
    },

    // Values used for box-shadow
    // shadows: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

    // Breakpoints used in some components to add responsive styles
    // breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;

    // Styles added to buttons with `:active` pseudo-class
    // activeStyles: CSSObject;

    // h1-h6 styles, used in Title and TypographyStylesProvider components
    headings: {
        //   fontFamily: CSSProperties['fontFamily'];
        fontFamily:
            "Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
        fontWeight: 400,
        sizes: {
            // See heading options below
            h1: { fontWeight: 400, fontSize: 74 },
            h2: { fontWeight: 600, fontSize: 64 },
            h3: { fontWeight: 600, fontSize: 48 },
            h4: { fontWeight: 400, fontSize: 32 },
            h5: { fontWeight: 400, fontSize: 28 },
            h6: { fontWeight: 400, fontSize: 16 },
        },
    },

    // theme functions, see in theme functions guide
    // fn: MantineThemeFunctions;

    // Left to right or right to left direction, see RTL Support guide to learn more
    // dir: 'ltr' | 'rtl';

    // Default loader used in Loader and LoadingOverlay components
    loader: "bars",

    // Default date format used in DatePicker and DateRangePicker components
    // dateFormat: string;

    // Default dates formatting locale used in every @mantine/dates component
    datesLocale: "dd/mm/yyyy",

    // defaultProps, styles and classNames for components
    // components: ComponentsOverride;

    // Global styles
    globalStyles: (theme: MantineTheme) => ({
        body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
        },
    }),

    components: {
        Button: {
            defaultProps: {
                // component: "a",
            },
        },
        LoadingOverlay: {
            defaultProps: {
                loaderProps: {
                    size: "lg",
                    variant: "bars",
                },
                overlayBlur: 1,
                overlayOpacity: 0.75,
            },
        },
        Modal: {
            defaultProps: {
                transition: "fade",
                transitionDuration: 600,
                transitionTimingFunction: "ease",
                exitTransitionDuration: 600,
                padding: 50,
                centered: true,
                size: "50%",
            },
        },
    },

    // Add your own custom properties on Mantine theme
    // other: Record<string, any>;
};
