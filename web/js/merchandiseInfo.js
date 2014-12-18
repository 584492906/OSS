Ext.define('js.merchandiseInfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'merchandiseInfo',
                pageSize: itemsPerPage,
                fields: [
                    'merchandiseId',
                    'merchandiseName',
                    'merchandiseAb',
                    'price',
                    'saleStatus',
                    'spec',
                    'describe',
                    'remark',
                    'meMerchandiseCInfo.merchandiseCName',
                    'meUnitInfo.name',
                    'meProStatusInfo.proStatusName'
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
                autoLoad: false
            });

        myStore.load({
            params: {
                start: 0,
                limit: itemsPerPage
            }
        });

//销售状态
        var sellStore = Ext.create('Ext.data.Store', {


            fields: ['key', 'value'
            ],
            data: [
                {'key': 'true', 'value': '上架'},
                {'key': 'false', 'value': '下架'}
            ],
            autoLoad: true
        })
//商品单位
        var unifStore = Ext.create('Ext.data.Store',
            {
                fields: [
                    'name', 'unitId'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/unitinfo',
                    reader: {
                        type: 'json',
                        root: 'unit'
                    }
                },
                autoLoad: true
            });
//商品分类
        var CStore = Ext.create('Ext.data.Store',
            {
                fields: [
                    'merchandiseCName', 'merchandiseCid'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/merchandiseCinfo',
                    reader: {
                        type: 'json',
                        root: 'merchandise'
                    }
                },
                autoLoad: true
            });
