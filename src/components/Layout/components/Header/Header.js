import { Avatar, Dropdown, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { getNavItem } from '~/components/Layout/AppLayout/AppLayout';
import { LogoutOutlined } from '@ant-design/icons';
import hustLogo from '~/assets/images/header/hust-logo.jpeg';
import { TOKEN_KEY } from '~/app-configs';
import { useSelector } from 'react-redux';

const userDropdownItems = [getNavItem('Đăng xuất', '/auth/logout', <LogoutOutlined />, null)];

const onClickUserAvatar = (item) => {
    if (item?.key == '/auth/logout') {
        handleLogout();
    }
};

function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload(false);
}

export default function (props) {
    const userDetail = useSelector((state) => state?.user?.profile);

    return (
        <Header
            style={{
                padding: '0px 20px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div className="flex-center">
                <div
                    style={{
                        position: 'relative',
                        width: '48px',
                        height: '64px',
                    }}
                >
                    <span className="b4E__text">
                        <div>B4E</div>
                        <div>B4E</div>
                    </span>
                </div>
                <span
                    style={{
                        fontWeight: 'bold',
                        fontSize: '22px',
                        marginLeft: '4px',
                        marginTop: '4px',
                        userSelect: 'none',
                    }}
                >
                    Manager
                </span>
            </div>

            <div
                style={{
                    marginRight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        marginRight: '10px',
                        fontWeight: '550',
                        userSelect: 'none',
                    }}
                >
                    {userDetail?.name}
                </div>
                <Dropdown
                    overlay={<Menu items={userDropdownItems} onClick={onClickUserAvatar} />}
                    placement="bottomRight"
                    trigger={['click']}
                    arrow={{ pointAtCenter: true }}
                >
                    <Avatar size={42} src={hustLogo} className="hover-pointer" />
                </Dropdown>
            </div>
        </Header>
    );
}
