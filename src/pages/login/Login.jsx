import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './Login.less'
import logo from './images/logo.png'


class Login extends Component {

  handleSubmit=(e)=>{
    e.preventDefault()

    // const form=this.props.form
    // const formValues=form.getFieldsValue();
    // const username=form.getFieldValue('username');
    // const password=form.getFieldValue('password');

    this.props.form.validateFields((err,{username,password})=>{
      if(!err){
        alert(`发登陆的ajax请求，username=${username},password=${password}`)
      }else{
        alert('验证失败！')
      }
    })
  }

  validatePwd(rules,value,callback){
    value=value.trim()//去掉空格
    if(!value){
      callback('密码必须输入')
    }else if(value.length<4){
      callback('密码不能小于4位')
    }else if(value.length>12){
      callback('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('必须是英文、数字或下划线组成')
    }else{
      callback()//验证通过
    }
  }

  render() {
    const {getFieldDecorator}=this.props.form
    return (
      <div className='login'>
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>ReactProject：system of guxiaojiu</h1>
        </div>
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username',{
                  initialValue:'',
                  rules:[
                    {required:true,message:'用户名是必须的！'},
                    {min:4,message:'用户名不能小于4位！'},
                    {max:12,message:'用户名不能大于12位！'},
                    {pattern:/^[a-zA-Z0-9_]+$/,message:'用户明必须是英文、数字或下划线组成'}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="username"
                    size='large'
                  />
                  
                )
              }
            </Form.Item>
            <Form.Item>
            {
                getFieldDecorator('password',{
                  initialValue:'',
                  rules:[{validator:this.validatePwd}]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    size='large'
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button size='large' type="primary" htmlType="submit" className="login-form-button" style={{margin:'1rem 0'}}>Log in</Button>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="">Forgot password</a> Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapperForm=Form.create()(Login)
export default WrapperForm