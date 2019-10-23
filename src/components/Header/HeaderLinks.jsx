/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps, AccountCircleRounded } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx"; 

async function signOUT() {
  fetch('http://localhost:3005/auth/signout', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(() => {
      localStorage.removeItem("user");
      this.props.history.push('/landing-page');
    })
    .catch(console.log)
}

async function routeChange() {
  let path = '/signin-page';
  this.props.history.push(path);  
}

function HeaderLinks({ ...props }) {
  const { classes } = props;
  const currentUser = localStorage.getItem("user");
  
  if (currentUser){
    let obj = JSON.parse(currentUser);
    console.log(obj)
      return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Blogs"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/GraphicDesign-blogs" className={classes.dropdownLink}>
                Graphic Design
              </Link>,
              <a
                href=""
                target="_blank"
                className={classes.dropdownLink}
              >
                UI/UX Design
              </a>
            ]}
          />
        </ListItem>
        <ListItem className={classes.listItem}>
             
        <CustomDropdown
            noLiPadding
            buttonText={obj.firstName}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircleRounded} 
            dropdownList={[
              <Link to="/profile-page" className={classes.dropdownLink}>
                See Profile
              </Link>,
              <form>
              <Button
            onClick={() => { signOUT() }}
            color="transparent"
            target="_blank"
            className={classes.navLink}
               >
                Log Out
              </Button>
              </form>
            ]}
          />
        </ListItem>
      </List>
    );
  } 
  else {

  
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Blogs"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Graphic Design
            </Link>,
            <a
              href=""
              target="_blank"
              className={classes.dropdownLink}
            >
              UI/UX Design
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          onClick={() => { routeChange() }}
          color="transparent"
          target="_blank"
          className={classes.navLink} >Sign IN
        </Button>

      </ListItem>
    </List>
  );
        }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
