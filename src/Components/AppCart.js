import { getCart } from "../Api";
import { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
    Badge,
    Button,
    Checkbox,
    DatePicker,
    Drawer,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Table,
    Typography,
} from "antd";
import { useSelector } from "react-redux";
import RegistrationForm from "./FormModal";


function AppCart() {
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const count = useSelector((state) => state.counter.value);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    
    useEffect(() => {
        getCart().then((res) => {
            setCartItems(res.products);
        });
    }, []);
    const onConfirmOrder = (values) => {
        console.log({ values });
        setCartDrawerOpen(false);
        setCheckoutDrawerOpen(false);
        message.success("Your order has been placed successfully.");
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>Sign up</Button>
            <Modal
                title="Registration Form"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                styles={{ maxHeight: 300 }}
            >
                <RegistrationForm />
            </Modal>
            <Badge
                onClick={() => {
                    setCartDrawerOpen(true);
                }}
                count={count}
                title={false}
                showZero
                className="soppingCartIcon"
            >
                <ShoppingCartOutlined />
            </Badge>
            <Drawer
                open={cartDrawerOpen}
                onClose={() => {
                    setCartDrawerOpen(false);
                }}
                title="Your Cart"
                contentWrapperStyle={{ width: 500 }}
            >
                <Table
                    pagination={false}
                    columns={[
                        {
                            title: "Title",
                            dataIndex: "title",
                        },
                        {
                            title: "Price",
                            dataIndex: "price",
                            render: (value) => {
                                return <span>${value}</span>;
                            },
                        },
                        {
                            title: "Quantity",
                            dataIndex: "quantity",
                            render: (value, record) => {
                                return (
                                    <InputNumber
                                        min={0}
                                        defaultValue={value}
                                        onChange={(value) => {
                                            setCartItems((pre) =>
                                                pre.map((cart) => {
                                                    if (record.id === cart.id) {
                                                        cart.total = cart.price * value;
                                                    }
                                                    return cart;
                                                })
                                            );
                                        }}
                                    ></InputNumber>
                                );
                            },
                        },
                        {
                            title: "Total",
                            dataIndex: "total",
                            render: (value) => {
                                return <span>${value}</span>;
                            },
                        },
                    ]}
                    dataSource={cartItems}
                    summary={(data) => {
                        const total = data.reduce((pre, current) => {
                            return pre + current.total;
                        }, 0);
                        return <span>Total: ${total}</span>;
                    }}
                />
                <Button
                    onClick={() => {
                        setCheckoutDrawerOpen(true);
                    }}
                    type="primary"
                >
                    Checkout Your Cart
                </Button>
            </Drawer>
            <Drawer
                open={checkoutDrawerOpen}
                onClose={() => {
                    setCheckoutDrawerOpen(false);
                }}
                title="Confirm Order"
            >
                <Form onFinish={onConfirmOrder}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please enter your full name",
                            },
                        ]}
                        label="Full Name"
                        name="full_name"
                    >
                        <Input placeholder="Enter your full name.." />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                        label="Email"
                        name="your_name"
                    >
                        <Input placeholder="Enter your email.." />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Please enter your address",
                            },
                        ]}
                        label="Address"
                        name="your_address"
                    >
                        <Input placeholder="Enter your full address.." />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox defaultChecked disabled>
                            Cash on Delivery
                        </Checkbox>
                    </Form.Item>
                    <Typography.Paragraph type="secondary">
                        More methods coming soon
                    </Typography.Paragraph>
                    <Button type="primary" htmlType="submit">
                        {" "}
                        Confirm Order
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
};

// function RegistrationForm() {
//     const [formArray, setFormArray] = useState([]);
//     const [fullName, setFullName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [gender, setgender] = useState("");


//     const onFinish = (values) => {
//         const keys = Object.keys(values);
//         // const newValues = {
//         //     [keys[0]]: { [keys[0]]: values[keys[0]] },
//         // };
//         console.log('My name is ', values[keys[0]]);
//         const updatedArray = {fullName: values[keys[0]]}
//         setFormArray([...formArray, updatedArray]);
//         console.log(formArray);
//     }

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Form

//                     labelCol={{ span: 10 }}
//                     wrapperCol={{ span: 14 }}
//                     onFinish={onFinish}
//                 >
//                     <Form.Item
//                         name="fullName"
//                         label="Full Name"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please enter your name",
//                             },
//                             { whitespace: true },
//                             { min: 3 },
//                         ]}
//                         hasFeedback
//                     >
//                         <Input placeholder="Type your name" />
//                     </Form.Item>

//                     <Form.Item
//                         name="email"
//                         label="Email"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please enter your email",
//                             },
//                             { type: "email", message: "Please enter a valid email" },
//                         ]}
//                         hasFeedback
//                     >
//                         <Input placeholder="Type your email" />
//                     </Form.Item>

//                     <Form.Item
//                         name="password"
//                         label="Password"
//                         rules={[
//                             {
//                                 required: true,
//                             },
//                             { min: 6 },
//                             {
//                                 validator: (_, value) =>
//                                     value && value.includes("A")
//                                         ? Promise.resolve()
//                                         : Promise.reject("Password does not match criteria."),
//                             },
//                         ]}
//                         hasFeedback
//                     >
//                         <Input.Password placeholder="Type your password" />
//                     </Form.Item>

//                     <Form.Item
//                         name="confirmPassword"
//                         label="Confirm Password"
//                         dependencies={["password"]}
//                         rules={[
//                             {
//                                 required: true,
//                             },
//                             ({ getFieldValue }) => ({
//                                 validator(_, value) {
//                                     if (!value || getFieldValue("password") === value) {
//                                         return Promise.resolve();
//                                     }
//                                     return Promise.reject(
//                                         "The two passwords that you entered does not match."
//                                     );
//                                 },
//                             }),
//                         ]}
//                         hasFeedback
//                     >
//                         <Input.Password placeholder="Confirm your password" />
//                     </Form.Item>

//                     <Form.Item name="gender" label="Gender" requiredMark="optional">
//                         <Select placeholder="Select your gender">
//                             <Select.Option value="male">Male</Select.Option>
//                             <Select.Option value="female">Female</Select.Option>
//                         </Select>
//                     </Form.Item>

//                     <Form.Item
//                         name="dob"
//                         label="Date of Birth"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please provide your date of birth",
//                             },
//                         ]}
//                         hasFeedback
//                     >
//                         <DatePicker
//                             style={{ width: "100%" }}
//                             picker="date"
//                             placeholder="Chose date of birth"
//                         />
//                     </Form.Item>

//                     <Form.Item
//                         name="agreement"
//                         wrapperCol={{ span: 24 }}
//                         valuePropName="checked"
//                         rules={[
//                             {
//                                 validator: (_, value) =>
//                                     value
//                                         ? Promise.resolve()
//                                         : Promise.reject(
//                                             "To proceed, you need to agree with our terms and conditions"
//                                         ),
//                             },
//                         ]}
//                     >
//                         <Checkbox>
//                             {" "}
//                             Agree to our <a href="#">Terms and Conditions</a>
//                         </Checkbox>
//                     </Form.Item>

//                     <Form.Item wrapperCol={{ span: 24 }}>
//                         <Button block type="primary" htmlType="submit">
//                             Register
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </header>
//         </div>

//     )
// }


export default AppCart;
