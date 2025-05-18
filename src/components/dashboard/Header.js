import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { logout } from "../../redux/actions/auth.actions";
import johndoe from "../../assets/images/doe.jpg";
import { Power } from "react-feather";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="user-profile-menu header bg-white">
      <div className="user-info">
        <span className="user-name">John Doe</span>
        <span className="user-status">Available</span>
      </div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle tag="div" className="profile-toggle">
          <div className="avatar-wrapper">
            <img src={johndoe} alt="avatar" className="avatar" />
            <span className="status-dot"></span>
          </div>
        </DropdownToggle>
        <DropdownMenu className="custom-dropdown">
          <DropdownItem onClick={handleLogout} className="logout-item">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
