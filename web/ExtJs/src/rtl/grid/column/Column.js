/*
 This file is part of Ext JS 4.2

 Copyright (c) 2011-2014 Sencha Inc

 Contact:  http://www.sencha.com/contact

 Commercial Usage
 Licensees holding valid commercial licenses may use this file in accordance with the Commercial
 Software License Agreement provided with the Software or, alternatively, in accordance with the
 terms contained in a written agreement between you and Sencha.

 If you are unsure which license is appropriate for your use, please contact the sales department
 at http://www.sencha.com/contact.

 Build date: 2014-09-02 11:12:40 (ef1fa70924f51a26dacbe29644ca3f31501a5fce)
 */
Ext.define('Ext.rtl.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    isOnLeftEdge: function (e) {
        return (!this.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            (this.getX() + this.getWidth() - e.getXY()[0] <= this.handleWidth) :
            this.callParent(arguments);
    },

    isOnRightEdge: function (e) {
        return (!this.getHierarchyState().rtl !== !Ext.rootHierarchyState.rtl) ?
            (e.getXY()[0] - this.getX() <= this.handleWidth) : this.callParent(arguments);
    }

});