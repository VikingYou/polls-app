import {Dropdown, Layout, Menu} from "antd";
import {Component} from "react";
import {Link} from "react-router-dom";
import pollIcon from '../logo.svg';
import {DownOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";

const Header = Layout.Header

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/">
                        <HomeOutlined className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/poll/new">
                    <Link to="/poll/new">
                        <img src={pollIcon} alt="poll" className="poll-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">登录</Link>
                </Menu.Item>,
                <Menu.Item key="signup">
                    <Link to="signup">注册</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Polling App</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        model="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser.name}
                </div>
                <div className="username-info">
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser.username}`}>个人信息</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item">
                登出
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={dropdownMenu}
                  trigger={['click']}
                  getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <UserOutlined className="nav-icon" style={{marginRight: 0}}/>
                <DownOutlined/>
            </a>
        </Dropdown>
    );
}

export default AppHeader;