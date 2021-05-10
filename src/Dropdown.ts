/**
 * Frontend Template
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 * 
 * License: MIT
 */

import CustomElement, { customElement, html, css } from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-dropdown")
export default class Dropdown extends CustomElement
{
    render() {
        return html`
            <div class="button"></div>
        `;
    }
}