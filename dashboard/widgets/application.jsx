var WidgetStore = {
    _widgets : {},

    init: function(eventSource){
      var that = this;
      eventSource.onmessage = function(msg){
        console.log(msg);
        var data = JSON.parse(msg.data); 
        var cb = that._widgets[data.id];
        return cb(that.formatData(data));        
      }
    },

    formatData: function(data){
      var timestamp = new Date();
      if('updatedAt' in data){
        timestamp = new Date(data.updatedAt * 1000);
      }
      var hours = timestamp.getHours();
      var minutes = ("0" + timestamp.getMinutes()).slice(-2);
      data.updatedAt = "Last updated at "+ hours +":" + minutes;
      return data;
    },

    messageHandler: function(msg){
      var data = JSON.parse(msg.data);
      var cb = this._widgets[data.id];
      return cb(data);
    },
    
    addChangeListener: function(widgetId, callback){
        this._widgets[widgetId] = callback;
    }, 

    removeChangeListener: function(widgetId, callback){
        delete this._widgets[widgetId];
    }
    
};

var evtSrc = new EventSource("/subscribe");
WidgetStore.init(evtSrc);


var StreamUpdateMixin = {

  _onChange: function(data) { 
    // If widget defines onChange method call that one
    if(this.hasOwnProperty('onChange')){
      this.onChange(data);   
    }
    else{
      this.setState(data);   
    }
  },

  componentDidMount: function() { 

    WidgetStore.addChangeListener(this.props.widgetid, this._onChange);
  }, 

  componentWillUnmount: function() { 
    WidgetStore.removeChangeListener(this.props.widgetid, this._onChange); 
  } 
};


var Widget = React.createClass({
    propTypes : {
      widgetid: React.PropTypes.string.isRequired,
      row : React.PropTypes.number.isRequired,
      col : React.PropTypes.number.isRequired,
      className: React.PropTypes.string,
      sizex : React.PropTypes.number,
      sizey : React.PropTypes.number,
    },

    getDefaultProps : function() {
      return {
        sizex : 1,
        sizey : 1,
        className: "widget-text"
      };
    },  

    render: function() {
      return (
        <li className="gs_w" data-row={this.props.row} data-col={this.props.col} data-sizex={this.props.sizex} data-sizey={this.props.sizey}>
          <div className={'widget ' + ' ' +  (this.props.className)+' ' +(this.props.widgetid)}>
            {this.props.children}
          </div>
        </li>
      );
    }    
  });