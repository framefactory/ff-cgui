/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { customElement, property } from "./CustomElement";
import Button from "./Button";
import Flex from "./Flex";

////////////////////////////////////////////////////////////////////////////////

export type ButtonGroupMode = "exclusive" | "radio" | "select";

@customElement("ff-button-group")
export default class ButtonGroup extends Flex
{
    @property({ type: String })
    mode: ButtonGroupMode = "radio";

    @property({ type: Number })
    selectionIndex = -1;

    private _observer = new MutationObserver(this.onObserver);
    private _selectedButton: Button = null;

    constructor()
    {
        super();

        this.on("click", this.onClick, this);
        this.wrap = true;
    }

    protected firstConnected()
    {
        this.parseChildren();
    }

    protected connected()
    {
        this._observer.observe(this, { childList: true });
    }

    protected disconnected()
    {
        this._observer.disconnect();
    }

    protected onObserver(mutations: MutationRecord[])
    {
        mutations.forEach(mutation => {
            if (mutation.type === "childList") {
                return this.parseChildren();
            }
        });
    }

    protected onClick(event: MouseEvent)
    {
        let target = event.target as HTMLElement;
        while(target && target !== this && !(target instanceof Button)) {
            target = target.parentElement;
        }

        if (!(target instanceof Button)) {
            event.stopImmediatePropagation();
            return;
        }

        if (target.selected) {
            if (this.mode !== "radio") {
                target.selected = false;
                this._selectedButton = null;
                this.selectionIndex = -1;
            }
        }
        else {
            if (this._selectedButton) {
                this._selectedButton.selected = false;
            }

            this._selectedButton = target;
            this._selectedButton.selected = true;
            this.selectionIndex = Array.from(this.children).indexOf(target);
        }
    }

    protected parseChildren()
    {
        const children = Array.from(this.children);
        const buttons = children.filter(child => child instanceof Button) as Button[];

        if (this._selectedButton) {
            this.selectionIndex = buttons.indexOf(this._selectedButton);
            if (this.selectionIndex < 0) {
                this._selectedButton.selected = false;
                this._selectedButton = null;
            }
        }

        if (this.selectionIndex < 0 || this.selectionIndex >= buttons.length) {
            this.selectionIndex = this.mode === "radio" ? 0 : -1;
        }

        if (this.selectionIndex >= 0) {
            this._selectedButton = buttons[this.selectionIndex];
            this._selectedButton.selected = true;
        }
    }
}