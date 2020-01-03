import React from 'react'
import PropTypes from 'prop-types'
import ScreenShot from '../../component/screenShot/screenShot'
// import ScreenShot from 'react-screen-shot'
import styles from './index.less'

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
        <ScreenShot onChange={this.screenShotChangeHandler}  />
      </div>
      <div className={styles.imgWrap}>
        {
          this.state.imgSrcList && this.state.imgSrcList.map((n, i) => {
            return <img key={i} src={n} width={200} />
          })
        }
      </div>
      {
        Array(100).fill('').map((n, i) => <h1 key={i}>{i}</h1>)
      }
    </div>)
  }
}

Demo.propTypes = {}

export default Demo
