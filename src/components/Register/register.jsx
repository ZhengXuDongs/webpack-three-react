import React from 'react';
import axios from 'axios';
import css from './register.less';
import {
	Form,
	Input,
	Icon,
	Button,
	message,
	Checkbox,
	Cascader,
	Radio
} from 'antd';

import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const residences = [{
  value: '1',
  label: 'Zhejiang',
  children: [{
    value: '11',
    label: 'Hangzhou',
    children: [{
      value: '111',
      label: 'West Lake',
    }],
  }],
}, {
  value: '2',
  label: 'Jiangsu',
  children: [{
    value: '21',
    label: 'Nanjing',
    children: [{
      value: '221',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class Register extends React.Component {
	/*static propTypes = {
		intl : intlShape.isRequired
	}*/
	constructor(props){
		super(props);
		this.state = {
			confirmDirty:false,
			usertype:1,
			getaddress:[],
		};
		this.handleRadio = this.handleRadio.bind(this);
		this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.checkConfirm = this.checkConfirm.bind(this);
		this.checkPhone = this.checkPhone.bind(this);
		this.checkPassword = this.checkPassword.bind(this);
		this.RegPhone = this.RegPhone.bind(this);
	}

	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        let param = values;
	        param.condition = param.condition ? 1 : 0;
	        param.usertype = this.state.usertype;
	        param.contactaddress = JSON.stringify(param.contactaddress);
	        console.log(param)
	        axios.post('user/api/register',param).then(res=>{
	        	console.log(res.data);
	        })
	      }
	    });
  	}
  	componentWillMount() {
  		/*axios.get('user/api/getaddress').then(res=>{
  			this.setState({
  				getaddress:res.data.result,
  			})
  		})*/
  		this.setState({
  			getaddress:residences,
  		})
  	}

	onChange(e){
		console.log(`checked = ${e.target.checked}`);
	}

	handleRadio(e){
		console.log(`radio checked:${e.target.value}`);
		this.setState({
			usertype:e.target.value,
		})
	}

	checkConfirm(rule,value,callback){
		const form = this.props.form;
		if(value && this.state.confirmDirty) {
			form.validateFields(['confpassword'],{force:true});
		}
		callback();
		
	}

	checkPassword(rule,value,callback){
		const form = this.props.form;
		if(value && value !== form.getFieldValue('password')){
			callback('两次密码输入不同');
		}else{
			callback();
		}
	}

	handleConfirmBlur(e){
		const value = e.target.value;
		this.setState({
			confirmDirty:this.state.confirmDirty || !!value
		});
	}

	RegPhone(value){
		const reg = /^1[3|5][0-9]\d{8}$/;
		if(reg.test(value)){
			return true;
		}else{
			return false;
		}
	}

	checkPhone(rule,value,callback){
		const form = this.props.form;
		if(value && !this.RegPhone(value)){
			callback('不是完整的11位手机号或者正确的手机号前七位');
		}else{
			callback();
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol:{
				span:8
			},
			wrapperCol:{
				span:8
			}
		};
		const tailFormItemLayout = {
			wrapperCol:{
				span:10,
				offset:8
			}
		};

		return (
			<div className={css.register_wrap}>
				<Form onSubmit={this.handleSubmit} style={{}} className={css.register_content}>
					<FormItem {...formItemLayout}
						label="用户类型"
					>
					{getFieldDecorator('usertype',{
						
					})(
						<div><RadioGroup onChange={this.handleRadio} defaultValue={this.state.usertype}>
							<RadioButton value={1}>个人用户</RadioButton>
        					<RadioButton value={2}>企业用户</RadioButton>
						</RadioGroup></div>
					)}
					</FormItem>
					<FormItem {...formItemLayout}
						label="用户名"
					>
					{getFieldDecorator('username',{
						rules:[{
							required:true,message:'请输入用户名！'
						}]
					})(
						<input className={css.form_input}/>
					)}
					</FormItem>
					<FormItem {...formItemLayout}
						label="手机"
					>
					{getFieldDecorator('mobile',{
						rules:[{
							required:true,message:'请输入手机号！'
						},{
							validator:this.checkPhone
						}]
					})(
						<input className={css.form_input}/>
					)}
					</FormItem>
					<FormItem {...formItemLayout}
						label="邮箱"
					>
					{getFieldDecorator('email',{
						rules:[{
							required:true,message:'请输入邮箱！'
						},{
							type:'email',message:'邮箱格式不对'
						}]
					})(
						<input className={css.form_input}/>
					)}
					</FormItem>
					<FormItem {...formItemLayout}
						label="联系地址"
					>
					{getFieldDecorator('contactaddress',{
						rules:[{required:true,message:'请输入联系地址！'}]
					})(
						<Cascader options={this.state.getaddress} style={{width:"400px"}}/>
					)}
					</FormItem>
					<FormItem {...formItemLayout}
						label="密码"
						hasFeedback
					>
					{getFieldDecorator('password',{
						rules:[{
							required:true,message:'请输入密码！'
						},{
							validator:this.checkConfirm,
						}]
					})(
						<input type="password" className={css.form_input}/>
					)}
					</FormItem>
					<FormItem {...formItemLayout}
						label="确认密码"
						hasFeedback
					>
					{getFieldDecorator('confpassword',{
						rules:[{
							required:true,message:'请再次输入密码！',
						},{
							validator:this.checkPassword
						}]
					})(
						<input type="password" onBlur={this.handleConfirmBlur} className={css.form_input}/>
					)}
					</FormItem>
					<FormItem {...tailFormItemLayout}
					>
					{getFieldDecorator('condition',{
						valuePropName:'checked',
						initialValue:true,
					})(
						<Checkbox onChange={this.onChange}>愿意接受条件</Checkbox>
					)}
					</FormItem>
					<FormItem {...tailFormItemLayout}>
			          <Button type="primary" style={{width:"400px"}} htmlType="submit">注册</Button>
			        </FormItem>
				</Form>
			</div>
		)



	}






}
Register = Form.create()(Register);
export default Register;