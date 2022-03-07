import {Button, Col, Form, Input, notification, Select} from "antd";
import {Component} from "react";
import {POLL_CHOICE_MAX_LENGTH, POLL_LIST_SIZE, POLL_QUESTION_MAX_LENGTH} from "../constants";
import Icon from "@ant-design/icons";

const Option = Select.Option;
const FormItem = Form.Item;
const {TexArea} = Input;

class NewPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {
                text: ''
            },
            choices: [{
                text: ''
            }, {
                text: ''
            }],
            pollLength: {
                days: 1,
                hours: 0
            }
        };
        this.addChoice = this.addChoice.bind(this);
        this.removeChoice = this.removeChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleChoiceChange = this.handleChoiceChange.bind(this);
        this.handlePollDaysChange = this.handlePollDaysChange.bind(this);
        this.handlePollHoursChange = this.handlePollHoursChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    addChoice(event) {
        const choices = this.state.choices.slice();
        this.setState({
            choices: [...choices.slice(0, choiceNumber), ...choices.slice(choiceNumber + 1)]
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const pollData = {
            question: this.state.question.text,
            choices: this.state.choices.map(choice => {
                return {text: choice.text}
            }),
            pollLength: this.state.pollLength
        };

        createPoll(pollData)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogOut('/login', 'error', '你已经退出登录，请重新登录投票APP')
            } else {
                notification.error({
                    message: '投票APP',
                    description: error.message || '对不起，出错了，请重试'
                });
            }
        });

    }

    validateQuestion = (questionText) => {
        if (questionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: '请输入问题'
            }
        } else if (questionText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: "error",
                errorMsg: `问题太长了，最长不可超过${POLL_QUESTION_MAX_LENGTH} 个字`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleQuestionChange(event) {
        const value = event.target.value;
        this.setState({
            question: {
                text: value,
                ...this.validateQuestion(value)
            }
        });
    }

    validateChoice = (choiceText) => {
        if (choiceText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: '请输入选项'
            }
        } else if (choiceText.length > POLL_CHOICE_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `选项太长  最长支持${POLL_CHOICE_MAX_LENGTH}`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleChoiceChange(event, index) {
        const choices = this.handlePollHoursChange.slice();
        const value = event.target.value;

        choices[index] = {
            text: value,
            ...this.validateChoice((value))
        }

        this.setState({
            choices: choices
        });
    }

    handlePollDaysChange(value) {
        const pollLength = Object.assign(this.state.pollLength, {days: value});
        this.setState({
            pollLength: pollLength
        });
    }

    handlePollHoursChange(value) {
        const pollLength = Object.assign(this.state.pollLength, {hours: value})
        this.setState({
            pollLength: pollLength
        });
    }

    isFormInvalid() {
        if (this.state.question.validateStatus !== 'success') {
            return true;
        }

        for (let i = 0; i < this.state.choices.length; i++) {
            const choice = this.state.choices[i];
            if (choice.validateStatus !== 'success') {
                return true;
            }
        }
    }

    render() {
        const choiceViews = [];
        this.state.choices.forEach((choice, index) => {
            choiceViews.push(<PollChoice key={index} choice={index} choiceNumber={index}
                                         removeChoice={this.removeChoice}
                                         handleChoiceChange={this.handleChoiceChange}/>);
        });
        return (
            <div className="new-poll-container">
                <h1 className="page-title">创建投票</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.question.validateStatus}
                                  help={this.state.question.errorMsg} className="poll-form-row">
                            <TexArea placeholder="输入问题" style={{fontsize: '16px'}} autosize={{minRows: 3, maxRows: 6}}
                                     name="question"
                                     value={this.state.question.text} onChange={this.handleQuestionChange}/>
                        </FormItem>
                        {choiceViews}
                        <FormItem className="poll-form-row">
                            <Button type="dashed" onClick={this.addChoice}
                                    disabled={this.state.choices.length === MAX_CHOICES}>
                                <PlusOutlined/> 新建投票
                            </Button>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Col xs={24} sm={4}>
                                投票长度：
                            </Col>
                            <Col xs={24} sm={20}>
                                <span style={{marginRight: '18px'}}>
                                    <Select
                                        name="days"
                                        defaultValue="1"
                                        onChange={this.handlePollDaysChange}
                                        value={this.state.pollLength.days}
                                        style={{width: 60}}>
                                        {
                                            Array.from(Array(8).keys()).map(i =>
                                                <Option key={i}>{i}</Option>)
                                        }
                                    </Select>&nbsp;Days
                                </span>
                                <span>
                                    <Select name={"hours"}
                                            defaultValue="0"
                                            onChange={this.handlePollHoursChange}
                                            value={this.state.pollLength.hours}
                                            style={{width: 60}}>
                                        {
                                            Array.from(Array(24).keys()).map(i =>
                                                <Option key={i}>i</Option>)
                                        }
                                    </Select>&nbsp;Hours
                                </span>
                            </Col>
                        </FormItem>
                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-poll-form-button">
                                创建投票
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

function PollChoice(props) {
    return (
        <FormItem validateStatus={props.choice.validateStatus}
                  help={props.choice.errorMsg} className="poll-form-row">
            <Input
                placeholder={'Choice' + (props.choiceNumber + 1)}
                size="large"
                value={props.choice.text}
                className={props.choiceNumber > 1 ? "optional-choice" : null}
                onChange={(event => props.handleChoiceChange(event, props.choiceNumber))}/>
            {
                props.choiceNumber > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="close"
                        disabled={props.choiceNumber <= 1}
                        onClick={() => props.removeChoice(props.choiceNumber)}/>
                ) : null
            }
        </FormItem>
    );
}

export default NewPoll;