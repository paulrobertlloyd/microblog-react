import * as React from 'react';
import { observer } from 'mobx-react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import MicroBlogApi, { API_ERROR } from './../../api/MicroBlogApi';
import App from './../../stores/App';
import Hyperlink from 'react-native-hyperlink'

@observer
export default class ProfileHeader extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      profile: null,
      more_expanded: false
    }
  }
  
  componentDidMount = async () => {
    const profile = await MicroBlogApi.get_profile(this.props.username)
    if(profile && profile !== API_ERROR){
      this.setState({
        loading: false,
        profile: profile
      })
    }
    else if(profile === API_ERROR){
      this.setState({ loading: false })
    }
  }
  
  _render_profile = () => {
    const { profile } = this.state;
    const long_bio = profile._microblog.bio ? profile._microblog.bio.trim().replace(/\n/g, " ") : null
    const short_bio = long_bio ? long_bio.slice(0, 108) : null
    return(
      <View style={{ padding: 8, backgroundColor: "#E5E7EB", width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: profile.author.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 2 }}>{profile.author.name}</Text>
            <Text style={{ fontWeight: '300' }}>@{profile._microblog.username}</Text>
            {
              profile.author.url != null ?
              <TouchableOpacity style={{ marginTop: 2 }} onPress={() => App.open_url(profile.author.url)}>
                <Text style={{ color: "#f80", fontWeight: '600' }}>{profile.author.url.replace("https://", "").replace("http://", "")}</Text>
              </TouchableOpacity>
              : null
            }
          </View>
        </View>
        {
          profile._microblog.bio && this.state.more_expanded ?
          <Hyperlink linkDefault={ true } linkStyle={{ textDecorationLine: 'underline' }}>
            <Text>{profile._microblog.bio}</Text>
          </Hyperlink>
          :
          profile._microblog.bio && !this.state.more_expanded ?
          <Text>{short_bio}{ long_bio.length > short_bio.length ? "..." : "" }</Text>
          : null
        }
      </View>
    )
  }
  
  render() {
    const { loading, profile } = this.state
    if(loading){
      return(
        <View style={{ backgroundColor: "#E5E7EB", padding: 8, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ActivityIndicator color="#f80" />
        </View>
      )
    }
    if(!loading && profile != null){
      return this._render_profile()
    }
    return(
      <View style={{ padding: 8, backgroundColor: "#E5E7EB", width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occured loading the user profile.</Text>
      </View>
    )
  }
  
}