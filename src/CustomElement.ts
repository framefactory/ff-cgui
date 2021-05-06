/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { LitElement, CSSResult } from "lit-element";

////////////////////////////////////////////////////////////////////////////////

export { customElement, property, query, queryAll, css, CSSResult, PropertyValues } from "lit-element";
export { html, svg, render, TemplateResult } from "lit-html";
export { classMap } from 'lit-html/directives/class-map';

export default class CustomElement extends LitElement
{
    static readonly styles: CSSResult = undefined;

    protected static readonly shady: boolean = true;
    protected static readonly classes: string | string[] = "";

    private _isFirstConnected = false;

    constructor()
    {
        super();
        // note: attributes haven't yet been set in constructor

        const classes = (this.constructor as typeof CustomElement).classes;
        if (Array.isArray(classes)) {
            classes.forEach(c => this.addClass(c));
        }
        else if (classes) {
            this.addClass(classes);
        }
    }

    /**
     * Returns true if this element is using shadow DOM.
     */
    get shady()
    {
        return (this.constructor as typeof CustomElement).shady;
    }    

    addClass(...classes: string[]): this
    {
        classes.forEach(klass => this.classList.add(klass));
        return this;
    }

    removeClass(...classes: string[]): this
    {
        classes.forEach(klass => this.classList.remove(klass));
        return this;
    }

    setClass(name: string, state: boolean): this
    {
        if (state) {
            this.classList.add(name);
        }
        else {
            this.classList.remove(name);
        }

        return this;
    }

    /**
     * Attaches an event listener to this element.
     * This is a convenience method for 'addEventListener'.
     */
    on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) 
    {
        this.addEventListener(type, listener, options);
        return this;
    }

    /**
     * Removes an event listener from this element.
     * This is a convenience alias for 'removeEventListener'.
     */
    off<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    off(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions)
    {
        this.removeEventListener(type, listener, options);
        return this;
    }

    /**
     * Dispatches a custom event of the given type.
     * The detail information is available on the event as 'event.detail'.
     */
    emit<T extends CustomEvent = CustomEvent>(type: string, detail: T["detail"])
    {
        this.dispatchEvent(new CustomEvent(type, { detail }));
    }

    connectedCallback()
    {
        if (!this._isFirstConnected) {
            this._isFirstConnected = true;
            this.firstConnected();
        }

        this.connected();
        super.connectedCallback();
    }

    disconnectedCallback()
    {
        super.disconnectedCallback();
        this.disconnected();
    }

    protected createRenderRoot()
    {
        return this.shady ? super.createRenderRoot() : this;
    }

    /**
     * Called after the element has been added to the document
     * for the first time.
     * No need to call super from this method.
     */
    protected firstConnected(): void
    {
        return;
    }

    /**
     * Called after the element has been added to the document.
     * No need to call super from this method.
     */
    protected connected(): void
    {
        return;
    }

    /**
     * Called after the element has been removed from the document.
     * No need to cal super from this method.
     */
    protected disconnected(): void
    {
        return;
    }

    /** Use this member as call target when subscribing to events which require
     * an update. Calls `LitElement.requestUpdate()`, disregarding any arguments.
     */
    protected onUpdate()
    {
        this.requestUpdate();
    }
}