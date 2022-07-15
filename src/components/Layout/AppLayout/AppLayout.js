import {
    AppstoreOutlined,
    SettingOutlined, UserOutlined
} from '@ant-design/icons';
import { Image, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import hustLogo from '~/assets/images/header/hust-logo.jpeg';
import hustLogoNgang from '~/assets/images/header/logo-hust-ngang.jpg';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SIDER_COLLAPSE } from '~/app-configs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppHeader from '~/components/Layout/components/Header';
import './AppLayout.sass';

const { Sider, Content } = Layout;

export function getNavItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const sliderItems = [
    getNavItem('Tài khoản', 'account', <UserOutlined />, [
        getNavItem('Danh sách tài khoản', '/accounts/list'),
        getNavItem('Thêm tài khoản', '/accounts/add'),
    ]),
    getNavItem('Cấu hình chứng chỉ', '/config/select-ceft', <AppstoreOutlined />, null),
    getNavItem('Cấu hình hợp đồng', '/config/blockchain', <SettingOutlined />, null),
];

function AppLayout({ children, match }) {
    const [collapsed, setCollapsed] = useState(localStorage.getItem(SIDER_COLLAPSE) ?? false);
    const history = useHistory();
    const currentRouter = useSelector((state) => state.router.location);
    const [selectedSider, setSelectedSider] = useState(getSelectedNav());

    function toggleSider() {
        setCollapsed(!collapsed);
        localStorage.setItem(SIDER_COLLAPSE, !collapsed);
    }

    const onClickSliderMenu = (item) => {
        history.push(item.key);
    };

    function getSelectedNav() {
        if (currentRouter?.pathname.includes('/config/sign-ceft/')) {
            return '/config/select-ceft';
        }
        return currentRouter?.pathname;
    }

    useEffect(() => {
        console.log('selectedSider: ', selectedSider);
    }, [selectedSider]);

    return (
        <Layout>
            <Sider
                style={{
                    border: 'none',
                    minHeight: '100vh',
                }}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <Link
                        to={'/'}
                        style={{ display: 'block', padding: '8px', marginBottom: '6px' }}
                    >
                        <Image
                            className="icon-home-page"
                            width="100%"
                            style={{
                                objectFit: 'contain',
                                maxHeight: '70px',
                            }}
                            src={collapsed ? hustLogo : hustLogoNgang}
                            preview={false}
                        />
                    </Link>
                    <div style={{ marginTop: '10px', flex: '1' }}>
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultOpenKeys={['account']}
                            selectedKeys={[selectedSider]}
                            items={sliderItems}
                            onClick={onClickSliderMenu}
                        />
                    </div>
                    <div
                        style={{
                            color: '#fff',
                            textAlign: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        © BKLab {new Date().getFullYear()}
                    </div>
                </div>
            </Sider>
            <Layout>
                <AppHeader />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        position: 'relative',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AppLayout;
