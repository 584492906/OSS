Ext.define('js.unitinfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'unitinfo',
                pageSize: itemsPerPage,
                fields: [
                    {name: 'unitId', type: 'String'},
                    {name: 'name', type: 'String'},
                    {name: 'status', type: 'String'},
                    {name: 'remark', type: 'String'}

                ],
                proxy: {
                    type: 'ajax',
                    url: '/unitinfo',
                    reader: {
                        type: 'json',
                        root: 'unit',
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
            title: '商品单位字典维护',
            closable: true,
            id: '商品单位字典维护',
            columns: [
                {text: '单位编码', dataIndex: 'unitId'},
                {text: '单位名称', dataIndex: 'name'},
                {text: '状态', dataIndex: 'status'},
                {text: '备注', dataIndex: 'remark'}

            ],
            tbar: [

                {
                    xtype: 'button',
                    iconCls: '',
                    text: '添加',
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
//添加数据
        function showindow() {


            var states = Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    {"abbr": "true", "name": "是"},
                    {"abbr": "false", "name": "否"}
                ]
            });

            var window = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '商品单位添加',
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
                                name: 'unit.name',
                                fieldLabel: '商品分类名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '备注',
                                name: 'unit.remark',
                                labelWidth: 45

                            },
                            {
                                xtype: 'combobox',
                                name: 'unit.status',
                                fieldLabel: '状态',
                                store: states,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'abbr',
                                labelWidth: 45,
                                editable: false

                            }

                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: '/addUnitInfo.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('商品单位字典维护').store.reload();
                                                }
                                                else {
                                                    Ext.Msg.alert('错误', action.result.message);
                                                }
                                            },
                                            failure: function () {
                                                Ext.Msg.alert('系统提示', '服务器错误请联系管理员');
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

            var states = Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    {"abbr": "true", "name": "是"},
                    {"abbr": "false", "name": "否"}
                ]
            });

            var MerchandiseCInfo = Ext.getCmp('商品单位字典维护').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '商品单位修改',
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
                                name: 'unit.unitId',
                                fieldLabel: '商品单位编号',
                                hidden: true,
                                labelWidth: 45,

                                value: MerchandiseCInfo.get('unitId')
                            },

                            {
                                xtype: 'textfield',
                                name: 'unit.name',
                                value: MerchandiseCInfo.get('name'),
                                fieldLabel: '商品单位名称',

                                labelWidth: 45,
                                allowBlank: false

                            },
                            {xtype: 'textfield',

                                fieldLabel: '备注',
                                labelWidth: 45,
                                name: 'unit.remark',
                                value: MerchandiseCInfo.get('remark')

                            },
                            {
                                xtype: 'combobox',
                                name: 'unit.status',
                                value: MerchandiseCInfo.get('status'),
                                fieldLabel: '状态',
                                labelWidth: 45,
                                store: states,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'abbr',
                                editable: false
                            }

                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: '/updateUnitInfo.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    update.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('商品单位字典维护').store.reload();


                                                }
                                                else {
                                                    Ext.Msg.alert('错误', action.result.message);
                                                }
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert('系统提示', '系统故障，请联系管理员');
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
                    var supInfo = Ext.getCmp('商品单位字典维护').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delUnitInfo.action?unit.unitId=' + supInfo.get('unitId'),
                            success: function (action) {
                                Ext.getCmp('商品单位字典维护').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.success) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('商品单位字典维护').store.reload();
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