import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import avt from "../images/av.jpg";
import "./TabBarStyle.scss";

import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import { arrIconOption } from "../data/Data";
import ModelDetailUser from "./model/ModelDetailUser";
import ModelUpdateUser from "./model/ModelUpdateUser";
import Contex from "../store/Context";
import { SetUser } from "../store/Actions";
import userApi from "../api/userApi";

import { useNavigate } from "react-router-dom";

import firebase from "../firebase";
import "firebase/compat/auth";
const TabBarComponent = () => {
  //active option
  const [activeOption, setActiveOption] = React.useState(0);
  const [openModelUser, setOpenModelUser] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const { state, depatch } = React.useContext(Contex);
  //detructering...
  const { user } = state;
  //console.log(user.uid);
  //const { first_name, last_name, avatar } = user;
  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //open model detail user info
  const handleOpenModel = (e) => {
    handleClose(e);
    setOpenModelUser(true);
  };

  const handleLogout = (e) => {
    firebase.auth().signOut();
    //delete user current
    depatch(SetUser(null));
  };

  return (
    <div className="tab-bar">
      <div className="bar_top">
        <Avatar
          alt={user?.first_name}
          className="avatar"
          src={user?.avatar}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />

        <ul className="option_icons">
          {arrIconOption.map((val, idx) => {
            return (
              <li
                key={val.id}
                className={
                  activeOption === idx ? "option_icon active" : "option_icon"
                }
                onClick={() => setActiveOption(idx)}
                title={val.name}
              >
                <span>{val.icon}</span>
              </li>
            );
          })}
        </ul>

        <ModelDetailUser
          openModelUser={openModelUser}
          setOpenModelUser={setOpenModelUser}
        />

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="left-start"
          transition
          disablePortal
          style={{ zIndex: "100" }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "left-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    className="menu_list"
                  >
                    <MenuItem
                      className="name
                    "
                    >
                      {user?.first_name + " " + user?.last_name}
                    </MenuItem>
                    <MenuItem
                      className="item"
                      onClick={(e) => handleOpenModel(e)}
                    >
                      Hồ sơ của bạn
                    </MenuItem>
                    <MenuItem className="item" onClick={handleClose}>
                      Cài đặt
                    </MenuItem>
                    <MenuItem className="item" onClick={(e) => handleLogout(e)}>
                      Đăng xuất
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className="bar_bottom">
        <ul className="option_icons">
          <li className="option_icon" title="Cài đặt">
            <SettingsIcon className="icon_setting" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabBarComponent;
