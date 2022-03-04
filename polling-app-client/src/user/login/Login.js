import {Button, Form, Input, notification} from "antd";
import {Component} from "react";
import {ACCESS_TOKEN} from "../../constants";
import {login} from "../../util/APIUtils";
import Icon from "@ant-design/icons";
import {Link} from "react-router-dom";

const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginFrom = LoginForm;
        return (
            <div className="login-container">
                <h1 className="page-title">登录</h1>
                <div className="login-content">
                    <AntWrappedLoginFrom onLogin={this.props.onLogin}/>
                </div>
            </div>
        )
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                if (error.status === 401) {
                    notification.error({
                        message: '投票APP',
                        description: '你的用户名和密码不对，请重试'
                    });
                } else {
                    notification.error({
                        message: '投票APP',
                        description: error.message || '出了些问题，请重试'
                    });
                }
            });
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{required: true, message: '请输入用户名或者邮箱'}],
                    })(
                        <Input prefix={<Icon type="user"/>} size="large" name="usernameOrEmail"
                               placeholder="Username or Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}],
                    })(
                        <Input prefix={<Icon type="lock"/>} size="large" name="password" type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">登录</Button>
                    Or<Link to="/signup">现在注册！</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;