/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { LitElement } from "lit-element";

////////////////////////////////////////////////////////////////////////////////

export { customElement, property, query, queryAll, css, CSSResult, PropertyValues } from "lit-element";
export { html, svg, render, TemplateResult } from "lit-html";
export { classMap } from 'lit-html/directives/class-map';

export const sizes = [ "xxl", "xl", "lg", "md", "sm", "xs", "xxs" ];

export default class CustomElement extends LitElement
{
    protected static readonly shady: boolean = true;

    /** 
     * Sets the given styles at the given element.
     */
    static setStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>)
    {
        Object.assign(element.style, style);
    }

    private _isFirstConnected = false;

    /**
     * Returns true if this element is using shadow DOM.
     */
    get shady()
    {
        return (this.constructor as typeof CustomElement).shady;
    }
    
    setStyle(style: Partial<CSSStyleDeclaration>): this
    {
        CustomElement.setStyle(this, style);
        return this;
    }

    /**
     * Returns true if this element is the focused element of the document.
     */
    hasFocus()
    {
        return document.activeElement === this;
    }
    
    /**
     * Attaches an event listener to this element.
     * This is a convenience method for 'addEventListener'.
     */
    on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, target?: object, options?: boolean | AddEventListenerOptions): void;
    on(type: string, listener: EventListener, target?: object, options?: boolean | AddEventListenerOptions) 
    {
        if (target) {
            listener = listener.bind(target);
        }

        this.addEventListener(type, listener, options);
        return this;
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