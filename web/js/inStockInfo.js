Ext.define('js.inStockInfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'inStockInfo',
                pageSize: itemsPerPage,
                fields: [
                    'billCode', 'inType', 'inTime', 'handlers', 'totalMoney', 'remark'],
                proxy: {
                    type: 'ajax',
                    url: '/inStockinfo',
                    reader: {
                        type: 'json',
                        root: 'list',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: false
            });

        myStore.load({
            params: {
                start: 0,
                limit: itemsPerPage
            }
        });

//应用
        Ext.apply(this, {

            store: myStore,
            layout: 'border',
            title: '订单查询',
            closable: true,
            id: '订单查询',
            columns: [
                {text: '订单号', dataIndex: 'billCode'},
                {text: '入库方式', dataIndex: 'inType'},
                {text: '入库时间', dataIndex: 'inTime'},
                {text: '经手人', dataIndex: 'handlers'},
                {text: '总价(元)', dataIndex: 'totalMoney'},
                {text: '备注', dataIndex: 'remark'}

            ],

            tbar: [

                {
                    xtype: 'button',
                    iconCls: '',
                    text: '详情',
                    handler: function () {

                        showindow();
                    }
                },
                {
                    xtype: 'button',
                    iconCls: '',
                    text: '修改',
                    handler: function () {
                        updateMessage()
                    }
                },
                {
                    xtype: 'button',
                    iconCls: '',
                    text: '删除',
                    handler: function () {
                        deleteMessage();
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: myStore,
                    dock: 'bottom',
                    displayInfo: true
                }
            ]
        });
        this.callParent();
//订单详情
        function showindow() {
            var stuInfo = Ext.getCmp('订单查询').getSelectionModel().getSelection()[0];
            var InStockStore = Ext.create('Ext.data.Store',
                {
                    id: 'inStockDInfo',
                    pageSize: itemsPerPage,
                    fields: [
                        'num', 'price', 'id', 'meInStockInfo.billCode', 'meMerchandiseInfo.merchandiseName'],
                    proxy: {
                        type: 'ajax',
                        url: '/inStockDetailInfo.action?mer.billCode=' + stuInfo.get('billCode'),
                        reader: {
                            type: 'json',
                            root: 'list',
                            totalProperty: 'rowcount'
                        }
                    },
                    autoLoad: false
                });

            InStockStore.load({
                params: {
                    start: 0,
                    limit: itemsPerPage
                }
            });

            var window = Ext.create('Ext.window.Window', {

                id: 'showInStockInfo',
                title: '订单详情',
                width: 550,
                height: 300,
                items: [
                    {   xtype: 'grid',
                        store: InStockStore,
                        columns: [
                            {text: '订单号', dataIndex: 'meInStockInfo.billCode'},
                            {text: 'ID', dataIndex: 'id'},
                            {text: '商品名称', dataIndex: 'meMerchandiseInfo.merchandiseName'},
                            {text: '数量', dataIndex: 'num'},
                            {text: '单价', dataIndex: 'price'},
                            {text: '总价', dataIndex: '{num*price}'}

                        ]
                    }
                ]
            });
            window.show();
            window.center();

        };

//修改数据
        function updateMessage() {
            var stuInfo = Ext.getCmp('订单查询').getSelectionModel().getSelection();
            if (stuInfo.length == 0) {
                Ext.Msg.alert('提示', '请选择数据');
            } else {
                var update = Ext.create('Ext.window.Window', {

                    id: 'window',
                    title: '订单修改',
                    items: [

                        {
                            xtype: 'form',
                            id: 'upinstdinfoForm',
                            frame: true,
                            defaults: {
                                labelAlign: 'right',
                                margin: '10 30 10 10'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'supplier.supplierId',
                                    fieldLabel: '供应商编号',
                                    labelWidth: 45,

                                    value: stuInfo[0].get('supplierId')
                                },

                                {
                                    xtype: 'textfield',
                                    name: 'supplier.supplierName',
                                    value: stuInfo[0].get('supplierName'),
                                    fieldLabel: '供应商名称',

                                    labelWidth: 45,
                                    allowBlank: false

                                },
                                {xtype: 'textfield',

                                    fieldLabel: '供应商地址',
                                    labelWidth: 45,
                                    name: 'supplier.address',
                                    value: stuInfo[0].get('address')

                                },
                                {
                                    xtype: 'textfield',
                                    name: 'supplier.linkName',
                                    value: stuInfo[0].get('linkName'),
                                    fieldLabel: '联系人',
                                    labelWidth: 45,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'supplier.linkTel',
                                    value: stuInfo[0].get('linkTel'),
                                    fieldLabel: '联系方式',
                                    labelWidth: 45,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'supplier.qq',
                                    value: stuInfo[0].get('qq'),
                                    fieldLabel: 'QQ',
                                    labelWidth: 45,
                                    allowBlank: false
                                }
                            ],
                            buttons: [
                                {
                                    text: '提交',
                                    handler: function () {
                                        var form = this.up('form').getForm();
                                        if (form.isValid()) {
                                            form.submit({
                                                url: '/updateSupplier.action',
                                                success: function (form, action) {
                                                    if (true == action.result.success) {
                                                        update.close();
                                                        Ext.Msg.alert('提示', action.result.message);
                                                        Ext.getCmp('供应商管理').store.reload();


                                                    }
                                                    else {
                                                        Ext.Msg.alert('错误', action.result.message);
                                                    }
                                                },
                                                failure: function (form, action) {
                                                    Ext.Msg.alert('错误', action.result.message);
                                                }
                                            })
                                        }
                                    }

                                },
                                {
                                    text: '重置',
                                    handler: function () {
                                        this.up('form').getForm().reset();
                                    }
                                }
                            ]}
                    ]

                });
                update.show();
                update.center();

            }
        }

//删除数据
        function deleteMessage() {
            Ext.Msg.show({
                title: '提示',
                msg: '确定删除该条数据吗？',

                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    var supInfo = Ext.getCmp('供应商管理').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delSupplier.action?supplier.supplierId=' + supInfo.get('supplierId'),
                            success: function (action) {
                                Ext.getCmp('供应商管理').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.success) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('供应商管理').store.reload();
                                }
                            }


                        })

                    }
                    else {

                    }

                }
            })
        }
    }

})