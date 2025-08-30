import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';
import { Main } from './main';

vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Main Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    renderWithRouter(<Main />);
    
    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入用户名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入密码')).toBeInTheDocument();
    expect(screen.getByTestId("login-btn")).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    renderWithRouter(<Main />);
    
    const loginButton = screen.getByTestId("login-btn");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('请输入用户名!')).toBeInTheDocument();
      expect(screen.getByText('请输入密码!')).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderWithRouter(<Main />);
    
    const usernameInput = screen.getByPlaceholderText('请输入用户名');
    const passwordInput = screen.getByPlaceholderText('请输入密码');
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('登录信息:', {
        username: 'testuser',
        password: 'password123'
      });
      expect(message.success).toHaveBeenCalledWith('登录成功！');
    });

    consoleSpy.mockRestore();
  });

  it('shows success message on form submission', async () => {
    renderWithRouter(<Main />);
    
    const usernameInput = screen.getByPlaceholderText('请输入用户名');
    const passwordInput = screen.getByPlaceholderText('请输入密码');
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith('登录成功！');
    });
  });

  it('has proper form structure and styling', () => {
    renderWithRouter(<Main />);
    
    const cardElement = screen.getByText('登录').closest('.ant-card');
    expect(cardElement).toBeInTheDocument();
    
    const usernameInput = screen.getByPlaceholderText('请输入用户名');
    const passwordInput = screen.getByPlaceholderText('请输入密码');
    
    expect(usernameInput).toHaveAttribute('type', 'text');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
