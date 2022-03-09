import React, {Component} from "react";
import {checkEmailAvailability, checkUsernameAvailability, signup} from "../../util/APIUtils";
import {Button, Form, Input, notification} from "antd";
import {Link} from "react-router-dom";
import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, PASSWWORD_MAX_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../../constants";

const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.hanleInputChange = this.hanleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        signup(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Polling App',
                    description: "谢谢，您已成功注册，请继续登录"
                });
                this.props.history.push("/login");
            }).catch(error => {
            notification.error({
                message: "Polling App",
                description: error.message || '对不起，出了某些问题，请稍后重试!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">登录</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Full Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="全称"
                                value={this.state.name.value}
                                onChange={(event => this.handleInputChange(event, this.validateName))}/>
                        </FormItem>
                        <Form.Item label="用户名"
                                   hasFeedBack
                                   validateStatus={this.state.username.validateStatus}
                                   help={this.state.username.errorMsg}>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="唯一名称"
                                value={this.state.username.value}
                                obBlur={this.validateUsernameAvailability}
                                onChange={(event => this.handleInputChange(event, this.validateUsername))}/>
                        </Form.Item>
                        <FormItem
                            label="邮箱"
                            hasFeedBack
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="你的邮箱"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event => this.handleInputChange(event, this.validateEmail))}/>
                        </FormItem>
                        <FormItem
                            label="密码"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="你觉得密码应该由什么组成就由什么组成"
                                value={this.state.password.value}
                                onChange={(event => this.handleInputChange(event, this.validatePassword))}/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>登录</Button>
                            你TMD已经有账号了?<Link to="/login">赶紧登录</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

//validation Functions

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `你名字太短了小老弟 至少要${NAME_MIN_LENGTH}这么长`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `你名字起那么长是不是想搞数据库攻击，抱歉，我加了验证,最长${NAME_MAX_LENGTH}`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email地址为空'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: '你的Email地址格式怕不是其他星球的，此处无法识别'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email地址太长请修改，不支持长度超过${EMAIL_MAX_LENGTH}的地址`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `用户名太短请修改,用户名起码要${USERNAME_MIN_LENGTH}这么长`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `用户名太长，不允许超过${USERNAME_MAX_LENGTH},请您修改`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        //First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validation',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValidation)
            .then(response => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validationStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: '用户名已存在'
                        }
                    });
                }
            }).catch(error => {
            //Making validateStatus as success ,Form will be rechecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        //First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: '邮箱已存在'
                        }
                    });
                }
            }).catch(error => {
            //Marking validateStatus as success, From will be rechecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `密码太短需要最少${PASSWORD_MIN_LENGTH}`
            }
        } else if (password.length > PASSWWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `密码太长，不得超过${PASSWWORD_MAX_LENGTH}`,
            };
        }
    }


}

export default Signup;

