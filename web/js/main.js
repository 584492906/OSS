Ext.define('OssMain', {
    extend: 'Ext.container.Viewport',
    initComponent: function () {
        var me = this;
        this.createMenuList();
        //判断登录
        Ext.Ajax.request({
            url: 'validOper',
            async: false,
            success: function (response) {
                logger = Ext.JSON.decode(response.responseText);
                if(logger.result==false){
                    window.location = 'login.html'
                }
            },
            failure: function () {
                window.location = 'login.html'
            }
        });
        var username = logger.list[0].operName;
        var power = logger.list[0].auRoleInfo.roleName;
        //饼图
        var store1 = Ext.create('Ext.data.JsonStore',
            {
                fields: [
                    'MerchandiseName', 'total'
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
        var Warningstore=Ext.create('Ext.data.JsonStore',
            {
                fields: [
                    'meMerchandiseInfo.merchandiseName', 'num'
                ],
                proxy: {
                    type: 'ajax',
                    url: '/warningStock?num=50',
                    reader: {
                        type: 'json',
                        root: 'stockList'
                    }
                },
                autoLoad: true
            });

        Ext.apply(this, {
            layout: 'border',

            items: [
                //north
                {
                    region: 'north',
                    layout: 'column',
                    html: '<div class="header">' +
                        '</div>',
                    style: {
                        background: 'url(/img/x.gif)'
                    },
                    border: false,
                    items: [
                        {
                            html: '<div class="header">' +
                                '<img class="logo" SRC="img/LOGO.gif"/>' +
                                '<div class="title">' +
                                '<div class="wrap"><span class="color">远航电商管理系统</span></div>' +
                                '<span class="back">您成功的唯一选择</span>' +
                                '</div>' +
                                '<marquee  scrollAmount=4   onmouseout=start() width="600" >' +
                                '<img class="welcome" src="img/welcome.gif"/>' +
                                '<h2 class="x-panel-header">&nbsp;&nbsp;&nbsp;欢&nbsp;迎&nbsp;您&nbsp;的&nbsp;使&nbsp;用&nbsp;!</h2>' +
                                '</marquee>' +
                                '</div>',
                            columnWidth: .78,
                            columnHeight: 2
                        },
                        {
                            xtype: 'tbtext',
                            text: '当前用户：',
                            margin: '60 0 0 0',
                            columnWidth: .035,
                            style: {
                                textAlign: 'center',
                                fontWeight: 'bold'

                            }
                        },
                        {
                            xtype: 'tbtext',
                            text: username,
                            margin: '60 0 0 0',
                            columnWidth: .025

                        },
                        {
                            xtype: 'tbtext',
                            columnWidth: .035,
                            margin: '60 0 0 0',
                            text: '权限：',
                            style: {
                                textAlign: 'center',
                                fontWeight: 'bold'

                            }
                        },
                        {
                            xtype: 'tbtext',
                            text: power,
                            margin: '60 0 0 0',
                            columnWidth: .045
                        },
                        {
                            xtype: 'button',

                            text: '注销',
                            border: true,
                            columnWidth: .05,
                            border: false,
                            float: 'right',
                            margin: '55 0 0 0',
                            style: {
                                background: '/img/x.gif'

                            },
                            handler: function () {
                                window.location = 'logout.jsp';
                            }
                        }
                    ],
                    height: 80

                },
                {
                    region: 'west',
                    width: 150,
                    title: '菜单栏',
                    layout: 'accordion',
                    collapsible: true,
                    split: true,
                    margin: '5 0 5 0',
                    items: me.menuList,
                    titleAlign: 'left'
                },
                //center
                {
                    region: 'center',
                    margin: '5 0 5 0',
                    xtype: 'tabpanel',
                    id: 'Show1',
                    items: [
                        {
                            title: '首页',
                            closable: false,

                            items: [
                                { html: '<div class="shouye">本月销售排行榜</div>',
                                    border: false
                                },
                                {
                                    xtype: 'chart',
                                    id: 'chart',
                                    animate: true,
                                    store: store1,
                                    shadow: true,
                                    legend: {
                                        position: 'right'
                                    },
                                    insetPadding: 60,
                                    theme: 'Base:gradients',
                                    width: 700,
                                    height: 550,
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
                                                    store1.each(function (rec) {
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


                                },
                                {

                                }

                            ]
                        }

                    ]
                },
                //east
                {
                    region: 'east',
                    margin: '5 0 5 0',
                    width: 220,
                    title: '通知公告',
                    collapsible: false,
                    split: true,
                    titleAlign: 'left',
                    items:[
                        {
                            xtype:'tbtext',
                            text:'下列商品低于库存警戒线，请及时进货',
                            style: {
                                fontWeight: 'bold',
                                color: 'red'
                            }

                        },{
                            xtype:'grid',
                            store:Warningstore,
                            sortable:false,
                            hideHeaders:false,
                            columns: [
                                {text: '商品名称', dataIndex: 'meMerchandiseInfo.merchandiseName',width:112},
                                {text: '数量', dataIndex: 'num',width:102}
                            ],
                            listeners:{

                            }


                        }
                    ]


                },
                //south
                {
                    region: 'south',
                    xtype: 'toolbar',
                    height: 30,
                    border: false,
                    items: [
                        '->',
                        {

                            xtype: 'tbtext',
                            id: 'mydate',
                            style: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: 'silver'
                            },
                            width: 200,
                            listeners: {
                                'render': function () {
                                    Ext.TaskManager.start({
                                        run: function () {
                                            Ext.getCmp('mydate').update('系统时间：' + Ext.util.Format.date((new Date()), 'Y-m-d H:i:s'));
                                        },
                                        interval: 1000
                                    });
                                }
                            }
                        },

                        '->',
                        {
                            xtype: 'tbtext',
                            text: '远航商贸V1.0 版权所有 远航科技公司 Copyright &copy2014~2015',
                            style: {
                                fontWeight: 'bold',
                                color: 'red'
                            }
                        }
                    ]

                }

            ]

        });
        this.callParent();
    },
    menuList: new Array(),
    createMenuList: function () {
        var menuData = {}, tpl, me = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01" style="text-align: center;line-height: 50px">',

            '<div class="con">',
            '<input class="button" type="button" value="{menuName}"style="background-image: url({src})" />',
            '<div class="con1"></div>',
            '</div>',
            '</div>',
            '</tpl>'
        );

        Ext.Ajax.request({
            url: 'validOper',
            async: false,
            success: function (response) {
                logger = Ext.JSON.decode(response.responseText);
            },
            failure: function () {
                window.location = 'login.html'

            }
        });
        if(logger.result==true) {
            var roleId = logger.list[0].auRoleInfo.roleId
            Ext.Ajax.request({
                url: '/menuTree?role.roleId=' + roleId,
                async: false,
                success: function (response) {
                    menuData = Ext.JSON.decode(response.responseText);
                }
            });


            for (var i = 0, len = menuData.menu.children.length; i < len; i++) {
                var storeID = 'store_' + i, item, title = menuData.menu.children[i].menu.menuName;
                Ext.create('Ext.data.Store', {
                    id: storeID,
                    data: menuData.menu.children[i].children,
                    fields: [
                        {name: 'src', mapping: 'menu.src'},
                        {name: 'menuName', mapping: 'menu.menuName'},
                        {name: 'state', mapping: 'menu.state'},
                        {name: 'url', mapping: 'menu.url'}
                    ]
                });

                item = {
                    xtype: 'panel',
                    title: title,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'dataview',
                            store: Ext.data.StoreManager.lookup(storeID),
                            tpl: tpl,
                            itemSelector: 'div.part01',
                            listeners: {
                                itemclick: function (view, record) {

                                    Ext.require(record.get('url'), function () {
                                        var center = Ext.getCmp('Show1');
                                        var comp = center.items.get(record.get('menuName'));
                                        if (!comp) {
                                            var obj = Ext.create(record.get('url'));
                                            center.add(obj);
                                            center.setActiveTab(obj);
                                        } else {
                                            if (center.setActiveTab() !== comp) {
                                                center.setActiveTab(comp);
                                            }
                                        }
                                    }, this)
                                }
                            }
                        }
                    ]
                };

                me.menuList.push(item);
            }
        }
    }
});