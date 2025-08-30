import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Route } from "react-router-dom";

interface LoginForm {
    username: string;
    password: string;
}

export const Main = () => {
    const [form] = Form.useForm<LoginForm>();

    const onFinish = async (values: LoginForm) => {
        try {
            // 这里可以添加实际的登录逻辑
            console.log('登录信息:', values);
            message.success('登录成功！');
            // 可以在这里添加路由跳转逻辑
        } catch (error) {
            message.error('登录失败，请重试');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            <Card
                title="登录"
                style={{ width: 400 }}
            >
                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="请输入密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            data-testId="login-btn"
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export const Settings = {
    menu_items: null,
    route: (
        <Route path='/login'>
            <Route index element={<Main />} />
        </Route>
    )
};
