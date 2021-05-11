/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import mixin from "@ff/core/mixin";
import { Provider, Consumer, provider } from "@ff/core/reactive";
import CustomElement from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

export { customElement, property, query, queryAll, css, CSSResult, PropertyValues } from "lit-element";
export { html, svg, render, TemplateResult } from "lit-html";
export { classMap } from 'lit-html/directives/class-map';

const consumerElementProvider = provider as any as () => (proto: ConsumerElement, name: string) => void;
export { consumerElementProvider as provider };

class ConsumerElement extends CustomElement
{
    constructor()
    {
        super();
        (this as any)._initConsumer();
    }

    connectedCallback()
    {
        (this as any)._linkProviders();
        super.connectedCallback();
    }

    disconnectedCallback()
    {
        super.disconnectedCallback();
        (this as any)._unlinkProviders();
    }

    onProviderUpdate(provider: Provider)
    {
        provider;
        this.requestUpdate();
    }
}

mixin(ConsumerElement, Consumer);

export default ConsumerElement;