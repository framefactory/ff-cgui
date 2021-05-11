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

@customElement("ff-button")
export default class Button extends CustomElement
{
    static readonly styles = css`
        :host {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            margin: var(--control-margin, 0);
            padding: 0.5em;
            background-color: var(--color-bg-300, transparent);
            color: var(--color-fg-500, inherit);
            border-radius: var(--border-radius, 0);
            cursor: pointer;
        }
        :host([vertical]) {
            flex-direction: column;
            justify-content: center;            
        }
        :host(:hover) {
            background-color: var(--color-bg-200, transparent);
        }
        :host([disabled]) {
            background-color: var(--button-color-bg-disabled, transparent);
            color: var(--button-color-text-disabled, inherit);
        }
        :host([selected]) {
            background-color: var(--color-primary-500, transparent);
            color: var(--color-fg-300, inherit);
        }
        :host(.transparent) {
            padding: 0;
            background-color: transparent;
            color: var(--color-fg-700, inherit);
        }
        :host(.transparent:hover) {
            color: var(--color-fg-500, inherit);
        }
        :host(.transparent[selected]) {
            background-color: transparent;
            color: var(--color-fg-100, inherit);
        }

        ::slotted(*) {
            margin: 0.25em;
            pointer-events: none;
        }

        ::slotted(ff-icon) {
            fill: var(--color-fg-700, inherit);
        }
        :host(.transparent:hover) ::slotted(ff-icon) {
            fill: var(--color-fg-500, inherit);
        }
        :host(.transparent[selected]) ::slotted(ff-icon) {
            fill: var(--color-fg-100, inherit);
        }
    `;

    /** Optional key to identify the button. */
    @property({ type: String })
    key = undefined;

    @property({ type: String })
    selectedKey = undefined;

    /** If true, adds "ff-selected" class to element. */
    @property({ type: Boolean, reflect: true })
    selected = false;

    /** If true, toggles selected state every time the button is clicked. */
    @property({ type: Boolean, reflect: true })
    selectable = false;

    @property({ type: Boolean })
    disabled = false;

    @property({ type: String })
    size = "";

    @property({ type: Boolean })
    vertical = false;

    @property({ type: Boolean })
    transparent = false;

    @property()
    grow = undefined;


    constructor()
    {
        super();

        this.on("click", (e) => this.onClick(e));
        this.on("keydown", (e) => this.onKeyDown(e));

        this.tabIndex = 0;
    }

    protected shouldUpdate(changedProperties: PropertyValues)
    {
        if (changedProperties.has("key") || changedProperties.has("selectedKey")) {
            if (this.key) {
                this.selected = this.key === this.selectedKey;
            }
        }

        return true;
    }

    protected update(changed: PropertyValues)
    {
        if (changed.has("transparent")) {
            this.classList.toggle("transparent", this.transparent);
        }   
        if (changed.has("grow")) {
            let grow = this.grow !== undefined ? parseInt(this.grow) : 0;
            grow = isNaN(grow) ? 1 : grow;
            this.style.flexGrow = grow.toString();
        }
        if (changed.has("size")) {
            const size = this.size;
            if (size) {
                if (sizes.includes(size)) {
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