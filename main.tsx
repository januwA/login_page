import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
            if (values.username && values.password) {
                // 生成一个随机的登录token并存储到本地缓存
                const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
                localStorage.setItem('login_token', token);
                window.location.href = "/";
                return;
            }
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
                            data-testid="login-btn"
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

const LOGIN_PATH = "/login";

// 在路由加载前检查
const loginLoader = () => {
    const token = localStorage.getItem('login_token');
    if (token) {
        throw new Response("", {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    }
    return null;
};

export const Settings = {
    load: () => {
        console.log('login Settings被读取了');
        localStorage.setItem("LOGIN_PATH", LOGIN_PATH);
        const token = localStorage.getItem('login_token');
        if (token && window.location.pathname === '/login') {
            window.location.href = "/";
        }
    },
    menu_items: null,
    route: {
        path: LOGIN_PATH,
        loader: loginLoader,
        children: [
            {
                index: true,
                element: <Main />
            }
        ]
    }
};
