/**
 * @class Ext.ux.Tooltip
 * @extend Ext.Panel
 *
 * A small panel appears near a html element that corresponds with the tooltip text
 * @author Bernhard Widtmann
 * @notes used in www.smart-order.com
 * @example
 *
 * Ext.create('Ext.ux.Tooltip', {
 *             html: 'Click on this button to view details',
 *             element: Ext.getCmp('btnDetails'),
 *             alignment: 'bc-tc?'});
*/
Ext.define('Ext.ux.Tooltip',{
    extend: 'Ext.Panel',
    xtype: 'tooltip',

    config:{
        /**
         * @cfg {String} html The html content displayed as tooltip text
         */
        html: '',
        /**
         * @cfg {Object} element The html element / component the tooltip corresponds
         */
        element: {},
        /**
         * @cfg {String} alignment (optional) The specific alignment the tooltip is aligned to the element
         * for more details see http://docs.sencha.com/touch/2.0.2/#!/api/Ext.Component-method-showBy
         */
        alignment: '',
        /**
         * @cfg {Integer} maxWidth (optional) The maximum width of the tooltip in order to achieve multi line tooltip text
         */
        maxWidth: 150,

        //private section (should NOT be overridden!)
        hidden: true,
        scrollable: false,
        // we give it a left and top property to make it floating by default
        left: 0,
        top: 0,
        baseCls: 'ux-tooltip'
    },
    
    //override constructor
    initialize: function(config){

        //only show the tooltip, if target element is NOT hidden currently
        if (!this.getElement().getHidden()) { //BTW: does not work for tabbar buttons

            this.callParent(arguments);

            //add tooltip to viewport
            Ext.Viewport.add(this);

            //align tooltip correctly to element
            this.showBy(this.getElement(),this.getAlignment());

            //add listener to all viewports so the tooltip is destroyed automatically after the next tap/click
            setTimeout(function(tooltip) {
                for (var i = 0; i < Ext.Viewport.getItems().length; i++){
                    Ext.Viewport.getAt(i).on({touchstart:{element:'element',scope:tooltip,single:true,fn:function(){this.destroy();}}});
                }
            },100,this);
        }
    }
});

