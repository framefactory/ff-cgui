/**
 * Frontend Template
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 * 
 * License: MIT
 */

import CustomElement, { customElement, property, PropertyValues, html, css } from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-frame")
export default class Frame extends CustomElement
{
    protected static readonly shady = false;

    @property({ type: String })
    size = "";

    constructor()
    {
        super();
        this.style.display = "block";
    }

    protected update(changed: PropertyValues)
    {
        if (changed.has("size")) {
            this.style.padding = `var(--gap-${this.size})`;
        }
    }
}