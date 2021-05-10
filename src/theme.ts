/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { css, unsafeCSS, CSSResult } from "lit-element";
import { Dictionary } from "@ff/core/types";

////////////////////////////////////////////////////////////////////////////////

export interface ITheme
{
    colors: Dictionary<string>;
    fonts: Dictionary<string>;
}

export const defaultTheme: ITheme = {
    colors: {
    },
    fonts: {
    },
}

const toCSS = function(src: object) {
    const dst = {};
    for (const key in src) {
        const val = src[key];
        if (val instanceof CSSResult) {
            dst[key] = src[key];
        }
        else if (typeof val === "string") {
            dst[key] = css`${unsafeCSS(val)}`;
        }
        else if (typeof val === "object") {
            dst[key] = toCSS(val);
        }
    }
    return dst;
}

type Replace<T, O, N> = T extends O ? N : RecursiveReplace<T, O, N>;

type RecursiveReplace<T, O, N> = {
    [P in keyof T]: Replace<T[P], O, N>
};

type ISafeTheme<T> = RecursiveReplace<T, string, CSSResult>;

export function createTheme<T extends Partial<ITheme>>(userTheme: T | ISafeTheme<T>): RecursiveReplace<T, string, CSSResult> {
    const theme = {
        ...defaultTheme,
        ...userTheme,
    };

    return toCSS(theme) as RecursiveReplace<T, string, CSSResult>;
}
