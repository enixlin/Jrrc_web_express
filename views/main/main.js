Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Report': '/jrrc_web_php/public/static/js/report'

    }
});


Ext.onReady(function () {

    // 退出系统按键
    var btn_logout = Ext.create('Ext.button.Button', {
        text: '退出',
        icon: '/jrrc_web_php/public/icons/monitor/monitor_delete.png',
        width: 100,
        style: "float:right;margin:8px 5px 0 0",
        listeners: {
            click: {
                fn: function () {

                    if (confirm("是否要退出") == true) {
                        logout();
                    }
                }
            }
        }
    }
    );
    // 处理退出登录事件
    function logout() {
        Ext.Ajax.request({
            url: '/jrrc_web_php/Login/logout',
            method: 'post',
            success: function (response, opts) {
                window.location.href = "/jrrc_web_php/Login/login";
            },
            failure: function (response, opts) {
                alert("登录有误，出错信息：" + response.responseText);
            }

        });

    }

    // 变更用户角色按键
    var btn_change_ruler = Ext.create('Ext.button.Button', {
        text: '变更角色',
        width: 100,

        icon: '/jrrc_web_php/public/icons/user/user_go.png',
        style: "float:right;margin:8px 5px 0 0",
        listeners: {
            click: {
                fn: function () {
                    // var b = Ext.create('Ext.button.Button', {
                    //     text: 'button'
                    // });
                    var win = Ext.create('public.static.myux.MyWindow').show();
                    // centerSide.items.push({b});
                    //console.log(table);

                }
            }
        }
    }
    );

    var label_title = Ext.create('Ext.form.Label', {
        text: "江门融和农商银行国际业务信息查询系统",
        style: "color:#5FA2DD;font:30px/50px heiti serif;margin:2px 3px 0 10px ",
        alignTarget: 'right'
    });

    var label_user = Ext.create('Ext.form.Label', {
        text: "欢迎你：[" + userName + "]**[" + ruler + "]",
        style: "color:gray;margin:0 10px 0 0;font:12px/50px heiti serif ;float:right",
        alignTarget: 'right'
    });

    /*===================================
     *
     * 项部标题和用户信息
     *
     *
     * ==================================
     */
    var northSide = Ext.create('Ext.panel.Panel', {
        region: 'north',
        split: true,
        width: '100%',
        height: 50,

        items: [label_title, btn_logout, btn_change_ruler, label_user]

    });

    /*===================================
     *
     * 左则功能菜单树
     *
     *
     * ==================================
     */
    var leftSide = Ext.create('Ext.panel.Panel', {
        title: '系统功能',
        icon: '/jrrc_web_php/public/icons/application/application_side_boxes.png',
        region: 'west',

        margin: '0 0 0 0',
        width: 200,
        split: true,
        collapsible: true, // make collapsible
        id: 'west-region-container',
        layout: 'fit',
        items: []
    });

    /*===================================
     *
     * 底部版权和版本信息
     *
     * ==================================
     */
    var southSide = {
        title: '<CENTER>融和农商银行国际业务部版权所有@2017年4月 VERSION 1.0</CENTER>',
        region: 'south',
        height: 35,
        padding: '0 0 0 0'

    };


    /*===================================
     *
     * 右则主功能tab窗口
     *
     * ==================================
     */


    function makeTipsPage(container, js_file) {
        console.log(container);
        Ext.Ajax.request({
            url: '/jrrc_web_php/public/static/js/subFunction/' + js_file + '.js',

            success: function (response, opts) {

                var obj = eval(response.responseText);
                var tab = {
                    title: "工作台",
                    closable: false,
                    id: 0,
                    items: [obj]
                };

                container.add(tab).show();
            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }

    var tabPanel = Ext.create('Ext.tab.Panel', {
       
    });

    makeTipsPage(tabPanel,"tipsPage");

    var centerSide = {
        // title : '',
        collapsible: false,
        fixed: true,
        scrollable: true,
        region: 'center',
        padding: '0 0 0 0',
        margin: '0 0 0 0',
        items: [tabPanel]
    };

    /*===================================
     *
     * 项部标题和用户信息
     *
     * ==================================
     */
    Ext.define('mainWindow', {
        extend: 'Ext.panel.Panel',
        xtype: 'layout-border',
        requires: ['Ext.layout.container.Border'],
        layout: 'border',
        width: '99%',
        height: 600,
        margin: '10 10 10 10',
        bodyBorder: false,
        defaults: {
            bodyPadding: 0
        },
        items: [northSide, southSide, leftSide, centerSide],
        listeners: {
            render: {
                fn: function () {
                    leftSide.add(createFunctionTree().expand());

                }
            }
        }
    });

    Ext.create("mainWindow", {
        renderTo: Ext.getBody()
    });


    /*
     * 根据用户ID生成功能树
     * */
    function createFunctionTree() {
        var treeModel = Ext.create('Ext.data.TreeModel', {

            fields: ['id', 'rule_id','controller', 'rule_name', 'p_id', 'type','level','status','leaf', 'js_file'],

        });


        var store = Ext.create('Ext.data.TreeStore', {
            //autoLoad : true,

            model: treeModel,

            proxy: {
                type: 'ajax',
                url: '/jrrc_web_php/Rule/makeRuleTree',
                reader: {
                    type: 'json',

                }


            }
        });

      //  console.log(store);

        var tree = Ext.create('Ext.tree.Panel', {

            width: 200,
            height: 150,
            store: store,
            rootVisible: false,//隐藏根节点
            displayField:"rule_name",
            folderSort: false,

            animate: true,
            listeners: {

                itemclick: {
                    fn: function (tree, record, item, index, e, eOpts) {
                        //  console.log(record.data);
                        if (record.data.leaf == true) {
                            console.log(record.data.text);
                            var tab = Ext.getCmp(record.data.id);
                            if (!tab) {
                                createTab(tabPanel, record);
                            } else {
                                tabPanel.setActiveTab(tab);
                            }

                        }
                    }
                }
            }
        });
        tree.expandAll();


        return tree;
    }


    function createTab(container, item) {
        console.log(item.data);
        Ext.Ajax.request({
            url: '/jrrc_web_php/public/static/js/subFunction/' + item.data.js_file + '.js',

            success: function (response, opts) {

                var obj = eval(response.responseText);
                //  var btn = Ext.create('Ext.button.Button', {text: 'button'});

                var tab = {
                    title: item.data.rule_name,
                    closable: true,
                    id: item.data.id,
                    // html: response.responseText,
                    items: [obj]
                }
                    ;

                container.add(tab).show();
            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });


    }


});