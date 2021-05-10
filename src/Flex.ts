/**
 * Frontend Template
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 * 
 * License: MIT
 */

import CustomElement, { customElement, property, PropertyValues, html, css } from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-flex")
export default class Flex extends CustomElement
{
    protected static readonly shady = false;

    @property({ type: Boolean })
    vertical = false;

    @property({ type: String })
    padding = "";

    constructor()
    {
        super();
        this.style.display = "flex";
    }

    protected update(changed: PropertyValues)
    {
        if (changed.has("vertical")) {
            this.style.flexDirection = this.vertical ? "column" : "row";
        }
        if (changed.has("padding")) {
            const padding = this.padding;
            if (["xs", "sm", "md", "lg", "xl"].includes(padding)) {
                const formattedValue = `var(--gap-${this.padding})`; 
                this.style.padding = formattedValue;
                this.style.setProperty("--control-padding", formattedValue);
            }
            else if (padding) {
                this.style.padding = padding;
                this.style.setProperty("--control-padding", padding);
            }
        }
    }
}