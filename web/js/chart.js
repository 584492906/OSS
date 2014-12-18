Ext.define('js.chart', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var store2=Ext.create('Ext.data.JsonStore',
            {
                fields: [
                    'MerchandiseName','total'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/queryChart',
                    reader: {
                        type: 'json',
                        root: 'list'
                    }
                },
                autoLoad: true
            });

//应用
        Ext.apply(this, {

            items: [
                {
                    xtype: 'chart',
                    id: 'chart',
                    animate: true,
                    store: store2,
                    shadow: true,
                    legend: {
                        position: 'right'
                    },
                    insetPadding: 60,
                    theme: 'Base:gradients',
                    width: 500,
                    height: 350,
                    series: [
                        {
                            type: 'pie',
                            angleField: 'total',
                            showInLegend: true,
                            donut: false,
                            tips: {
                                width: 140,
                                height: 28,
                                trackMouse: true,
                                renderer: function (storeItem) {
                                    //calculate percentage.
                                    var total = 0;
                                    store2.each(function (rec) {
                                        total += rec.get('total');
                                    });
                                    this.setTitle(storeItem.get('MerchandiseName') + ': ' + Math.round(storeItem.get('total') / total * 100) + '%');
                                }
                            },
                            highlight: {
                                segment: {
                                    margin: 20
                                }
                            },
                            label: {
                                field: 'MerchandiseName',
                                display: 'rotate',
                                contrast: true,
                                font: '18px Arial'
                            }
                        }
                    ]
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
                        id: 'roleForm',
                        frame: true,
                        defaults: {
                            labelAlign: 'right',
                            margin: '10 30 10 10'
                        },
                        items: [

                            {
                                xtype: 'textfield',
                                name: 'role.roleName',
                                fieldLabel: '角色名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                name: 'role.sortId',
                                fieldLabel: '编码',
                                labelWidth: 45,
                                allowBlank: false
                            },

                            {
                                xtype: 'textfield',
                                name: 'role.state',
                                fieldLabel: '状态',
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
                                            url: '/addRole.action',
                                            success: function (form, action) {
                                                if (true == action.result.result) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('角色管理').store.reload();


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
            var stuInfo = Ext.getCmp('角色管理').getSelectionModel().getSelection()[0];
            var update = Ext.create('Ext.window.Window', {

                title: '信息修改',
                items: [

                    {
                        xtype: 'form',
                        id: 'upRoleForm',
                        frame: true,
                        defaults: {
                            labelAlign: 'right',
                            margin: '10 30 10 10'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'role.roleId',
                                fieldLabel: '操作员编号',
                                labelWidth: 45,
                                value: stuInfo.get('roleId'),
                                hidden: true

                            },

                            {
                                xtype: 'textfield',
                                name: 'role.roleName',
                                value: stuInfo.get('roleName'),
                                fieldLabel: '操作员名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                name: 'role.sortId',
                                value: stuInfo.get('sortId'),
                                fieldLabel: '编码',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'role.state',
                                value: stuInfo.get('state'),
                                fieldLabel: '状态',
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
                                            url: '/updateRole.action',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    update.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('角色管理').store.reload();


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

//删除数据
        function deleteMessage() {
            Ext.Msg.show({
                title: '提示',
                msg: '确定删除该条数据吗？',

                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    var supInfo = Ext.getCmp('角色管理').getSelectionModel().getSelection()[0];

                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'delRole.action?role.roleId=' + supInfo.get('roleId'),
                            success: function (action) {
                                Ext.getCmp('角色管理').store.reload();

                                var result;
                                if (typeof(action.responseText) === 'string') {

                                    result = Ext.JSON.decode(action.responseText)

                                }
                                else {
                                    result = action.responseText;
                                }
                                if (result.success) {
                                    Ext.Msg.alert('提示', '删除成功')
                                    Ext.getCmp('角色管理').store.reload();
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

            Ext.getCmp('角色管理').store.load({params: {qual: Ext.getCmp('qua11').getValue()}})
        }

    }


})




