/** @odoo-module **/
/* Part of Odoo. See LICENSE file for full copyright and licensing details. */

import { Component, useRef, onMounted, onWillUnmount, useEffect, markup } from "@odoo/owl";

export class MarkdownEditor extends Component {
    static template = "web_widget_markdown.MarkdownEditor";
    static props = {
        value: { type: String, optional: true },
        readonly: { type: Boolean, optional: true },
        onValueChange: { type: Function, optional: true },
    };

    setup() {
        this.textareaRef = useRef("textarea");
        this.easyMDE = null;
        this._isSettingValue = false;

        onMounted(() => {
            if (!this.props.readonly) {
                this._initEditor();
            }
        });

        useEffect(
            () => {
                if (this.props.readonly) {
                    if (this.easyMDE) {
                        this._destroyEditor();
                    }
                } else {
                    if (!this.easyMDE) {
                        this._initEditor();
                    } else {
                        const currentVal = this.easyMDE.value();
                        const nextVal = this.props.value || "";
                        if (currentVal !== nextVal) {
                            this._isSettingValue = true;
                            this.easyMDE.value(nextVal);
                            this._isSettingValue = false;
                        }
                    }
                }
            },
            () => [this.props.readonly, this.props.value]
        );

        onWillUnmount(() => {
            this._destroyEditor();
        });
    }

    get renderedMarkdown() {
        const raw = this.props.value || "";
        if (window.marked && typeof window.marked.parse === "function") {
            try {
                return markup(window.marked.parse(raw));
            } catch (err) {
                console.error("Markdown parse error:", err);
                return markup(raw);
            }
        }
        return markup(raw);
    }

    _initEditor() {
        if (!this.textareaRef.el || this.easyMDE) {
            return;
        }
        if (!window.EasyMDE) {
            console.warn("EasyMDE library is not loaded on window.");
            return;
        }

        try {
            this.easyMDE = new window.EasyMDE({
                element: this.textareaRef.el,
                initialValue: this.props.value || "",
                spellChecker: false,
                status: false,
                autosave: { enabled: false },
                autoDownloadFontAwesome: false,
                lineWrapping: true,
                codeMirrorConfig: {
                    lineWrapping: true,
                },
                toolbarButtonClassPrefix: "mde-btn",
                toolbar: [
                    "bold",
                    "italic",
                    "heading",
                    "|",
                    "quote",
                    "unordered-list",
                    "ordered-list",
                    "|",
                    "link",
                    "image",
                    "table",
                    "code",
                    "|",
                    "preview",
                    "side-by-side",
                    "fullscreen",
                    "|",
                    "guide",
                ],
                renderingConfig: {
                    singleLineBreaks: false,
                    codeSyntaxHighlighting: true,
                },
            });

            this.easyMDE.codemirror.on("change", () => {
                if (this._isSettingValue) {
                    return;
                }
                const newValue = this.easyMDE.value();
                if (this.props.onValueChange) {
                    this.props.onValueChange(newValue);
                }
            });
        } catch (err) {
            console.error("Failed to initialize EasyMDE:", err);
        }
    }

    _destroyEditor() {
        if (this.easyMDE) {
            try {
                this.easyMDE.toTextArea();
            } catch (_) {
                // Ignore cleanup errors during unmounting
            }
            this.easyMDE = null;
        }
    }
}
