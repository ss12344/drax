var Text = React.createClass({
    propTypes : {
      widgetid: React.PropTypes.string.isRequired,
      row : React.PropTypes.number.isRequired,
      col : React.PropTypes.number.isRequired,
      sizex : React.PropTypes.number,
      sizey : React.PropTypes.number,
      icon : React.PropTypes.string,
      initialTitle : React.PropTypes.string,
      initialInfo : React.PropTypes.string,
      initialText : React.PropTypes.string,
      style : React.PropTypes.string,
    },
    getDefaultProps : function() {
      return {
        sizex : 1,
        sizey : 1,
      };
    },    
    getInitialState: function() {
      return {
        title: this.props.initialTitle,
        text: this.props.initialText,
        info: this.props.initialInfo,
        updatedAt: ""
      };
    },  
    _onChange: function(data) { 
      this.setState(data); 
    },
    componentDidMount: function() { 
      WidgetStore.addChangeListener(this.props.widgetid, this._onChange);
    }, 
    componentWillUnmount: function() { 
      WidgetStore.removeChangeListener(this.props.widgetid, this._onChange); 
    },
    render: function() {
      return (
        <li className="gs_w" data-row={this.props.row} data-col={this.props.col} data-sizex={this.props.sizex} data-sizey={this.props.sizey}>
          <div className={'widget widget-text ' + (this.props.widgetid)}>
            <h1 className="title">{this.state.title}</h1>
            <h3>{this.state.text}</h3>
            <p className="more-info">{this.state.info}</p>
            <p className="updated-at">{this.state.updatedAt}</p>
            <i className={'icon-background ' + (this.props.icon)}></i>
          </div>
        </li>        
      );
    }    
  });