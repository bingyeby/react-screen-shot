# react 截屏组件

## 安装
    npm install html2canvas reactScreenShot
    
## 使用
    class Demo extends React.Component {
      state = {
        imgSrcList: [],
      }
    
      screenShotChangeHandler = (data) => {
        this.setState({
          imgSrcList: data,
        })
      }
    
      render() {
        return (<div className={styles.wrap}>
          <div className={styles.btnWrap}>
            <ScreenShot onChange={this.screenShotChangeHandler} />
          </div>
          <div className={styles.imgWrap}>
            {
              this.state.imgSrcList && this.state.imgSrcList.map((n, i) => {
                return <img key={i} src={n} width={200} />
              })
            }
          </div>
        </div>)
      }
    }
    
## 示例效果

![avatar](/demo.png)


## 参数列表
    content: 待截屏的容器,默认值为body
    h2cOption: html2canvas的参数,具体参照: [配置列表](http://html2canvas.hertzen.com/configuration/)
    
    
