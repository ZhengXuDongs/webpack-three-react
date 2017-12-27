import React, {Component} from 'react';
import axios from 'axios';
import css from './login.less';
import {
	Form,
	Input,
	Icon,
	Button,
	Checkbox,
	message
} from 'antd';

import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';

const FormItem = Form.Item;

class Login extends React.Component {
	/*static propTypes(){
		intl: intlShape.isRequired
	}*/
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err,values)=>{
			if(!err){
				console.log('Received values of form: ', values);
				let param ={
					username:values.username,
					password:values.password
				};
				axios.post('user/api/login',param).then(res=>{
					if(res.data.isSucc){
						console.log(res.data);
						if(values.remember){
							sessionStorage.setItem('user',res.data.result);
						}
						this.props.history.pushState(null,'/index');
					}
				})
			}
		})
	}

	render() {
	
        const {
            getFieldDecorator
        } = this.props.form;

		return (
			<div className={css.login_wrap}>{console.log(111111111111111111111)}
			<div className={css.login}>
				<Form onSubmit={this.handleSubmit} className={css.login_form}>
					<FormItem>
						{getFieldDecorator('username',{
							rules:[{required:true,message:'请输入用户名'}]
						})(
							<Input style={{width:"300px"}} prefix={<Icon type="user" style={{fontsize:13}} />} placeholder="username" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password',{
							rules:[{required:true,message:'请输入密码'}]
						})(
							<Input style={{width:"300px"}} prefix={<Icon type="lock" style={{fontsize:13}} />} placeholder="password" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember',{
							valuePropName:'checked',
							initialValue:true
						})(
							<Checkbox>Remember me</Checkbox>
						)}
						<a style={{marginLeft: "93px"}} href="">Forget password</a>
					</FormItem>
					<FormItem>
						<Button type="primary" style={{width:"303px"}} htmlType="submit">登录</Button>
					</FormItem>
				</Form>
			</div>
			</div>
			)

	}




}
Login = Form.create()(Login);
export default Login;