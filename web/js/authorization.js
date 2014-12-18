Ext.define('js.authorization', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'author',
                pageSize: itemsPerPage,
                fields: [
                    'state', 'roleName', 'roleId','sortId'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/queryRole',
                    reader: {
                        type: 'json',
                        root: 'role',
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
            title: '权限管理',
            closable: true,
            id: '权限管理',
            columns: [
                {text: '角色编码', dataIndex: 'roleId', width: 200},
                {text: '角色名称', dataIndex: 'roleName', width: 200},
                {text: '排序编码', dataIndex: 'sortId', width: 300},
                {text: '状态', dataIndex: 'state'}

            ],
            listeners: {
                beforeload: function (myStore, operation) {
                    if (Ext.getCmp('qua')) {
                        var name = Ext.getCmp('qua').getValue();
                        if (name) {
                            if (operation.params) {
                                operation.params.qual = name;
                            }
                            else {
                                operation.params = {qual: name};
                            }
                        }
                    }
                }
            },
//按钮栏
            tbar: [

                {
                    xtype: 'button',
                    iconCls: '',
                    text: '添加',
                    handler: function () {

                        insertMessage();
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
                        deleteMessage()
                    }
                },
                {
                    xtype: 'panel',
                    border: false,
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '查询',
                            labelWidth: 45,
                            labellign: 'right',
                            name: 'qual',
                            id: 'qua'

                        },
                        {
                            xtype: 'button',
                            text: '查询',
                            handler: function () {
                                selectMessage();
                            }
                        }
                    ]
                }
            ],
//分页
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
        function insertMessage() {

            var window = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '权限添加',
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
                                allowBlank: false

                            },

                            {
                                xtype: 'textfield',
                                name: 'supplier.supplierName',
                                fieldLabel: '供应商名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '供应商地址',
                                name: 'supplier.address',
                                labelWidth: 45

                            },
                            {
                                xtype: 'textfield',
                                name: 'supplier.linkName',
                                fieldLabel: '联系人',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'supplier.linkTel',
                                fieldLabel: '联系方式',
                                labelWidth: 45,
                                allowBlank: false
                            }
                            ,
                            {
                                xtype: 'textfield',
                                name: 'supplier.qq',
                                fieldLabel: 'QQ',
                                labelWidth: 45

                            }
                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: '/addSup.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('权限管理').store.reload();


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
            var stuInfo = Ext.getCmp('权限管理').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '供应商信息修改',
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
                                                    Ext.getCmp('权限管理').store.reload();


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
            Ext.Msg.show({
                title: '提示',
                msg: '确定删除该条数据吗？',

                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    var supInfo = Ext.getCmp('权限管理').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delSupplier.action?supplier.supplierId=' + supInfo.get('supplierId'),
                            success: function (action) {
                                Ext.getCmp('权限管理').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.success) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('权限管理').store.reload();
                                }
                            }


                        })

                    }
                    else {

                    }

                }
            })

        }

//查询数据
        function selectMessage() {

            Ext.getCmp('权限管理').store.load({params: {qual: Ext.getCmp('qua1').getValue()}})
        }

    }


})