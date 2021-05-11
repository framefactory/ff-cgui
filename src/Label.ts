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

@customElement("ff-label")
export default class Label extends CustomElement
{
    static readonly styles = css`
        :host {
            margin: var(--control-margin, 0);
        }
    `;

    protected render()
    {
        return html`<slot></slot>`;
    }
}