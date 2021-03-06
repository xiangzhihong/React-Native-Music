import React from 'react'
import {Text, View, Image, Dimensions, TouchableOpacity} from "react-native";
import Swiper from 'react-native-swiper'
import getStyle from './Style/FindViewStyle'
import Img from "../Img/Image";
import ApiUtil from '../Service/ApiUtil'
import {Icon} from "react-native-elements";
import {withNavigation} from 'react-navigation'

const winW = Dimensions.get('window').width
const winH = Dimensions.get('window').height

let Styles = {}
class FindView extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      banners: []
    }
  }

  async componentWillMount(): void {
    try{
      const result = await ApiUtil.request('getBanner', {type: '1'})
      if(result.data.code === 200){
        this.setState({
          banners: result.data.banners
        })
      }else{

      }
    }catch  {

    }

  }

  render(){
    Styles = getStyle()
    const {navigate} = this.props.navigation
    return(
      <View>

        {/*轮播图*/}
        {
          this.state.banners.length !==0 &&
          <View style={Styles.imgContainer}>
            <Swiper
              autoplay={true}
            >
              {
                this.state.banners.map((item,index)=>{
                  return(
                    <Image source={{uri: item.pic}} style={Styles.imgBox} key={index}></Image>
                  )
                })
              }
            </Swiper>
          </View>
        }

      {/* 项目列表*/}

        <View style={Styles.topContainer}>

          <TouchableOpacity style={Styles.topItem} onPress={()=>{
            navigate('SongList')
          }}>
            <Icon
              containerStyle={Styles.topIcon}
              name='calendar'
              type='antdesign'
              color='white'
            />
            <Text style={Styles.topText}>每日推荐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.topItem} onPress={()=>{
            navigate('SongSquare')
          }}>
            <Icon
              containerStyle={Styles.topIcon}
              name='music'
              type='font-awesome'
              color='white'
            />
            <Text style={Styles.topText}>歌单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.topItem} onPress={()=>{
            navigate('RankingListView')
          }}>
            <Icon
              containerStyle={Styles.topIcon}
              name='signal'
              type='font-awesome'
              color='white'
            />
            <Text style={Styles.topText}>排行榜</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.topItem} onPress={()=>{
            navigate('RadioStation')
          }}>
            <Icon
              containerStyle={Styles.topIcon}
              name='radio'
              type='entypo'
              color='white'
            />
            <Text style={Styles.topText}>电台</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.topItem} onPress={()=>{
            navigate('LiveView')
          }}>
            <Icon
              containerStyle={Styles.topIcon}
              name='radio-tower'
              type='octicon'
              color='white'
            />
            <Text style={Styles.topText}>直播</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default withNavigation(FindView)
