import React from "react";
import { connect } from "react-redux";
import { selectDirectoryMenuItems } from "../../redux/directory/directorySelector";
import "./directory.styles.scss";
import MenuItem from "../MenuItem/MenuItem";

const Directory = props => {
  
    return (
      <div className="directory-menu">
        {props.menuItems.map(menuItem => (
          <MenuItem
            key={menuItem.id}
            title={menuItem.title}
            img={menuItem.imageUrl}
            size={menuItem.size}
            linkUrl={menuItem.linkUrl}
          />
        ))}
      </div>
    );
  }


const mapStateToProps = state => ({
  menuItems: selectDirectoryMenuItems(state)
})

export default connect(mapStateToProps)(Directory);
