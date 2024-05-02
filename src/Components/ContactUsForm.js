import { useState } from "react";
import { Button, Form, Input } from "antd";

function ContactUs() {
    const [formArray, setFormArray] = useState([]);

    const onFinish = (values) => {
        const keys = Object.keys(values);

        console.log('My name is ', values[keys[0]]);
        const updatedArray = { name: values[keys[0]], email: values[keys[1]], message: values[keys[2]] }
        setFormArray([...formArray, updatedArray]);
        console.log(formArray);
    }

    return (
        <div className="App">
            <header className="App-header">
                <Form

                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name",
                            },
                            { whitespace: true },
                            { min: 3 },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="type your name here"/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                            },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder="e.g: someone@example.com" />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your message",
                            },
                            { whitespace: true },
                            { min: 3 },
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea showCount maxLength={100} placeholder="type your message here" />

                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button block type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </header>
        </div>

    )
};

export default ContactUs;
