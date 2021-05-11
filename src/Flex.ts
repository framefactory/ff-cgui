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
    sizes,
} from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-flex")
export default class Flex extends CustomElement
{
    protected static readonly shady = false;

    @property({ type: Boolean })
    vertical = false;

    @property({ type: Boolean })
    wrap = false;

    @property({ type: String })
    main = "flex-start";

    @property({ type: String })
    cross = "stretch";

    @property({ type: String })
    pad: string = undefined;

    @property({ type: String })
    gap: string = undefined;

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
        if (changed.has("wrap")) {
            this.style.flexWrap = this.wrap ? "wrap" : "nowrap";
        }
        if (changed.has("main")) {
            this.style.justifyContent = this.main;
        }
        if (changed.has("cross")) {
            this.style.alignItems = this.cross;
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
}