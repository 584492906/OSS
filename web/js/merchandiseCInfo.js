Ext.define('js.merchandiseCInfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'merchandiseCInfo',
                pageSize: itemsPerPage,
                fields: [
                    'merchandiseCid','merchandiseCName','sortId', 'state'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/merchandiseCinfo',
                    reader: {
                        type: 'json',
                        root: 'merchandise',
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
            title: '商品类别字典维护',
            closable: true,
            id: '商品类别字典维护',
            columns: [
                {text: '商品编码', dataIndex: 'merchandiseCid'},
                {text: '分类名称', dataIndex: 'merchandiseCName', width: 200},
                {text: '排序编码', dataIndex: 'sortId', width: 300},
                {text: '状态', dataIndex: 'state', width: 300}
            ],
            listeners: {
                beforeload: function (myStore, operation) {
                    if (Ext.getCmp('qual')) {
                        var name = Ext.getCmp('qual').getValue();
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
                        deleteMessage();
                    }
                },
                {
                    xtype: 'form',
                    id: 'select',
                    layout: 'column',
                    text: '查询',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '查询',
                            id: 'qual',
                            labelWidth: 45,
                            labelAlign: 'right',
                            name: 'name'
                        },

                        {
                            xtype: 'button',
                            icon: '/img/zoom.png',
                            text: '查询',
                            margin: '0 0 0 5',
                            handler: function () {
                                selectMessage();

                            }

                        }
                    ],
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
        function insertMessage() {


            var states = Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    {"abbr": "true", "name": "是"},
                    {"abbr": "false", "name": "否"}
                ]
            });

            var window = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '商品分类添加',
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
                                name: 'merchandise.merchandiseCid',
                                fieldLabel: '商品分类编号',
                                labelWidth: 45,
                                allowBlank: false

                            },

                            {
                                xtype: 'textfield',
                                name: 'merchandise.merchandiseCName',
                                fieldLabel: '商品分类名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '排序编号',
                                name: 'merchandise.sortId',
                                labelWidth: 45

                            },
                            {
                                xtype: 'combobox',
                                name: 'merchandise.state',
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
                                            url: '/addMerchandise.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('商品类别字典维护').store.reload();
                                                }
                                                else {
                                                    Ext.Msg.alert('错误', action.result.message);
                                                }
                                            },
                                            failure: function (form, action) {
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

            var MerchandiseCInfo = Ext.getCmp('商品类别字典维护').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '商品类别修改',
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
                                name: 'merchandise.merchandiseCid',
                                fieldLabel: '商品类别编号',
                                labelWidth: 45,

                                value: MerchandiseCInfo.get('merchandiseCid')
                            },

                            {
                                xtype: 'textfield',
                                name: 'merchandise.merchandiseCName',
                                value: MerchandiseCInfo.get('merchandiseCName'),
                                fieldLabel: '商品类别名称',

                                labelWidth: 45,
                                allowBlank: false

                            },
                            {xtype: 'textfield',

                                fieldLabel: '商品类别排序',
                                labelWidth: 45,
                                name: 'merchandise.sortId',
                                value: MerchandiseCInfo.get('sortId')

                            },
                            {
                                xtype: 'combobox',
                                name: 'merchandise.state',
                                value: MerchandiseCInfo.get('state'),
                                fieldLabel: '商品类别状态',
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
                                            url: '/updateMerchandise.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    update.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('商品类别字典维护').store.reload();


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
                    var supInfo = Ext.getCmp('商品类别字典维护').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delMerchandise.action?merchandise.merchandiseCid=' + supInfo.get('merchandiseCid'),
                            success: function (action) {
                                Ext.getCmp('商品类别字典维护').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.success) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('商品类别字典维护').store.reload();
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
            Ext.getCmp("商品类别字典维护").store.load({params: {name: Ext.getCmp("qual").getValue()}});

        }
    }
})