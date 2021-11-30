import * as React from 'react';
import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Auth from './../../stores/Auth';
import App from './../../stores/App';
import FastImage from 'react-native-fast-image';
import { loginScreen, profileScreen } from './../../screens/';
// IMAGES
import GroupImage from './../../assets/icons/group.png';
import AddAccountImage from './../../assets/icons/add_account.png';

@observer
export default class AccountSwitcher extends React.Component{
  
  _render_current_user = () => {
    return(
			<TouchableOpacity
				onPress={() => profileScreen(Auth.selected_user.username, App.current_screen_id)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 8,
          paddingHorizontal: 16,
          backgroundColor: '#E5E7EB',
          borderRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{marginRight: 15}}>
            <FastImage
              source={{
                uri: Auth.selected_user.avatar,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          </View>
          <View>
            <Text style={{fontWeight: '600'}}>{Auth.selected_user.full_name}</Text>
            <Text style={{fontStyle: 'italic'}}>@{Auth.selected_user.username}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={GroupImage} />
        </View>
      </TouchableOpacity>
    )
  }
  
  _render_account_switcher = () => {
    return(
      <View 
        style={{ 
          padding: 8,
          paddingHorizontal: 15,
          backgroundColor: "#F9FAFB",
          width: '100%',
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5
        }}>
        {
          Auth.all_users_except_current().map((user) => {
            return(
							<TouchableOpacity
								onPress={() => Auth.select_user(user)}
                key={user.username}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between'
                }}
              >
                <View 
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{marginRight: 15}}>
                    <FastImage
                      source={{
                        uri: user.avatar,
                        priority: FastImage.priority.normal
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                  </View>
                  <View>
                    <Text style={{fontWeight: '600'}}>{user.full_name}</Text>
                    <Text style={{fontStyle: 'italic'}}>@{user.username}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
				{this._render_add_account_button()}
				{this._render_account_logout_button()}
      </View>
    )
  }
  
  _render_add_account_button = () => {
    return(
      <TouchableOpacity
        onPress={loginScreen}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          marginTop: Auth.users.length > 1 ? 10 : 0,
          borderTopWidth: Auth.users.length > 1 ? .5 : 0,
          borderColor: '#D1D5DB',
          paddingTop: Auth.users.length > 1 ? 8 : 0
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{width: 30, height: 30, marginRight: 18, marginLeft: 6}} source={AddAccountImage} />
          <Text style={{fontStyle: 'italic'}}>Add account...</Text>
        </View>
      </TouchableOpacity>
    )
	}
	
	_render_account_logout_button = () => {
    const sign_out_wording = Auth.users?.length > 1 ? "Sign out current account" : "Sign out"
		return (
			<TouchableOpacity
				onPress={() => Auth.logout_user()}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					width: '100%',
					justifyContent: 'space-between',
					borderTopWidth: .5,
					borderColor: '#D1D5DB',
					paddingTop: 8,
					paddingBottom: 5,
					marginTop: 10
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: 'center' }}>
					<Text style={{fontStyle: 'italic', color: 'red'}}>{sign_out_wording}</Text>
				</View>
			</TouchableOpacity>
    )
	}
  
  render() {
    if(Auth.selected_user != null){
      return(
        <View
          style={{
            width: '100%',
            paddingTop: 15
          }}
        >
          {this._render_current_user()}
					{this._render_account_switcher()}
        </View>
      )
		}
		return null
  }
  
}