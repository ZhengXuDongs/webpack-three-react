import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect, IndexLink} from 'react-router';
import css from './main.less';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

import Login from './components/Login/login';
import Register from './components/Register/register';

export default class Container extends Component{
	constructor(props){
		super(props);
	}

	render() {
        return (
            <div>
                <div className={css.menu}>
                    <div><Link className={css.menuitem} to="login">登录</Link><Link className={css.menuitem} to="register">注册</Link></div>
                </div>
                {this.props.children}
            </div>
        )
    }
}


const root = document.getElementById('app');
render((
	<Router history={hashHistory}>
		<Route path="/" component={Container}>
			<IndexRedirect to="/login"  />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
		</Route>
	</Router>					
),root);