Ext.define('js.inStock', {
    extend: 'Ext.panel.Panel',
    myCode: '',
    myName: '',
    initComponent: function () {
        var me = this, cellEditing;

        //商品
        var merStore = Ext.create('Ext.data.Store',
            {
                fields: [
                    {name: 'merchandiseId', type: 'String'},
                    {name: 'merchandiseName', type: 'String'}

                ],
                proxy: {
                    type: 'ajax',
                    url: '/merchandise',
                    reader: {
                        type: 'json',
                        root: 'merchandiseInfo',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: true
            });
        //供货商
        var supStore = Ext.create('Ext.data.Store',
            {

                fields: [
                    {name: 'supplierId', type: 'String'},
                    {name: 'supplierName', type: 'String'}

                ],
                proxy: {
                    type: 'ajax',
                    url: '/Supplier',
                    reader: {
                        type: 'json',
                        root: 'supplier',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: true
            });
        //入库方式
        var inStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'value'
            ],
            data: [
                {'key': '1', 'value': '正常入库'},
                {'key': '2', 'value': '报溢'},
                {'key': '3', 'value': '盘盈'}
            ],
            autoLoad: true

        })

        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore');

                            if (context.field === 'merchandiseName') {

                                context.record.data.merchandiseId1 = me.myCode;
                                context.record.data.merchandiseName = me.myName;

                            }

                            if (context.field === "num") {
                                if (context.record.data.price) {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price") {
                                if (context.record.data.num) {
                                    context.record.data.total = context.record.data.num * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);

                                }
                            }
                            if (context.record.data.merchandiseId1 && context.record.data.num && context.record.data.price) {
                                myStore.add({});
                            }

                            me.totalmoney = 0;
                            for (var i = 0; i < myStore.data.items.length; i++) {
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != "") {
                                    me.totalmoney += myStore.data.items[i].data.total;
                                }
                            }
                            Ext.getCmp('total').setValue(me.totalmoney);

                        }
                    }
                }
            }
        );
        Ext.apply(this, {
            title: '商品入库',
            layout: 'vbox',
            closable: true,
            id: '商品入库',
            tbar: [
                {
                    text: '提交',
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                        var postData = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'instockDinfo[' + index + '].meMerchandiseInfo.merchandiseId=' + item.data.merchandiseId1 + '&instockDinfo[' + index + '].price=' + item.data.price + '&instockDinfo[' + index + '].num=' + item.data.num;
                            if (index != mydata.length - 1) {
                                postData += '&';
                            }
                        });
                        Ext.getCmp('myFrom').submit({
                            url: 'insertStock.action?' + postData,
                            success: function (form, action) {
                                if (action.result.success == true) {
                                    Ext.Msg.alert('提示', action.result.message);
                                    Ext.getCmp('instockStore').store.reload();
                                }
                                else if (action.result.message == false) {
                                    Ext.Msg.alert(action.result.message);

                                }
                            },
                            failure: function () {
                                Ext.Msg.alert('系统提示', '服务器错误')
                            }
                        });
                    }
                }
            ],
            items: [
                {
                    xtype: 'form',
                    width: '100%',
                    id: 'myFrom',
                    layout: 'form',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 90,
                        labelAlign: 'right',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            defaults: {
                                xtype: 'combo',
                                labelWidth: 90,
                                labelAlign: 'right',
                                border: false
                            },
                            items: [

                                {

                                    fieldLabel: '供应商',
                                    store: supStore,
                                    displayField: 'supplierName',
                                    valueField: 'supplierId',
                                    queryMode: 'local',
                                    editable: false,
                                    name: 'instockinfo.baSupplierInfo.supplierId'

                                },
                                {   xtype: 'combo',
                                    fieldLabel: '操作员',
                                    editable: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '经手人',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    name: 'instockinfo.handlers'
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: '备注',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    name: 'instockinfo.remark'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            defults: {
                                xtype: 'combo',
                                labelWidth: 90,
                                labelAlign: 'right',
                                border: false
                            },
                            items: [

                                {
                                    xtype: 'textfield',
                                    fieldLabel: '采购日期',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    editable: false,
                                    name: 'instockinfo.inTime',
                                    value: Ext.Date.format(new Date, 'Y-m-d H:i'),
                                    readOnly: true

                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '入库方式',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    editable: false,
                                    store: inStore,
                                    displayField: 'value',
                                    valueField: 'key',
                                    queryMode: 'local',
                                    name: 'instockinfo.inType'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'total',
                                    fieldLabel: '总金额',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    name: 'instockinfo.totalMoney'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    id: 'instockStore',
                    plugins: cellEditing,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore',
                        data: [
                            {}
                        ],
                        fields: [
                            'merchandiseId1', 'merchandiseName', 'num', 'price', 'total'
                        ]
                    }),
                    columns: [

                        {
                            dataIndex: 'merchandiseId1',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            editor: {
                                xtype: 'combo',
                                allowBlank: false,
                                store: merStore,
                                displayField: 'merchandiseName',
                                valueField: 'merchandiseId',
                                listeners: {
                                    select: function (combo, records) {
                                        me.myCode = this.value;
                                        me.myName = records[0].data.merchandiseName;
                                    }
                                }
                            },
                            dataIndex: 'merchandiseName'
                        },
                        {
                            text: '数量',
                            editor: new Ext.form.field.Number({
                                maxValue: 99,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'num'
                        },
                        {
                            text: '采购单价',
                            editor: new Ext.form.field.Number({
                                maxValue: 9999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'price'
                        },
                        {
                            text: '总价',
                            dataIndex: 'total'
                        }
                    ]
                }
            ]
        });

        this.callParent();
    }
});