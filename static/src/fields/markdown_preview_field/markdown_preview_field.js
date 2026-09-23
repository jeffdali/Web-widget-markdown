/** @odoo-module **/
/* Part of Odoo. See LICENSE file for full copyright and licensing details. */

import { Component, markup } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { MarkdownPreviewDialog } from "../../components/markdown_preview_dialog/markdown_preview_dialog";

export class MarkdownPreviewField extends Component {
    static template = "web_widget_markdown.MarkdownPreviewField";
    static props = {
        ...standardFieldProps,
    };

    setup() {
        this.dialogService = useService("dialog");
    }

    get rawValue() {
        return this.props.record.data[this.props.name] || "";
    }

    get hasContent() {
        return Boolean(this.rawValue && this.rawValue.trim().length > 0);
    }

    get renderedPreview() {
        const raw = this.rawValue;
        const truncated = raw.length > 300 ? raw.slice(0, 300) + "…" : raw;
        if (window.marked && typeof window.marked.parse === "function") {
            try {
                return markup(window.marked.parse(truncated));
            } catch (err) {
                console.error("Markdown preview parse error:", err);
                return markup(truncated);
            }
        }
        return markup(truncated);
    }

    openPreviewDialog(ev) {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const recordName = this.props.record.data.display_name || this.props.record.data.name || "";
        const fieldString = this.props.record.fields[this.props.name]?.string || "Markdown";
        const title = recordName ? `${recordName} - ${fieldString} Preview` : `${fieldString} Preview`;

        this.dialogService.add(MarkdownPreviewDialog, {
            title,
            content: this.rawValue,
        });
    }
}

export const markdownPreviewField = {
    component: MarkdownPreviewField,
    supportedTypes: ["text", "html"],
};

registry.category("fields").add("markdown_preview", markdownPreviewField);
