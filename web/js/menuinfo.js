Ext.define('js.menuinfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'menuInfo',
                pageSize: itemsPerPage,
                fields: [
                    'menuId', 'menuName', 'sortId', 'state'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/queryMenu',
                    reader: {
                        type: 'json',
                        root: 'menu',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: false
            });
        var stateStore = Ext.create('Ext.data.Store',
            {
                fields: [
                    'key', 'value'
                ],
                data:[
                    {'key':'使用','value':'true'},
                    {'key':'不使用','value':'false'}
                ],
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
            title: '系统菜单字典维护',
            closable: true,
            id: '系统菜单字典维护',
            columns: [
                {text: '菜单编码', dataIndex: 'menuId'},
                {text: '菜单名称', dataIndex: 'menuName'},
                {text: '编码', dataIndex: 'sortId'},
                {text: '状态', dataIndex: 'state'}

            ],
            listeners: {
                beforeload: function (myStore, operation) {
                    if (Ext.getCmp('qualA')) {
                        var name = Ext.getCmp('qualA').getValue();
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
            tbar: [


                {
                    xtype: 'button',
                    iconCls: '',
                    text: '修改',
                    handler: function () {
                        updateMessage()
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
                            name: 'name',
                            id: 'qualA'

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

//修改数据
        function updateMessage() {
            var stuInfo = Ext.getCmp('系统菜单字典维护').getSelectionModel().getSelection();
            var length = stuInfo.length;
            if (length == 0) {
                Ext.Msg.alert('提示', '请选择数据！');
            }
            else if (stuInfo[0].get('menuName') == '系统菜单字典维护') {
                Ext.Msg.alert('提示', '系统菜单无法修改!')
            } else {
                var update = Ext.create('Ext.window.Window', {

                    title: '信息修改',
                    items: [

                        {
                            xtype: 'form',
                            id: 'upMenuForm',
                            frame: true,
                            defaults: {
                                labelAlign: 'right',
                                margin: '10 30 10 10'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'menu.menuId',
                                    fieldLabel: '操作员编号',
                                    labelWidth: 45,
                                    value: stuInfo[0].get('menuId'),
                                    hidden: true

                                },

                                {
                                    xtype: 'textfield',
                                    name: 'menu.menuName',
                                    value: stuInfo[0].get('menuName'),
                                    fieldLabel: '菜单名称',
                                    labelWidth: 45,
                                    allowBlank: false,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'menu.sortId',
                                    value: stuInfo[0].get('sortId'),
                                    fieldLabel: '编码',
                                    labelWidth: 45,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combo',
                                    name: 'menu.state',
                                    store:stateStore,
                                    displayField:'key',
                                    valueField:'value',
                                    value: stuInfo[0].raw.state,
                                    fieldLabel: '状态',
                                    labelWidth: 45,
                                    allowBlank: false,
                                    editable:false
                                }
                            ],
                            buttons: [
                                {
                                    text: '提交',
                                    handler: function () {
                                        var form = this.up('form').getForm();
                                        if (form.isValid()) {
                                            form.submit({
                                                url: '/updateMenu.action',
                                                success: function (form, action) {
                                                    if (true == action.result.success) {
                                                        update.close();
                                                        Ext.Msg.alert('提示', action.result.message);
                                                        Ext.getCmp('系统菜单字典维护').store.reload();


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
                update.show();
                update.center();

            }
        }

//查询数据
        function selectMessage() {

            Ext.getCmp('系统菜单字典维护').store.load({params: {name: Ext.getCmp('qualA').getValue()}})
        }

    }


})