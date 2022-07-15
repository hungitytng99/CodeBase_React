import { notification, Spin } from 'antd';
import { REQUEST_STATE } from '~/app-configs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '~/redux/actions/user';
import backgroundImage from '~/assets/images/login/background.jpg';
import blockChain from '~/assets/images/login/blockchain.png';
import { useForm } from 'react-hook-form';
import { getEmailValidationRegrex } from '~/helpers/validator';
import './Login.css';
import './animated.css';

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const history = useHistory();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        dispatch(LOGIN(data));
    };

    useEffect(() => {
        if (user.authState == REQUEST_STATE.SUCCESS) {
            history.push('/');
        }
        if (user?.authState === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Thất bại',
                description: 'Tài khoản hoặc mật khẩu không chính xác!',
            });
        }
    }, [user?.authState]);

    return (
        <div
            className="login flex-center animated-block__area"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                position: 'relative',
            }}
        >
            <ul className="animated-block__circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div
                className="login__box"
                style={{
                    position: 'absolute',
                    zIndex: 99,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
                    <div className="auth__header is-flex-col al-center ju-center">
                        <div className="auth__header--icon is-flex al-center ju-center ">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="LockOutlinedIcon"
                            >
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                            </svg>
                        </div>
                        <div className="auth__header--label">Đăng nhập</div>
                    </div>
                    <div className="auth__body is-flex-col">
                        <div className="auth__label required">Email</div>
                        <div className="input-effect">
                            <input
                                {...register('email', {
                                    required: true,
                                    pattern: getEmailValidationRegrex(),
                                })}
                                className="effect effect__email"
                                type="text"
                                placeholder="Nhập tài khoản email của bạn"
                                autoComplete="false"
                            />
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        {errors.email?.type === 'required' && (
                            <div className="auth__error">Trường này không được để trống</div>
                        )}
                        {errors.email?.type === 'pattern' && (
                            <div className="auth__error">Email bạn nhập không đúng định dạng</div>
                        )}
                        <div className="auth__label required">Password</div>
                        <div className="input-effect">
                            <input
                                {...register('password', { required: true })}
                                className="effect effect__pw"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                autoComplete="false"
                            />
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        {errors.password?.type === 'required' && (
                            <div className="auth__error">Trường này không được để trống</div>
                        )}
                        <button className="auth__box is-flex al-center ju-center">
                            {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Đăng nhập'}
                        </button>
                    </div>
                </form>

                <div className="auth__form --welcome">
                    <div
                        className="auth__welcome"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                marginRight: '6px',
                            }}
                        >
                            Chào mừng đến với
                        </span>
                        <div
                            style={{
                                position: 'relative',
                                width: '72px',
                                height: '45px',
                                marginTop: '1px',
                            }}
                        >
                            <span className="b4E__text">
                                <div>Super</div>
                                <div>Super</div>
                            </span>
                        </div>
                        <span
                            style={{
                                marginLeft: '6px',
                            }}
                        >
                            Base
                        </span>
                    </div>
                    <div className="auth__welcome-desc">By Trần Mạnh Hùng</div>
                    <img className="auth__welcome-blockchain" src={blockChain} alt="block-chain" />
                </div>
            </div>
        </div>
    );
};

export default Login;
