import React from 'react'
import PropTypes from 'prop-types'
import styles from './screenShot.less'
import html2canvas from 'html2canvas'

// import html2canvas0 from './html2canvas0.4.1'

class ScreenShot extends React.Component {

  static defaultProps = {
    content: document.body,
    h2cOption: {},
  }

  state = {
    optsStyle: {
      visibility: 'hidden',
      top: 0,
      left: 0,
    },
    bgStyle: {
      visibility: 'hidden',
    },
  }

  constructor(props) {
    super(props)
    this.mouseDowning = false
    this.mouseDownState = {}
    this.clearRectPoint = null // 存储拖动位置信息
    this.imgInfoList = []
  }


  /*
  * 清空画板->回到待截图状态
  * */
  clearRect = (n) => {
    this.bgCanvas = this.refs.bgCanvas
    let canvasRect = this.bgCanvas.getBoundingClientRect()
    let ctx = this.bgCanvas.getContext('2d')
    ctx.clearRect(0, 0, canvasRect.width, canvasRect.height)
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillRect(0, 0, canvasRect.width, canvasRect.height)
  }

  /*
  * 继续截图
  * */
  html2canvasContinue = () => {
    this.setState({
        optsStyle: {
          visibility: 'hidden',
        },
      }, () => {
        this.html2canvasOpt()
      },
    )
  }

  /*
  * 截图完毕
  *   先隐藏操作按钮
  *   在隐藏页面
  *   回调
  * */
  html2canvasDone = () => {
    this.setState({
        optsStyle: {
          visibility: 'hidden',
        },
      }, () => {
        this.html2canvasOpt().then(() => {
          this.props.onChange && this.props.onChange(this.imgInfoList)
          this.setState({
            bgStyle: {
              visibility: 'hidden',
            },
          })
        })
      },
    )
  }

  /*
  * 执行截屏操作
  * */
  html2canvasOpt = () => {
    return html2canvas(this.props.content, this.props.h2cOption).then((canvas) => {
      this.imgInfoList.push(canvas.toDataURL())
      this.props.onChange && this.props.onChange(this.imgInfoList)
      this.clearRect()
      return canvas.toDataURL()
    })
  }

  /*
  * 取消此次截图
  * */
  cancel = (n) => {
    this.setState({
      bgStyle: {
        visibility: 'hidden',
      },
      optsStyle: {
        visibility: 'hidden',
      },
    })
  }

  /*
  * 开始截图
  *   清空画板并显示
  * */
  begin = (n) => {
    this.clearRect()
    this.setState({
      bgStyle: {
        visibility: '',
      },
    })
  }


  componentDidMount() {
    /*
    * 修复背景错位问题,将背景移动至body层
    *   jquery实现: $(this.refs.bgFixed).appendTo('body')
    * */
    let bodyNode = document.getElementsByTagName('body')[0]
    bodyNode.insertBefore(this.refs.bgFixed, bodyNode.childNodes[0])

    this.bgCanvas = this.refs.bgCanvas
    let canvasClientRect = this.bgCanvas.getBoundingClientRect()
    let ctx = this.bgCanvas.getContext('2d')

    this.bgCanvas.addEventListener('mousemove', (e) => {
      if (this.mouseDowning) {
        ctx.clearRect(0, 0, canvasClientRect.width, canvasClientRect.height)
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.fillRect(0, 0, canvasClientRect.width, canvasClientRect.height)
        ctx.clearRect(this.mouseDownState.clientX, this.mouseDownState.clientY, e.clientX - this.mouseDownState.clientX, e.clientY - this.mouseDownState.clientY)
        this.clearRectPoint = [
          [this.mouseDownState.clientX, e.clientX],
          [this.mouseDownState.clientY, e.clientY],
        ]
      }
    })
    this.bgCanvas.addEventListener('mousedown', (e) => {
      ctx.clearRect(0, 0, canvasClientRect.width, canvasClientRect.height)
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.fillRect(0, 0, canvasClientRect.width, canvasClientRect.height)
      this.mouseDowning = true
      this.mouseDownState = {
        clientX: e.clientX,
        clientY: e.clientY,
      }
      this.setState({
        optsStyle: {
          visibility: 'hidden',
        },
      })
    })
    this.bgCanvas.addEventListener('mouseup', (e) => {
      this.mouseDowning = false

      if (this.clearRectPoint) {
        // 截图操作方向不同,则需要考虑起始结束点的位置坐标值大小
        let clearRectPointDeal = this.clearRectPoint.map((n) => {
          return Math.max(...n)
        })
        this.setState({
          optsStyle: {
            visibility: '',
            left: clearRectPointDeal[0] - this.refs.opts.getBoundingClientRect().width,
            top: clearRectPointDeal[1],
          },
        })
        this.clearRectPoint = null // 重置位置信息
      } else {// 未进行截图拖动鼠标操作 则截屏全部
        this.setState({
          optsStyle: {
            visibility: '',
            left: this.bgCanvas.getBoundingClientRect().width / 2,
            top: this.bgCanvas.getBoundingClientRect().height / 2,
          },
        })
      }
    })

  }


  render() {
    let bodyClientRect = document.querySelector('body').getBoundingClientRect()
    return (<div className={styles.screenShotOuter} ref={'outer'}>
      <div className={styles.btnWrap} onClick={this.begin}>
        {
          this.props.btnDOM || <div className={styles.btn}>截屏</div>
        }
      </div>
      <div className={styles.bgFixed} style={this.state.bgStyle} ref={'bgFixed'}>
        <canvas
          title={'点击并拖动鼠标进行截图操作'}
          ref={'bgCanvas'}
          width={`${bodyClientRect.width}px`}
          height={`${bodyClientRect.height}px`}>
        </canvas>
        <div className={styles.opts} style={this.state.optsStyle} ref={'opts'}>
          <span className={styles.confirm} onClick={this.html2canvasContinue}>继续截图</span>
          <span className={styles.confirm} onClick={this.html2canvasDone}>完成</span>
          <span className={styles.cancel} onClick={this.cancel}>取消</span>
        </div>
      </div>
    </div>)
  }
}

ScreenShot.propTypes = {
  /*
  * 需要截屏的区域
  * */
  content: PropTypes.object,
  /*
  * html2canvas的设置
  * */
  h2cOption: PropTypes.object,
  /*
  * 触发按钮
  * */
  btnDOM: PropTypes.object,
}

export default ScreenShot
