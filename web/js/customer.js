Ext.define('js.customer', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'customer',
                pageSize: itemsPerPage,
                fields: [
                    {name: 'userName', type: 'String'},
                    {name: 'pwd', type: 'String'},
                    {name: 'email', type: 'String'},
                    {name: 'linkName', type: 'String'},
                    {name: 'remark', type: 'String' },
                    {name: 'baMembeAddrInfos[0].tel', type: 'String'}
                ],
                proxy: {
                    type: 'ajax',
                    url: '/customer',
                    reader: {
                        type: 'json',
                        root: 'cuslist',
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
            title: '客户管理',
            closable: true,
            id: '客户管理',
            columns: [
                {text: '客户名称', dataIndex: 'userName', width: 300},
                {text: 'E-mail', dataIndex: 'email', width: 300},
                {text: '联系人', dataIndex: 'linkName', width: 300},
                {text: '联系电话', dataIndex: 'baMembeAddrInfos[0].tel', width: 300},
                {text: '备注', dataIndex: 'remark', width: 300}
            ],
//            tbar: [
//
//                {
//                    xtype: 'button',
//                    iconCls: '',
//                    text: '添加',
//                    handler: function () {
//
//                        showindow();
//                    }
//                },
//                {
//                    xtype: 'button',
//                    iconCls: '',
//                    text: '修改',
//                    handler: function () {
//                        updateMessage()
//                    }
//                },
//                {
//                    xtype: 'button',
//                    iconCls: '',
//                    text: '删除',
//                    handler: function () {
//                        Ext.Msg.show({
//                            title: '提示',
//                            msg: '确定删除该条数据吗？',
//
//                            buttons: Ext.Msg.YESNO,
//                            icon: Ext.Msg.QUESTION,
//                            fn: function (btn) {
//                                var supInfo = Ext.getCmp('客户管理').getSelectionModel().getSelection()[0];
//
//                                if (btn == 'yes') {
//                                    Ext.Ajax.request({
//                                        url: 'delSupplier.action?supplier.supplierId=' + supInfo.get('supplierId'),
//                                        success: function (action) {
//                                            Ext.getCmp('客户管理').store.reload();
//
//                                            var result;
//                                            if (typeof(action.responseText) === 'string') {
//
//                                                result = Ext.JSON.decode(action.responseText)
//
//                                            }
//                                            else {
//                                                result = action.responseText;
//                                            }
//                                            if (result.success) {
//                                                Ext.Msg.alert('提示', '删除成功')
//                                                Ext.getCmp('客户管理').store.reload();
//                                            }
//                                        }
//
//
//                                    })
//
//                                }
//                                else {
//
//                                }
//
//                            }
//                        })
//                    }
//                }
//            ],
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
//添加数据
        function showindow() {

            var window = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '添加客户',
                items: [

                    {
                        xtype: 'form',
                        id: 'insertForm',
                        frame: true,
                        defaults: {
                            labelAlign: 'right',
                            margin: '10 30 10 10'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'customer.userName',
                                fieldLabel: '客户名称',
                                labelWidth: 45,
                                allowBlank: false

                            },

                            {
                                xtype: 'textfield',
                                name: 'customer.email',
                                fieldLabel: '电子邮件',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '联系人',
                                name: 'customer.lName',
                                allowBlank: false,
                                labelWidth: 45

                            },
                            {
                                xtype: 'textfield',
                                name: 'customer.tBaMembeAddrInfosByUserName.tel',
                                fieldLabel: '联系电话',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'customer.remark',
                                fieldLabel: '备注',
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
                                            url: '/addCus.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('客户管理').store.reload();


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
            window.show();
            window.center();

        };

//修改数据
        function updateMessage() {
            var stuInfo = Ext.getCmp('客户管理').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '客户信息修改',
                items: [

                    {
                        xtype: 'form',
                        id: 'insertForm',
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

                                value: stuInfo.get('supplierId')
                            },

                            {
                                xtype: 'textfield',
                                name: 'supplier.supplierName',
                                value: stuInfo.get('supplierName'),
                                fieldLabel: '供应商名称',

                                labelWidth: 45,
                                allowBlank: false

                            },
                            {xtype: 'textfield',

                                fieldLabel: '供应商地址',
                                labelWidth: 45,
                                name: 'supplier.address',
                                value: stuInfo.get('address')

                            },
                            {
                                xtype: 'textfield',
                                name: 'supplier.linkName',
                                value: stuInfo.get('linkName'),
                                fieldLabel: '联系人',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'supplier.linkTel',
                                value: stuInfo.get('linkTel'),
                                fieldLabel: '联系方式',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'supplier.qq',
                                value: stuInfo.get('qq'),
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
                                                    Ext.getCmp('客户管理').store.reload();


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

//删除数据
        function deleteMessage() {
            var stuIn = Ext.getCmp('客户管理').getSelectionModel().getSelection()[0];
            var Msg = Ext.create('Ext.window.MessageBox', {

                title: '提示',
                msg: '确定删除该条数据吗？',

                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn == 'yes') {

                    }
                    else {
                        Msg.close();
                    }

                }

            })

        }

    }


})