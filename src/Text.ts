/**
 * Frontend Template
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 * 
 * License: MIT
 */

import CustomElement, {
    customElement, 
    property, 
    PropertyValues,
    html, 
    css,
    sizes,
} from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-text")
export default class Text extends CustomElement
{
    protected render()
    {
        return html`<slot></slot>`;
    }
}