import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, ScrollView} from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      navTab: ['Android', 'iOS', '前端'],
      currentIndex: 0,
    }
  }

  componentDidMount() {
    const { navTab } = this.state;
    this.getData(navTab[0]);
  }

  getData(value) {
    Taro.request({
      url: `http://gank.io/api/data/${value}/10/1`,
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }


  onClick = (id, index) => {
    this.setState({
      currentIndex: index
    })
  };

  handleLeft = (e) => {
    console.log(e);
  };

  handleRight = (e) => {
    console.log(e)
  };

  handleChange = (e) => {
    this.setState({
      currentIndex: e.detail.current
    });
  };

  render() {
    const { navTab, currentIndex } = this.state;
    return (
      <View className='index'>
        <ScrollView
          scrollX
          scrollWithAnimation
          onScrollToUpper={this.handleLeft}
          onScrollToLower={this.handleRight}
          lowerThreshold='20'
          upperThreshold='20'
        >
          <View className='title'>
            {navTab.map((d, i) =>
              <View className={currentIndex === i ? 'flex-item active' : 'flex-item'} key={d.id} onClick={this.onClick.bind(this, d.id, i)}>
                {d}
              </View>
            )}
          </View>
        </ScrollView>
        <Swiper
          className='content'
          vertical={false}
          circular
          indicatorDots={false}
          current={currentIndex}
          onChange={this.handleChange.bind(this)}
        >
          {
            navTab.map((d, i) => (
              <SwiperItem key={i} className='nav-item'>
                <View className={'demo-text-' + i}>
                  {i}
                </View>
              </SwiperItem>
            ))
          }
        </Swiper>
      </View>
    )
  }
}

