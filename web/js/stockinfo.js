Ext.define('js.stockinfo', {
    extend: 'Ext.grid.Panel',
//初始化
    initComponent: function () {

        var me = this;
        var itemsPerPage = 10;
        var myStore = Ext.create('Ext.data.Store',
            {
                pageSize: itemsPerPage,
                fields: [
                        'meMerchandiseInfo.merchandiseName','avgPrice','num','meMerchandiseInfo.merchandiseId'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/StockInfo',
                    reader: {
                        type: 'json',
                        root: 'stockinfo',
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
            title: '库存信息查看',
            closable: true,
            id: '库存信息查看',
            columns: [
                {text: '商品编码', dataIndex: 'meMerchandiseInfo.merchandiseId'},
                {text: '商品名称', dataIndex: 'meMerchandiseInfo.merchandiseName', width: 200},
                {text: '数量', dataIndex: 'num', width: 300},
                {text: '平均价', dataIndex: 'avgPrice', width: 300}

            ],
            listeners: {
                beforeload: function (myStore, operation) {
                    if (Ext.getCmp('query9')) {
                        var name = Ext.getCmp('query9').getValue();
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
                    xtype: 'panel',
                    border: false,
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '查询',
                            labelWidth: 45,
                            labelAlign: 'right',
                            name: 'qual',
                            id: 'query9'

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

//查询数据
        function selectMessage() {

            Ext.getCmp('库存信息查看').store.load({params: {name: Ext.getCmp('query9').getValue()}})
        }

    }


})