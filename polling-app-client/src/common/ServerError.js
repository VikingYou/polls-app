import  React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button} from "antd";

class ServerError extends Component {
    render() {
        return (
            <div className="server-error-title">
                <h1 className="server-error-title">
                    500
                </h1>
                <div className="server-error-desc">
                    服务器挂了，你尝试一下返回？
                </div>
                <Link to="/"><Button className="server-go-back-btn" type="primary" size="large">返回</Button> </Link>
            </div>
        )
    }
}

export default ServerError;