define([
    'jquery',
    'underscore',
    'backbone',
    'router/dispatcherEvent',
    // add all views here
    'views/accessory/LoadingDivView',
    'views/DefaultView',
    'views/code/CodeView',
    'views/accessory/DateButtonListView',
    'views/code/CodeListView',
    'views/code/CodeFormView',
    'views/code/CodeListHeaderView',
    'views/code/CodeNewListView',
    'router/routerApp',
    'views/ToolPageView',
    'views/AboutPageView',
    'views/HelpPageView',
    'views/code/CodeListSearchHeaderView'

], function($, _, Backbone, dispatcher, LoadingDivView, 
    DefaultView, CodeView, DateButtonListView, CodeListView, 
    CodeFormView, CodeListHeaderView, CodeNewListView, Router,
    ToolPageView, AboutPageView, HelpPageView, CodeListSearchHeaderView
    ){
    
    var contentView = Backbone.View.extend({

        el : '#content',

        // child views
        _childViews: {},

        // the range of child views
        _rangeOfViews: [],

        // delay render views
        _delayRenderSignals: {},

        // all definitions of child views need add here
        _predefinedViews: {
            index: DefaultView,
            code: CodeView,
            datebuttonlist: DateButtonListView,
            codelist: CodeListView,
            codeform: CodeFormView,
            codelistheader: CodeListHeaderView,
            codenewlist: CodeNewListView,
            toolpage: ToolPageView,
            aboutpage: AboutPageView,
            helppage: HelpPageView,
            codelistsearchheader: CodeListSearchHeaderView
        },

        initialize: function(){
            // bind the context 
            _.bindAll(this, 'render', 'delayRender', 'addChildView', 'resetChildViews', 'renderChildViews', 
                'showCodes', 'addCode', 'viewCode', 'showTools', 'showHelp', 'showAbout', 'searchCodes');
            // bind data
            this.codeTimeStatisticModel = this.options.codeTimeStatisticModel;

            // register custom event
            dispatcher.on('page:showCodes', this.showCodes);
            dispatcher.on('page:showTools', this.showTools);
            dispatcher.on('page:showAbout', this.showAbout);
            dispatcher.on('page:showHelp', this.showHelp);
            dispatcher.on('page:addCode', this.addCode);
            dispatcher.on('page:viewCode', this.viewCode);
            dispatcher.on('page:searchCodes', this.searchCodes);

            dispatcher.on('view:rendercontentview', this.delayRender);

            
        },

        render: function(){
            // do something to render self
            // console.log(this._rangeOfViews);
            this.renderChildViews();
            dispatcher.trigger('loading:end');
        },

        delayRender: function(data){
            _.extend(this._delayRenderSignals, data);
            // check render condition
            var beginRender = true;
            _.each(this._delayRenderSignals, function(value, view){

                if(false === value){
                    beginRender = false;

                    return;
                }
            });
            if(beginRender){
                this.render();
            }
            return this;
        },
 
        //
        addChildView: function(view, render, options){
            // set default value
            var render = !_.isUndefined(render) ? render : true;
            var options = !_.isUndefined(options) ? options : {};
            // add new instance, or override the old instance
            if(_.isUndefined(this._childViews[view])){
                // check if it needs render
                if(false === render){
                    this.addDelayRenderSingnal(view);
                }
                this._childViews[view] = new this._predefinedViews[view](options);
                  
            }
            
            return this;
        },

        addDelayRenderSingnal: function(singnal){
            dispatcher.trigger('loading:start');
            this._delayRenderSignals[singnal] = false;

            return this;
        },

        // destroy child views that are not include the array of views 
        resetChildViews: function(views){
            // empty data
            this._rangeOfViews = _.isArray(views) ? views : [];
            this._delayRenderSignals = {};

            return this;
        },

        // render child views
        renderChildViews: function(){
            var that = this;
            // foreach the child views
            _.each(this._rangeOfViews, function(view){
                if(_.isUndefined(that._childViews[view])){

                }else{
                    that.$el.append(that._childViews[view].$el);
                }
            });
            // destroy the unnecessary child views
            _.each(that._childViews, function(instance, view){
                if(-1 === _.indexOf(that._rangeOfViews, view)){
                        // destroy view
                        instance.destroy();
                        // remove reference
                        delete (that._childViews)[view];
                }
            });
        },

        viewCode: function(codeModel, activeStr){
            activeStr = activeStr || '';
            var router = new Router();
            var codeId = codeModel.get('id');
            var link = '#code/'+codeId;
            if(activeStr){
                link += '/'+activeStr;
            }
            router.navigate(link);
            
            this.resetChildViews(['code']).addChildView('code', true, {model: codeModel}).render();
            // load the editor
            // dispatcher.trigger('load:editor', {value: codeModel.get('fragment'), id:codeId, activeStr: activeStr, mode:codeModel.get('language'), readOnly: 'nocursor', el: '#code_mirror_detail', viewObj:this});            
            this._childViews.code.addCodeMirror({activeStr: activeStr});
        },

        showCodes: function(options){
            options || (options = {});
            if(_.isUndefined(options.year)){
                // navigate the current url
                // var router = new Router();
                // router.navigate('codes');
                
            }
            // only contain two child views
            this.resetChildViews(['codelistheader', 'datebuttonlist', 'codelist']);
            this.addChildView('codelistheader').addChildView('datebuttonlist', true, options).addChildView('codelist', true, options).render();
        },

        searchCodes: function(options){
            options || (options = {});
            // delete code list view
            this._childViews.codelist.destroy();
            delete this._childViews.codelist;
            this.resetChildViews(['codelistheader', 'codelistsearchheader', 'codelist']);
            this.addChildView('codelistheader').addChildView('codelistsearchheader', true, options).addChildView('codelist', true, options).render();  
        },

        addCode: function(options){
            options = options || {};
            _.extend(options, {codeTimeStatisticModel: this.codeTimeStatisticModel});
            // var router = new Router();
            // router.navigate('board');
            // if code form is existing, render the init status
            // console.log(!_.isUndefined(this._childViews.codeform));
            if(!_.isUndefined(this._childViews.codeform) && !_.isEmpty(options)){
                this._childViews.codeform.reboard(options);
            }
            // once the stuff of the form is ready, automatically render
            this.resetChildViews(['codeform', 'codenewlist']).addChildView('codenewlist', true, options).addChildView('codeform', false, options);
            $.gritter.removeAll();
            // add two nitifications
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: '',
                image: '/images/start_here_64.png',
                sticky: true,
                // (string | mandatory) the text inside the notification
                text: '<strong>Master of hands</strong> Use <kbd><kbd>CTRL</kbd>+<kbd>↑</kbd></kbd> to enter fullscreen, when you focus in the editor.',
                class_name: 'codeboard-info'
            });
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: '',
                image: '/images/start_here_64.png',
                class_name: 'codeboard-info',
                sticky: true,
                // (string | mandatory) the text inside the notification
                text: '<strong>Master of hands</strong> Show <kbd><kbd>Run</kbd></kbd>, when you choose <em>php</em> or <em>javascript</em>.',
            });
        },

        showHelp: function(){
            // alert(123);
            // var router = new Router();
            // router.navigate('help');
            this.resetChildViews(['helppage']);
            this.addChildView('helppage').render();
      
        },

        showTools: function(){
            // var router = new Router();
            // router.navigate('tool');
            this.resetChildViews(['toolpage']);
            this.addChildView('toolpage').render();

        },

        showAbout: function(){
            // var router = new Router();
            // router.navigate('about');
            this.resetChildViews(['aboutpage']);
            this.addChildView('aboutpage').render();

        },
    });

    return contentView;
});