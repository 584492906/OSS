Ext.define('js.operinfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'operInfo',
                pageSize: itemsPerPage,
                fields: [
                    'operId','operName','qq','address','email','linkTel','auRoleInfo.roleName','mobile','pwd'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/operAll',
                    reader: {
                        type: 'json',
                        root: 'operinfo',
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

        var roleStore=Ext.create('Ext.data.Store',
            {
                pageSize: itemsPerPage,
                fields: [
                    'roleId','roleName'
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
                autoLoad: true
            });
//应用
        Ext.apply(this, {

            store: myStore,
            layout: 'border',
            title: '操作员管理',
            closable: true,
            id: '操作员管理',
            columns: [
                {text: '管理员编码', dataIndex: 'operId'},
                {text: '管理员名称', dataIndex: 'operName'},
                {text: '密码', dataIndex: 'pwd',hidden:true},
                {text:'身份',dataIndex:'auRoleInfo.roleName'},
                {text: '地址', dataIndex: 'address'},
                {text: '电子邮件', dataIndex: 'email'},
                {text: '联系方式', dataIndex: 'linkTel'},
                {text: '手机', dataIndex: 'mobile'},
                {text: 'QQ', dataIndex: 'qq'}

            ],
            listeners: {
                beforeload: function (myStore, operation) {
                    if (Ext.getCmp('qua1')) {
                        var name = Ext.getCmp('qua1').getValue();
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
                            id: 'qua1'

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
                title: '添加',
                items: [

                    {
                        xtype: 'form',
                        id: 'operForm',
                        frame: true,
                        defaults: {
                            labelAlign: 'right',
                            margin: '10 30 10 10'
                        },
                        items: [

                            {
                                xtype: 'textfield',
                                name: 'oper.operName',
                                fieldLabel: '操作员账户',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.pwd',
                                fieldLabel: '操作员密码',
                                labelWidth: 45,
                                inputType:'password',
                                allowBlank: false
                            },
                            {
                                xtype:'combo',
                                fieldLabel:'角色',
                                store:roleStore,
                                displayField:'roleName',
                                valueField:'roleId',
                                editable:false,
                                name:'oper.auRoleInfo.roleId',
                                allowBlank:false,
                                labelWidth: 45
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '地址',
                                name: 'oper.address',
                                labelWidth: 45

                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.email',
                                fieldLabel: '电子邮件',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.linkTel',
                                fieldLabel: '联系方式',
                                labelWidth: 45,
                                allowBlank: false
                            }
                            ,
                            {
                                xtype: 'textfield',
                                name: 'oper.qq',
                                fieldLabel: 'QQ',
                                labelWidth: 45

                            },{
                                xtype: 'textfield',
                                name: 'oper.mobile',
                                fieldLabel: '手机',
                                labelWidth: 45
                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.state',
                                value:'true',
                                labelWidth: 45,
                                hidden:true
                            }
                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: '/addOper.action',
                                            success: function (form, action) {
                                                if (true == action.result.result) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('操作员管理').store.reload();


                                                }
                                                else {
                                                    Ext.Msg.alert('错误', action.result.message);
                                                }
                                            },
                                            failure: function () {
                                                Ext.Msg.alert('错误', '服务器错误!');
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
            var stuInfo = Ext.getCmp('操作员管理').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '信息修改',
                items: [

                    {
                        xtype: 'form',
                        id: 'updateForm',
                        frame: true,
                        defaults: {
                            labelAlign: 'right',
                            margin: '10 30 10 10'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'oper.operId',
                                fieldLabel: '操作员编号',
                                labelWidth: 45,
                                value: stuInfo.get('operId'),
                                hidden:true

                            },

                            {
                                xtype: 'textfield',
                                name: 'oper.operName',
                                value: stuInfo.get('operName'),
                                fieldLabel: '操作员名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.pwd',
                                value: stuInfo.get('pwd'),
                                fieldLabel: '密码',
                                labelWidth: 45,
                                inputType:'password',
                                allowBlank: false

                            },
                            {
                                xtype:'combo',
                                fieldLabel:'角色',
                                store:roleStore,
                                displayField:'roleName',
                                valueField:'roleId',
                                value:stuInfo.raw.auRoleInfo.roleId,
                                name:'oper.auRoleInfo.roleId',
                                editable:false,
                                allowBlank:false,
                                labelWidth: 45
                            },
                            {xtype: 'textfield',

                                fieldLabel: '地址',
                                labelWidth: 45,
                                name: 'oper.address',
                                value: stuInfo.get('address')

                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.email',
                                value: stuInfo.get('email'),
                                fieldLabel: '电子邮件',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.linkTel',
                                value: stuInfo.get('linkTel'),
                                fieldLabel: '联系方式',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.mobile',
                                value: stuInfo.get('mobile'),
                                fieldLabel: '手机',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.qq',
                                value: stuInfo.get('qq'),
                                fieldLabel: 'QQ',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'oper.state',
                                value:'true',
                                labelWidth: 45,
                                hidden:true
                            }
                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: '/updateOper.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    update.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('操作员管理').store.reload();


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
                    var supInfo = Ext.getCmp('操作员管理').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delOper.action?oper.operId=' + supInfo.get('operId'),
                            success: function (action) {
                                Ext.getCmp('操作员管理').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.result) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('操作员管理').store.reload();
                                }
                                else{
                                    Ext.Msg.alert('提示', '删除失败')
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

            Ext.getCmp('操作员管理').store.load({params: {qual: Ext.getCmp('qua1').getValue()}})
        }

    }


})