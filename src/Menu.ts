/**
 * Frontend Template
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 * 
 * License: MIT
 */

import CustomElement, {
    customElement, 
    html, 
    css,
} from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-menu")
export default class Menu extends CustomElement
{
    static readonly styles = css`
        :host {
            width: max-content;
            min-width: 100%;
            display: flex;
            flex-direction: column;
            background-color: var(--color-bg-300);
            pointer-events: auto !important;
        }

        ::slotted(ff-button) {
            margin: 0;
            padding: 0.5em 1em;
            background-color: transparent;
            border-radius: 0;
        }
        ::slotted(*:hover) {
            background-color: var(--color-bg-200, transparent);
        }
    `;

    protected render()
    {
        return html`<slot></slot>`;
    }
}