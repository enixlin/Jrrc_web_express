Ext.onReady(function() {
    // 取得用户
    var Users = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: 'getAllUsersName'
        }
    });


    // 登录信息
    var LoginForm = Ext.create('Ext.form.Panel', {
        width: 300,
        height: 300,
        id: 'LoginForm',
        margin: '20 30 10 50',
        border: false,
        items: [{
            xtype: 'combobox',
            fieldLabel: '用户名',
            id: 'UID',
            name: 'id',
            store: Users,
            displayField: 'name',
            valueField: 'id'
        }, {
            xtype: 'textfield',
            fieldLabel: '密码',
            id: 'password',
            name: 'password',
            inputType: 'password'

        }, {
            xtype: 'button',
            icon: '/jrrc_web_php/public/icons/door_in.png',
            id: 'btn_submit',
            text: '登   &nbsp&nbsp 录',
            width: 170,
            margin: '10 0 10 105',
            listeners: {
                click: {
                    fn: function() {
                        Ext.getCmp('btn_submit')
                            .setDisabled(true);
                        submit();
                    }

                }
            }
        }]
    }).show();

    // 登录窗口
    var LoginWin = Ext.create('Ext.window.Window', {
        width: 400,
        height: 200,
        icon: '/jrrc_web_php/public/icons/world/world.png',
        title: '欢迎使用国际业务信息查询工具--用户登录',
        items: [LoginForm]
    }).show();

    // 处理登录事件
    function submit() {
        // 验证用户输入信息是否齐全
        var UID = Ext.getCmp('UID').value;
        var password = Ext.getCmp('password').value;
        if (UID != "" && password != "") {
            // console.log('用户：' + UID + " 密码：" + password);
        } else {
            // alert("用户名或密码请【填写完整】，请重新输入");
            showError("用户名或密码请【填写完整】，请重新输入");
            Ext.getCmp('btn_submit').enable(true);
            return;
        }

        // 提交请求
        Ext.Ajax.request({
            url: '/jrrc_web_php/Login/handle_login',
            method: 'post',
            params: {
                'id': UID,
                'password': password
            },
            success: function(response, opts) {
                if (response.responseText == 1) {
                    window.location.href = "/jrrc_web_php/Main/index";
                } else {
                    showError("【用户名或密码有误】，请检查后重新输入");
                    Ext.getCmp('btn_submit').enable(true);
                }
            },
            failure: function(response, opts) {
                alert("登录有误，出错信息：" + response.responseText);
                Ext.getCmp('btn_submit').enable(true);
            }
        });
    }

    function showError(msg) {

        Ext.create('Ext.window.Window', {
            title: "输入信息出错",
            modal: true,
            icon: '/jrrc_web_php/public/icons/error.png',
            width: 300,
            height: 100,

            items: {
                xtype: 'label',
                text: msg,
                margin: '20 10 10 10'
            }
        }).show();
    }

    var body = Ext.getBody();
    body.on({
        keypress: function(e, t, eOpts) {
            if (e.getKey() === Ext.event.Event.ENTER) {
                Ext.getCmp('btn_submit').setDisabled(true);
                submit();
            }
        }
    });



});