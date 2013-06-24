define([
    'router/dispatcherEvent',
    'collections/accessory/DateButtonCollection',
    'models/accessory/DateButtonModel',
    'views/accessory/DateButtonView',
], function(dispatcher, DateButtonCollection, DateButtonModel, DateButtonView){
    
    // helper function
    function generateDateButtonCollection(config){

        var dateButtonArray = [];
        
        for(var i = config.beginYear; i <= config.endYear; i++){
            var current = false;
            if(i === config.currentYear){
                current = true;
            }
            dateButtonArray.push(new DateButtonModel({year: i, current: current}));
            for(var y = 1; y <= 12; y++){
                var status = true;
                current = false;
                // check
                if((i === config.beginYear && y < config.beginMonth) || 
                        (i === config.endYear && y > config.endMonth)){
                    status = false;
                }

                if(i === config.currentYear && y === config.currentMonth){
                    current = true;
                }else if(i === config.beginYear && i !== config.currentYear && y === config.beginMonth){
                    // if it's the first year, and currentYear is not the first year, 
                    // and the month is beginMonth
                    current = true;
                }else if(i !== config.beginYear && i !== config.currentYear && y === 1){
                    // if it's the year, not the current year
                    current = true;
                }
                dateButtonArray.push(new DateButtonModel({year: i,month: y,status: status,current:current}));
            }
        }
        return new DateButtonCollection(dateButtonArray);
    }



	var dateButtonListView = Backbone.View.extend({
		
        // el: '#all_date_buttons',
        config: {},

        id: 'all_date_buttons',
        
        initialize: function(){
            // register click event for updating all collections
            _.bindAll(this, 'renderMonthsButton');
            this.listenTo(dispatcher, 'datebuttoncollection:update', function(model){
                if('' === model.get('month')){
                    // if the clicked button is year button
                    // render all month buttons
                    this.config.currentYear = model.get('year');
                    this.renderMonthsButton();                    
                }else{
                    // if the clicked button is month button
                    this.config.currentMonth = model.get('month');
                }
            });


            // get data from html hidden tag
            var beginDate = new Date($('#beginDate').val() + '-01');
            var endDate = new Date($('#endDate').val() + '-01');
            
            var beginMonth = beginDate.getMonth() + 2;
            var endMonth = endDate.getMonth() + 2;
            
            // init the data
            this.config.beginMonth = beginMonth;
            this.config.endMonth = endMonth;
            this.config.beginYear = beginDate.getFullYear();
            this.config.endYear = endDate.getFullYear();

            if(!_.isUndefined(this.options.month)){
                this.config.currentMonth = parseInt(this.options.month);
                this.config.currentYear = parseInt(this.options.year);
            }else{
                this.config.currentMonth = endMonth;
                this.config.currentYear = this.config.endYear;
            }
            
            
            
            // // make one verify
            // if(this.options.year === this.config.beginYear && this.options.month <= this.config.beginMonth){
            //     this.config.currentMonth = this.config.beginMonth;
            // }
            this.collection = generateDateButtonCollection(this.config);

            this.render();
        },

        render: function(){
            // render self
            this.$el.append('<div id="all_year_buttons"></div><div id="all_month_buttons"></div>');
            this.renderYearsButton();
            this.renderMonthsButton();

            return this;
        },

        renderYearsButton: function(){
            this.$('#all_year_buttons').empty();
            var that = this;
            // add years button
            var yearButtonModels = this.collection.getAllYearButtons();
            _.each(yearButtonModels, function(buttonModel){
                // create new button view
                var dateButtonView = new DateButtonView({model: buttonModel});
                // alert(dateButtonView.render().html());
                that.$('#all_year_buttons').append(dateButtonView.$el);
            // console.log(dateButtonView.render());
            });

            return this;
        },

        renderMonthsButton: function(){
            this.$('#all_month_buttons').empty();
            var that = this;
            //add month button
            // var currentYear = this.collection.findWhere({month:'',current:true}).get('year');
            var monthButtonModels = this.collection.getMonthsButtonsOfYear(this.config.currentYear);
            _.each(monthButtonModels, function(buttonModel){
                // create new button view
                var dateButtonView = new DateButtonView({model: buttonModel});
                that.$('#all_month_buttons').append(dateButtonView.$el);
            });

            return this;
        },
	});

	return dateButtonListView;
});