/**
 *
 */
Ext.define("Ext.draw.sprite.Circle", {
    extend: "Ext.draw.sprite.Path",
    alias: 'sprite.circle',
    type: 'circle',
    inheritableStatics: {
        def: {
            processors: {
                cx: "number",
                cy: "number",
                r: "number"
            },
            aliases: {
                radius: "r",
                x: "cx",
                y: "cy",
                centerX: "cx",
                centerY: "cy"
            },
            defaults: {
                cx: 0,
                cy: 0,
                r: 0
            },
            dirtyTriggers: {
                cx: 'path',
                cy: 'path',
                r: 'path'
            }
        }
    },

    getBBox: function (isWithoutTransform) {
        var attr = this.attr,
            cx = attr.cx,
            cy = attr.cy,
            r = attr.r,
            matrix, scales, center, w, h;

        if (isWithoutTransform) {
            return attr.bbox.plain || ( attr.bbox.plain = {
                x: cx - r,
                y: cy - r,
                width: r + r,
                height: r + r
            });
        } else {
            if (attr.bbox.transform) {
                return attr.bbox.transform;
            }
            matrix = attr.matrix;
            scales = matrix.getScales();
            center = matrix.transformList([
                [cx, cy]
            ])[0];
            w = scales[0] * r;
            h = scales[1] * r;
            return attr.bbox.transform = {
                x: center[0] - w,
                y: center[1] - h,
                width: w + w,
                height: h + h
            };
        }

    },

    drawPath: function (path, attr) {
        path.arc(attr.cx, attr.cy, attr.r, 0, Math.PI * 2, false);
    }
});