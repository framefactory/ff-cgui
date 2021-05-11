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
    CSSResult,
    sizes,
} from "./CustomElement";

import Button from "./Button";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-menu-button")
export default class MenuButton extends Button
{
    static readonly styles = [
        Button.styles,
        css`
            :host([selected]) ::slotted(ff-menu) {
                display: flex;
            }
            :host ::slotted(ff-menu) {
                display: none;
                position: absolute;
                z-index: 1;
                top: 100%;
                left: 0;
                margin: 2px 0;
                box-shadow: 0 4px 12px black;
            }
        `,
    ] as any;

    constructor()
    {
        super();

        this.selectable = true;
        this.on("blur", this.onBlur, this);
    }

    protected onBlur(event: FocusEvent)
    {
        // deselect button (and close menu) when clicking outside
        if (!event.relatedTarget || !this.contains(event.relatedTarget as Element)) {
            this.selected = false;         
        }
    }
}