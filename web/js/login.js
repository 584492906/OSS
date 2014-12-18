Ext.define('OssLogin', {

    extend: "Ext.form.Panel",
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            title: '登录',
            width: 300,
            layout: 'form',
            frame: true,
            padding: '10',
            defaults: {
                xtype: 'textfield',
                labelWidth: 45,
                labelAlign: 'right',
                allowBlank: false
            },
            items: [
                {
                    fieldLabel: '管理员',
                    name: 'oper.operName',
                    blankText: '用户名不能为空！'

                },
                {
                    fieldLabel: '密码',
                    name: 'oper.pwd',
                    inputType: 'password',
                    blankText: '密码不能为空！'
                },
                {
                    xtype: 'panel',
                    bodyStyle: {
                        background: 'white'
                    },
                    layout: 'column',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '验证码',
                            name: 'validNum',
                            labelWidth: 45,
                            labelAlign: 'right',
                            columnWidth: .7
                        }
                        ,
                        {
                            xtype: 'panel',
                            border: false,
                            width: 70,
                            height: 26,
                            html: '<img src="validCode.jsp" width="80px" height="20px" id="validImg" onclick="this.src=\'validCode.jsp?r=\'+Math.random()"/>',
                            columnWidth: .3

                        }
                    ]

                }

            ],
            buttonAlign: 'center',
            style:{
                background:'white'
            },
            buttons: [

                {
                    text: '登录',
                    handler: me.doLogin
                },
                {
                    text: '重置',
                    handler: function () {

                        this.up('form').getForm().reset();

                    }

                }
            ]

        })
        this.callParent();


    },
    doLogin: function () {
        var form = this.up('form').getForm();

        if (form.isValid()) {

            form.submit({

                url: '/login.action',

                success: function (form, action) {
                    if (action.result.result==true) {
                        Ext.Msg.alert("系统提示",action.result.message)
                        window.location.href = 'jump'
                    } else  {
                        Ext.Msg.alert('系统提示', action.result.message)
                    }

                },
                failure: function () {
                    Ext.Msg.alert('系统提示', '服务器错误，请联系管理员！')
                }



            })
        }

    }


})