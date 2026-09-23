# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

# Bundled external library source URLs (for manual maintenance / audit):
# - marked.js (^14.0.0):
#   https://cdn.jsdelivr.net/npm/marked/marked.min.js
# - EasyMDE (^2.18.0):
#   https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js
#   https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css

{
    "name": "Markdown Field Widget",
    "summary": "Full-featured Markdown field widget and preview viewer for Odoo 18 and 19",
    "description": """
Markdown Field Widget for Odoo 18 & 19
=======================================
Provides an OWL 2 field widget that allows editing Text/Html fields using EasyMDE,
and rendering formatted Markdown (using marked.js) in read-only and list/kanban views.

Features:
- Full Markdown editor in form edit mode (EasyMDE).
- Safe HTML rendering in read-only mode (marked.js + OWL markup).
- Compact preview field widget (`markdown_preview`) with character truncation for list/kanban.
- Pre-configured `web.markdown.mixin` for easy integration into custom models.
- Zero external CDN dependencies (all assets bundled locally).
- Full Bootstrap 5 and Dark Mode styling support.
    """,
    # Using semantic version "1.0.0" allows Odoo 18 to adapt to "18.0.1.0.0"
    # and Odoo 19 to adapt to "19.0.1.0.0" automatically.
    "version": "18.0.1.0.0",
    "category": "Technical",
    "author": "Jeff Dali",
    "website": "https://github.com/jeffdali/Web-widget-markdown",
    "support": "https://github.com/jeffdali/Web-widget-markdown/issues",
    "license": "LGPL-3",
    "images": [
        "static/description/banner.png",
    ],
    "depends": [
        "base",
        "web",
    ],
    "data": [
        "security/ir.model.access.csv",
        "views/markdown_demo_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "web_widget_markdown/static/lib/easymde/easymde.min.css",
            "web_widget_markdown/static/lib/easymde/easymde.min.js",
            "web_widget_markdown/static/lib/marked/marked.min.js",
            "web_widget_markdown/static/src/scss/markdown_widget.scss",
            "web_widget_markdown/static/src/components/**/*.js",
            "web_widget_markdown/static/src/components/**/*.xml",
            "web_widget_markdown/static/src/fields/**/*.js",
            "web_widget_markdown/static/src/fields/**/*.xml",
        ],
    },
    "installable": True,
    "auto_install": False,
    "application": False,
}
