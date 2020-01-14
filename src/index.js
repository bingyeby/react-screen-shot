import React, {Component} from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom";

import loadable from 'react-loadable'
import styles from './index.less'
import 'antd/dist/antd.css';
import {hot} from 'react-hot-loader'

// 载入组件方式1: 同步方式
// import App from './demo-a/app'
// render(<App />, document.getElementById("root"))

/*
 * 载入组件方式2: 异步载入
 */
const Loading = (info) => {
  if (info.error) {
    return <div style={{whiteSpace: 'pre', color: 'red'}}>{info.error.stack}</div>
  }
  return 'loading...'
}

let RouterConfig = [
  {
    path: '/explanation',
    name: '说明',
    component: loadable({loader: () => import('./view/explanation/index'), loading: Loading})
  },
  {
    path: '/demo',
    name: '截屏演示',
    component: loadable({loader: () => import('./view/demo'), loading: Loading})
  },
]

let routerWrap = <div className={styles.outer}>
  <Router>
    <div className={styles.nav}>
      {
        RouterConfig.map((n, i) => {
          return <Link key={i} to={n.path}>{n.name || n.path}</Link>
        })
      }
    </div>
    <div className={styles.content}>
      <Switch>
        {
          RouterConfig.map((n, i) => {
            return <Route key={i} path={n.path} component={n.component} />
          })
        }
      </Switch>
    </div>
  </Router>
</div>

render(routerWrap, document.getElementById("root"));


// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
