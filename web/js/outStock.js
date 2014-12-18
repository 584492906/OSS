Ext.define('js.outStock', {
    extend: 'Ext.panel.Panel',
    myCode: '',
    myName: '',
    stockList: [],
    stockNum:'',
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

        //出库方式
        var outStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'value'
            ],
            data: [
                {'key': '1', 'value': '正常出库'},
                {'key': '2', 'value': '报损'},
                {'key': '3', 'value': '盘亏'}
            ],
            autoLoad: true

        })
        //操作员
        var OperStore = Ext.create('Ext.data.Store',
            {
                fields: [
                    'operId', 'operName'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/operStore',
                    reader: {
                        type: 'json',
                        root: 'oper',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: true
            });



        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        if (context.value) {
                            var myStore = Ext.data.StoreManager.lookup('myStore1');

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
                            Ext.getCmp('total1').setValue(me.totalmoney);

                        }
                    }
                }
            }
        );
        Ext.apply(this, {
            title: '商品出库',
            layout: 'vbox',
            closable: true,
            id: '商品出库',
            tbar: [
                {
                    text: '提交',
                    handler: function () {
                        var mydata = Ext.data.StoreManager.lookup('myStore1').data.items;
                        var postData = '';
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'outStockDetailsInfo[' + index + '].meMerchandiseInfo.merchandiseId=' + item.data.merchandiseId1 + '&outStockDetailsInfo[' + index + '].price=' + item.data.price + '&outStockDetailsInfo[' + index + '].num=' + item.data.num;
                            if (index != mydata.length - 1) {
                                postData += '&';
                            }
                        });
                        Ext.getCmp('myFrom1').submit({
                            url: 'outStock.action?' + postData,
                            success: function (form, action) {
                                if (action.result.success == true) {
                                    Ext.Msg.alert('提示', action.result.message);
                                    Ext.getCmp('outstockStore').store.reload();
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
                    id: 'myFrom1',
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


                                {   xtype: 'combo',
                                    fieldLabel: '操作员',
                                    store: OperStore,
                                    displayField: 'operName',
                                    valueField: 'operId',
                                    name: 'outStockInfo.auOperInfo.operId',
                                    editable: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '经手人',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    name: 'outStockInfo.handlers'
                                },
                                {
                                    xtype: 'textarea',
                                    fieldLabel: '备注',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    name: 'outStockInfo.remark'
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
                                    fieldLabel: '出库日期',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    editable: false,
                                    name: 'outStockInfo.outTime',
                                    value: Ext.Date.format(new Date, 'Y-m-d H:i'),
                                    readOnly: true

                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: '出库方式',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    editable: false,
                                    store: outStore,
                                    displayField: 'value',
                                    valueField: 'key',
                                    queryMode: 'local',
                                    name: 'outStockInfo.outType'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'total1',
                                    fieldLabel: '总金额',
                                    labelAlign: 'right',
                                    labelWidth: 90,
                                    name: 'outStockInfo.totalMoney'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    id: 'outstockStore',
                    plugins: cellEditing,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore1',
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
                                        Ext.Ajax.request({
                                            url: 'queryStockInfo?merchandiseId=' + me.myCode,
                                            async: false,
                                            success: function (response) {
                                                stockList = Ext.JSON.decode(response.responseText);
                                                me.stockNum=stockList.stockinfo[0].num
                                            }

                                        });

                                    }
                                }
                            },
                            dataIndex: 'merchandiseName'
                        },
                        {
                            text: '数量',
                            editor: new Ext.form.field.Number({
                                maxValue:me.stockNum,
                                minValue: 0,
                                allowBlank: false
                            }),

                            dataIndex: 'num'
                        },
                        {
                            text: '单价',
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