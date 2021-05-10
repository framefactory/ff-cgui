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
    css 
} from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-button")
export default class Button extends CustomElement
{
    static readonly styles = css`
        :host {
            display: inline-block;
            cursor: pointer;
            margin: var(--control-padding, 0);
            background-color: var(--button-color-bg, transparent);
            color: var(--button-color-text, inherit);
            border-radius: var(--button-border-radius, 0);
            text-align: center;
            vertical-align: middle;
        }
        :host(:hover) {
            background-color: var(--button-color-bg-hover, transparent);
        }
        :host([disabled]) {
            background-color: var(--button-color-bg-disabled, transparent);
            color: var(--button-color-text-disabled, inherit);
        }
        ::slotted(ff-icon) {
            margin: 0.5em;
        }
    `;

    /** Optional name to identify the button. */
    @property({ type: String })
    name = "";

    /** Optional index to identify the button. */
    @property({ type: Number })
    index = 0;

    @property({ type: Number })
    selectedIndex = -1;

    /** If true, adds "ff-selected" class to element. */
    @property({ type: Boolean, reflect: true })
    selected = false;

    /** If true, toggles selected state every time the button is clicked. */
    @property({ type: Boolean })
    selectable = false;

    @property({ type: Boolean })
    disabled = false;

    @property({ type: String })
    variant = "";

    @property({ type: String })
    size = "";

    constructor()
    {
        super();

        this.on("click", (e) => this.onClick(e));
        this.on("keydown", (e) => this.onKeyDown(e));
    }

    protected update(changed: PropertyValues)
    {
        if (changed.has("variant")) {
            const variant = this.variant;
            this.style.flex = variant === "flex" ? "1" : "0";
        }   
        if (changed.has("size")) {
            const size = this.size;
            if (size) {
                if ([ "xl", "lg", "md", "sm", "xs" ].includes(size)) {
                    this.style.padding = `var(--gap-${size})`;
                    this.style.fontSize = `var(--font-${size})`;
                }    
            }
        }

        super.update(changed);
    }

    protected render() {
        return html`<slot>Button</slot>`;
    }

    protected onClick(event: MouseEvent)
    {
        if (this.selectable) {
            this.selected = !this.selected;
        }
    }

    protected onKeyDown(event: KeyboardEvent)
    {
        if (document.activeElement === this && (event.code === "Space" || event.code === "Enter")) {
            this.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
    }
}