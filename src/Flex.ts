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

@customElement("ff-flex")
export default class Flex extends CustomElement
{
    static readonly styles = css`
        :host {
            display: flex;
        }
    `;

    @property({ type: Boolean })
    vertical = false;

    @property({ type: String })
    pad: string = undefined;

    @property({ type: String })
    gap: string = undefined;

    protected update(changed: PropertyValues)
    {
        if (changed.has("vertical")) {
            console.log(this.vertical);
            this.style.flexDirection = this.vertical ? "column" : "row";
        }
        if (changed.has("pad")) {
            const pad = sizes.includes(this.pad) ? `var(--gap-${this.pad})` : this.pad;
            this.style.padding = pad;
        }
        if (changed.has("gap")) {
            const gap = sizes.includes(this.gap) ? `var(--gap-${this.gap})` : this.gap;
            this.style.setProperty("--control-margin", gap);
        }

        super.update(changed);
    }

    protected render()
    {
        return html`<slot></slot>`;
    }
}