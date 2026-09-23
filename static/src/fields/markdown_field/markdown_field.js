/** @odoo-module **/
/* Part of Odoo. See LICENSE file for full copyright and licensing details. */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { MarkdownEditor } from "../../components/markdown_editor/markdown_editor";

export class MarkdownField extends Component {
    static template = "web_widget_markdown.MarkdownField";
    static components = {
        MarkdownEditor,
    };
    static props = {
        ...standardFieldProps,
    };

    get value() {
        return this.props.record.data[this.props.name] || "";
    }

    async setValue(newValue) {
        if (this.value !== newValue) {
            await this.props.record.update({ [this.props.name]: newValue });
        }
    }
}

export const markdownField = {
    component: MarkdownField,
    supportedTypes: ["text", "html"],
    additionalClasses: ["w-100", "d-block"],
};

registry.category("fields").add("markdown", markdownField);
