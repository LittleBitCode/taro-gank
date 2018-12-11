import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './style.less'

export default class ImageView extends Component {

  config = {
    navigationBarTitleText: '图片预览'
  }

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const { url } = this.$router.params;
    this.setState({
      url
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleLongPress = (url) => {
    Taro.downloadFile({
      url
    }).then(res => {
      console.log(res);
      let path = res.tempFilePath;
      Taro.saveImageToPhotosAlbum({
        filePath: path
      }).then(r => {
        console.log(r);
        Taro.showToast({
          title: '保存成功!'
        })
      })
    })
  };

  render () {
    const { url } = this.state;
    return (
      <View className='imageView' onLongPress={this.handleLongPress.bind(this, url)}>
        <Image src={url} />
      </View>
    )
  }
}

