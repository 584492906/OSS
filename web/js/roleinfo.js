Ext.define('js.roleinfo', {
    extend: 'Ext.panel.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        //查询角色
        var myStore = Ext.create('Ext.data.Store',
            {
                id: 'roleInfo',
                pageSize: itemsPerPage,
                fields: [
                    'roleId', 'roleName', 'sortId', 'state'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/roleAll',
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

//使用状态
        var stateStore = Ext.create('Ext.data.Store',
            {
                pageSize: itemsPerPage,
                fields: [
                    'key', 'value'
                ],
                autoLoad: true,
                data: [
                    {'key': 'true', 'value': '使用'},
                    {'key': 'false', 'value': '不使用'}
                ]
            });
//应用
        Ext.apply(this, {


            layout: 'hbox',
            title: '角色管理',
            closable: true,
            id: '角色管理',
            items: [
                {
                    xtype: 'grid',
                    id: 'roleManage',
                    store: myStore,
                    height: 800,
                    columns: [
                        {text: '角色编码', dataIndex: 'roleId'},
                        {text: '角色名称', dataIndex: 'roleName'},
                        {text: '编码', dataIndex: 'sortId'},
                        {text: '状态', dataIndex: 'state'}

                    ],
                    listeners: {
                        beforeload: function (myStore, operation) {
                            if (Ext.getCmp('qua11')) {
                                var name = Ext.getCmp('qua11').getValue();
                                if (name) {
                                    if (operation.params) {
                                        operation.params.qual = name;
                                    }
                                    else {
                                        operation.params = {qual: name};
                                    }
                                }
                            }
                        },
                        itemclick: function (view, record) {
                            var tree = Ext.getCmp("authorTree");
                            if (tree) {
                                tree.close();
                            }
                            var roleId = record.data.roleId;
                            Ext.Ajax.request({
                                url: '/menuTree?role.roleId=' + roleId,
                                async: false,
                                success: function (response) {
                                    me.myData = response.responseText;
                                    if (typeof(me.myData) === "string") {
                                        me.myData = Ext.JSON.decode(me.myData)
                                    }
                                }
                            });
                            me.treestore = Ext.create("Ext.data.TreeStore", {
                                fields: [
                                    {name: "id", type: "String", mapping: "menu.id"},
                                    {name: "text", type: "String", mapping: "menu.menuName"}
                                ],
                                root: {
                                    text: '权限管理',
                                    id: '0',
                                    children: me.myData.menu.children
                                }
                            });
                            Ext.create("Ext.tree.TreePanel", {
                                store: me.treestore,
                                id: "authorTree",
                                collapsible: false,
                                border: false,
                                autoScroll: true

                            });
                            var tab = Ext.getCmp("showAuthor").items.get("autorTree");
                            var obj = Ext.create(Ext.getCmp("authorTree"));
                            if (!tab) {
                                Ext.getCmp('showAuthor').add(obj);
                                Ext.getCmp("showAuthor").setActive(obj);
                            } else {
                                if (Ext.getCmp('showAuthor').setActive() !== tab) {
                                    Ext.getCmp('showAuthor').setActive(obj);
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
                                    id: 'qua11'

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
                    ],
                    flex: 8.5
                },
                {    xtype: 'panel',
                    title: '权限查看',
                    titleAlign: 'left',
                    flex: 1.5,
                    id: 'showAuthor',
                    height: 803

                }
            ]
        });
        this.callParent();
//添加数据
        function insertMessage() {
            Ext.Ajax.request({
                url: '/AddAuthor',
                async: false,
                success: function (response) {
                    me.myData = response.responseText;
                    if (typeof(me.myData) === "string") {
                        me.myData = Ext.JSON.decode(me.myData)
                    }
                }
            });
            me.TreeStore = Ext.create("Ext.data.TreeStore", {
                fields: [
                    {name: "id", type: "String", mapping: "menu.id"},
                    {name: "text", type: "String", mapping: "menu.menuName"}
                ],
                root: {
                    text: '权限管理',
                    id: '0',
                    children: me.myData.menu.children
                }
            });

            var window = Ext.create('Ext.window.Window', {

                id: 'window',
                title: '添加',
                width: 260,
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
                                xtype: 'panel',
                                flex: 2,
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
                                        xtype: 'combo',
                                        name: 'role.state',
                                        store: stateStore,
                                        displayField: 'value',
                                        valueField: 'key',
                                        fieldLabel: '状态',
                                        emptyText: '请选择',
                                        labelWidth: 45,
                                        editable: false
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                flex: 8,
                                autoScroll: true,
                                rootVisible: false,
                                items: [
                                    {
                                        xtype: 'treepanel',
                                        id: 'treePanel9',
                                        store: me.TreeStore,
                                        height: 200,
                                        listeners: {
                                            checkchange: function (node, checked) {
                                                node.expand();
                                                node.checked = checked;
                                                if (true == checked) {
                                                    var parent_node = node.parentNode;

                                                    while (parent_node != null) {
                                                        parent_node.set('checked', checked);
                                                        parent_node = parent_node.parentNode;
                                                    }
                                                }
                                                node.eachChild(function (child) {
                                                    child.set('checked', checked);
                                                    child.fireEvent('checkchange', child, checked);
                                                });
                                            }
                                        }


                                    }
                                ]
                            }


                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    var selNodes = Ext.getCmp('treePanel9').getChecked();
                                    var userList = new Array();
                                    //遍历获取所有的节点数据
                                    Ext.each(selNodes, function (node, index) {
                                        //子节点 也就是用户节点
                                        var menu_id = node.data.id;
                                        if (menu_id != "0") {
                                            userList.push(menu_id);
                                        }

                                    });
                                    if (form.isValid()) {
                                        form.submit({
                                            params: {menus: userList},
                                            url: '/addRole',
                                            success: function (form, action) {
                                                if (true == action.result.result) {
                                                    window.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('roleManage').store.reload();


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
            var stuInfo = Ext.getCmp('roleManage').getSelectionModel().getSelection();
            Ext.Ajax.request({
                url: '/AddAuthor',
                async: false,
                success: function (response) {
                    me.myData = response.responseText;
                    if (typeof(me.myData) === "string") {
                        me.myData = Ext.JSON.decode(me.myData)
                    }
                }
            });
            me.TreeStore = Ext.create("Ext.data.TreeStore", {
                fields: [
                    {name: "id", type: "String", mapping: "menu.id"},
                    {name: "text", type: "String", mapping: "menu.menuName"}
                ],
                root: {
                    text: '权限管理',
                    id: '0',
                    children: me.myData.menu.children
                }
            });
            var length = stuInfo.length;
            if (length == 0) {
                Ext.Msg.alert('提示', '请选择数据！');
            }
            var update = Ext.create('Ext.window.Window', {

                title: '信息修改',
                width: 260,

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
                                value: stuInfo[0].get('roleId'),
                                hidden: true

                            },

                            {
                                xtype: 'textfield',
                                name: 'role.roleName',
                                value: stuInfo[0].get('roleName'),
                                fieldLabel: '操作员名称',
                                labelWidth: 45,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                name: 'role.sortId',
                                value: stuInfo[0].get('sortId'),
                                fieldLabel: '编码',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'textfield',
                                name: 'role.state',
                                value: stuInfo[0].get('state'),
                                fieldLabel: '状态',
                                labelWidth: 45,
                                allowBlank: false
                            },
                            {
                                xtype: 'panel',
                                flex: 8,
                                autoScroll: true,
                                rootVisible: false,
                                items: [
                                    {
                                        xtype: 'treepanel',
                                        id: 'treePanel9',
                                        store: me.TreeStore,
                                        height: 200,
                                        listeners: {
                                            checkchange: function (node, checked) {
                                                node.expand();
                                                node.checked = checked;
                                                if (true == checked) {
                                                    var parent_node = node.parentNode;

                                                    while (parent_node != null) {
                                                        parent_node.set('checked', checked);
                                                        parent_node = parent_node.parentNode;
                                                    }
                                                }
                                                node.eachChild(function (child) {
                                                    child.set('checked', checked);
                                                    child.fireEvent('checkchange', child, checked);
                                                });
                                            }
                                        }


                                    }
                                ]
                            }
                        ],
                        buttons: [
                            {
                                text: '提交',
                                handler: function () {
                                    var form = this.up('form').getForm();
                                    var selNodes = Ext.getCmp('treePanel9').getChecked();
                                    var userList = new Array();
                                    //遍历获取所有的节点数据
                                    Ext.each(selNodes, function (node, index) {
                                        //子节点 也就是用户节点
                                        var menu_id = node.data.id;
                                        if (menu_id != "0") {
                                            userList.push(menu_id);
                                        }
                                    });
                                    if (form.isValid()) {
                                        form.submit({
                                            params: {menus: userList},
                                            url: '/updateRole',
                                            success: function (form, action) {
                                                if (true == action.result.success) {
                                                    update.close();
                                                    Ext.Msg.alert('提示', action.result.message);
                                                    Ext.getCmp('roleManage').store.reload();

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
            var supInfo = Ext.getCmp('roleManage').getSelectionModel().getSelection();
            var leng = supInfo.length
            if (leng == 0) {
                Ext.Msg.alert('提示', '请选择数据！');
            }
            else {
                Ext.Msg.show({
                    title: '提示',
                    msg: '确定删除该条数据吗？',

                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                url: 'delRole.action?role.roleId=' + supInfo[0].get('roleId'),
                                success: function (action) {
                                    Ext.getCmp('roleManage').store.reload();

                                    var result;
                                    if (typeof(action.responseText) === 'string') {

                                        result = Ext.JSON.decode(action.responseText)

                                    }
                                    else {
                                        result = action.responseText;
                                    }
                                    if (result.success) {
                                        Ext.Msg.alert('提示', '删除成功')
                                        Ext.getCmp('roleManage').store.reload();
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

//查询数据
        function selectMessage() {

            Ext.getCmp('roleManage').store.load({params: {qual: Ext.getCmp('qua11').getValue()}})
        }

    }


})