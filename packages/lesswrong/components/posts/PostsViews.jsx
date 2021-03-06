import { Components, replaceComponent } from 'meteor/vulcan:core';
import { registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Link } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';



const viewNames = {
  'top': 'magical scoring',
  'new': 'most recent',
  'best': 'highest karma',
  'drafts': 'my drafts',
  'pending': 'pending posts',
  'rejected': 'rejected posts',
  'scheduled': 'scheduled posts',
  'all_drafts': 'all drafts',
}

const DropdownStyle = {
  textShadow: 'inherit',
  display: 'inline-block',
  lineHeight: 'normal',
  fontSize: 'inherit',
  height: 'auto',
};

const DropdownUnderlineStyle = {
  display: 'none',
};

const DropdownIconStyle = {
  display: 'none',
};

const DropdownLabelStyle = {
  lineHeight: 'normal',
  overflow: 'inherit',
  paddingLeft: '0px',
  paddingRight: '0px',
  height: 'normal',
  color: 'inherit',
};

const DropdownListStyle = {
  paddingTop: '4px',
}

class PostsViews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: _.clone(props.router.location.query).view || "top"
    }
  }

  handleChange = (event, index, view) => {
    const { router } = this.props;
    const query = { ...router.location.query, view };
    const location = { pathname: router.location.pathname, query };
    router.replace(location);
    this.setState({ view });
  };

  render() {
    const props = this.props;
    let views = ["top", "new", "best"];
    const adminViews = ["pending", "rejected", "scheduled", "all_drafts"];

    if (Users.canDo(props.currentUser, "posts.edit.own")
    || Users.canDo(props.currentUser, "posts.edit.all")) {
      views = views.concat(["drafts"]);
    }

    if (Users.canDo(props.currentUser, "posts.edit.all")) {
      views = views.concat(adminViews);
    }

    return (
      <div className="posts-views">
        <DropDownMenu
          value={this.state.view}
          onChange={this.handleChange}
          maxHeight={150}
          style={DropdownStyle}
          underlineStyle={DropdownUnderlineStyle}
          iconStyle={DropdownIconStyle}
          labelStyle={DropdownLabelStyle}
          listStyle={DropdownListStyle}
          className="posts-views-dropdown"
        >
          {views.map(view => (
            <MenuItem value={view} key={view} primaryText={viewNames[view]} />
          ))}
          <MenuItem value={'daily'} primaryText={'day'} containerElement={<Link to={"/daily"} />}/>
        </DropDownMenu>
      </div>
  )}
}

PostsViews.propTypes = {
  currentUser: React.PropTypes.object,
  defaultView: React.PropTypes.string
};

PostsViews.defaultProps = {
  defaultView: "top"
};

PostsViews.contextTypes = {
  currentRoute: React.PropTypes.object,
  intl: intlShape
};

PostsViews.displayName = "PostsViews";

replaceComponent('PostsViews', PostsViews, withRouter);
