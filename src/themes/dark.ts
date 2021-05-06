/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

 import { createTheme } from "./base";

////////////////////////////////////////////////////////////////////////////////

/**
 * https://tailwindshades.com
 * for bg, fg: step = 4
 * for primary, secondary: step = 7
 */

export default createTheme({
    colors: {
        primary1: '#F8A9B9',
        primary2: '#F5889E',
        primary3: '#F26784',
        primary4: '#F04669',
        primary5: '#ED254E',
        primary6: '#DC123C',
        primary7: '#BB0F33',
        primary8: '#9A0D2A',
        primary9: '#790A21',

        bg1: '#63696E',
        bg2: '#5A5E63',
        bg3: '#505458',
        bg4: '#464A4E',
        bg5: '#3D4043',
        bg6: '#333638',
        bg7: '#292B2E',
        bg8: '#1F2123',
        bg9: '#161718',

        fg1: '#FCFCFD',
        fg2: '#F2F2F3',
        fg3: '#E7E8E9',
        fg4: '#DCDEE0',
        fg5: '#D1D4D6',
        fg6: '#C7C9CC',
        fg7: '#BCBFC2',
        fg8: '#B1B5B9',
        fg9: '#A7ABAF',
    },
    fonts: {
        ui: '"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    }
});