//促销状态
        var proStore = Ext.create('Ext.data.Store',
            {
                fields: [
                    'proStatusId', 'proStatusName'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/queryProstatus',
                    reader: {
                        type: 'json',
                        root: 'list',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: true
            });
//销售状态
        var sellStore1 = Ext.create('Ext.data.Store', {


            fields: ['key', 'value'
            ],
            data: [
                {'key': 'true', 'value': '上架'},
                {'key': 'false', 'value': '下架'}
            ],
            autoLoad: true
        })
//商品单位
        var unifStore1 = Ext.create('Ext.data.Store',
            {
                fields: [
                    'name', 'unitId'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/unitinfo',
                    reader: {
                        type: 'json',
                        root: 'unit'
                    }
                },
                autoLoad: true
            });
//商品分类
        var CStore1 = Ext.create('Ext.data.Store',
            {
                fields: [
                    'merchandiseCName', 'merchandiseCid'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/merchandiseCinfo',
                    reader: {
                        type: 'json',
                        root: 'merchandise'
                    }
                },
                autoLoad: true
            });
//促销状态
        var proStore1 = Ext.create('Ext.data.Store',
            {
                fields: [
                    'proStatusId', 'proStatusName'

                ],
                proxy: {
                    type: 'ajax',
                    url: '/queryProstatus',
                    reader: {
                        type: 'json',
                        root: 'list',
                        totalProperty: 'rowcount'
                    }
                },
                autoLoad: true
            });
//应用
        Ext.apply(this, {

            store: myStore,
            layout: 'border',
            title: '商品信息字典维护',
            closable: true,
            id: '商品信息字典维护',
            columns: [
                {text: '商品编码', dataIndex: 'merchandiseId'},
                {text: '商品名称', dataIndex: 'merchandiseName'},
                {text: '助记码', dataIndex: 'merchandiseAb'},
                {text: '销售状态', dataIndex: 'saleStatus'},
                {text: '销售价格(元)', dataIndex: 'price'},
                {text: '类别', dataIndex: 'meMerchandiseCInfo.merchandiseCName'},
                {text: '单位', dataIndex: 'meUnitInfo.name'},
                {text: '促销状态', dataIndex: 'meProStatusInfo.proStatusName'}
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

            var window = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '商品信息添加',
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
                                name: 'merchandise.merchandiseId',
                                fieldLabel: '商品编号',
                                labelWidth: 45,
                                allowBlank: false

                            },

                            {
                                xtype: 'textfield',
                                name: 'merchandise.merchandiseName',
                                fieldLabel: '商品名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '助记码',
                                name: 'merchandise.merchandiseAb',
                                labelWidth: 45

                            },
                            {
                                xtype: 'combo',
                                name: 'merchandise.saleStatus',
                                fieldLabel: '销售状态',
                                labelWidth: 45,
                                displayField: 'value',
                                valueField: 'key',
                                store: sellStore,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'merchandise.price',
                                fieldLabel: '销售价格（元）',
                                labelWidth: 45,
                                allowBlank: false
                            }
                            ,
                            {
                                xtype: 'combo',
                                name: 'merchandise.meMerchandiseCInfo.merchandiseCid',
                                fieldLabel: '类别',
                                store: CStore,
                                displayField: 'merchandiseCName',
                                valueField: 'merchandiseCid',
                                labelWidth: 45

                            },
                            {
                                xtype: 'combo',
                                name: 'merchandise.meUnitInfo.unitId',
                                fieldLabel: '单位',
                                store: unifStore,
                                displayField: 'name',
                                valueField: 'unitId',
                                labelWidth: 45

                            },
                            {
                                xtype: 'combo',
                                name: 'merchandise.meProStatusInfo.proStatusId',
                                fieldLabel: '促销状态',
                                store: proStore,
                                displayField: 'proStatusName',
                                valueField: 'proStatusId',
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
                                            url: '/AddmerchandiseInfo.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('商品信息字典维护').store.reload();


                                                }
                                                else {
                                                    Ext.Msg.alert('错误', action.result.message);
                                                }
                                            },
                                            failure: function () {
                                                Ext.Msg.alert('错误', '服务器错误');
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
            var stuInfo = Ext.getCmp('商品信息字典维护').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '商品信息修改',
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
                                name: 'merchandiseInfo.merchandiseId',
                                fieldLabel: '商品编号',
                                labelWidth: 45,

                                value: stuInfo.get('merchandiseId')
                            },

                            {
                                xtype: 'textfield',
                                name: 'merchandiseInfo.merchandiseName',
                                value: stuInfo.get('merchandiseName'),
                                fieldLabel: '商品名称',

                                labelWidth: 45,
                                allowBlank: false

                            },
                            {xtype: 'textfield',

                                fieldLabel: '助记码',
                                labelWidth: 45,
                                name: 'merchandiseInfo.merchandiseAb',
                                value: stuInfo.get('merchandiseAb')

                            },
                            {
                                xtype: 'combo',
                                name: 'merchandiseInfo.saleStatus',
                                value: stuInfo.get('saleStatus'),
                                fieldLabel: '销售状态',
                                labelWidth: 45,
                                store: sellStore,
                                displayField: 'value',
                                valueField: 'key',
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'merchandiseInfo.price',
                                value: stuInfo.get('price'),
                                fieldLabel: '销售价格（元）',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'combo',
                                name: 'merchandiseInfo.meMerchandiseCInfo.merchandiseCid',
                                value: stuInfo.raw.meMerchandiseCInfo.merchandiseCid,
                                fieldLabel: '类别',
                                store: CStore1,
                                displayField: 'merchandiseCName',
                                valueField: 'merchandiseCid',
                                labelWidth: 45,
                                allowBlank: false
                            },

                            {
                                xtype: 'combo',
                                name: 'merchandiseInfo.meUnitInfo.unitId',
                                value: stuInfo.raw.meUnitInfo.unitId,
                                fieldLabel: '单位',
                                store: unifStore1,
                                displayField: 'name',
                                valueField: 'unitId',
                                labelWidth: 45,
                                allowBlank: false,
                                editable: false
                            },
                            {
                                xtype: 'combo',
                                name: 'merchandiseInfo.meProStatusInfo.proStatusId',
                                value: stuInfo.raw.meProStatusInfo.proStatusId,
                                fieldLabel: '促销状态',
                                store: proStore1,
                                displayField: 'proStatusName',
                                valueField: 'proStatusId',
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
                                            url: '/updateMerchandiseInfo.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    update.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('商品信息字典维护').store.reload();


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
                    var supInfo = Ext.getCmp('商品信息字典维护').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delMerchandiseInfo.action?merchandise.merchandiseId=' + supInfo.get('merchandiseId'),
                            success: function (action) {
                                Ext.getCmp('商品信息字典维护').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.success) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('商品信息字典维护').store.reload();
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