import * as React from 'react'
import { observer } from 'mobx-react'
import { Dimensions, View, Platform } from 'react-native'
import App from '../../stores/App'
import FastImage from 'react-native-fast-image'
import { MenuView } from '@react-native-menu/menu'
import { SvgXml } from 'react-native-svg'
import { SFSymbol } from "react-native-sfsymbols";

@observer
export default class TempUploadCell extends React.Component {

	render() {
		const { upload } = this.props
		const dimension = (Dimensions.get("screen")?.width / 4) - 10
		const actions = [
				{
					title: "Cancel upload",
					id: "cancel",
					image: Platform.select({
						ios: 'trash'
					}),
					attributes: {
						destructive: true
					}
				}
			]
		return (
			<MenuView
				style={{
					padding: 5,
					backgroundColor: App.theme_background_color_secondary()
				}}
				onPressAction={({ nativeEvent }) => {
					const event_id = nativeEvent.event
					if (event_id === "cancel") {
						upload.cancel_upload()
					}
				}}
				actions={actions}
			>
				<View
					style={{
						width: dimension,
						height: dimension,
						position: "relative"
					}}
				>
					{
						upload.is_audio() ?
							<View style={{
								width: dimension,
								height: dimension,
								borderWidth: 2,
								borderColor: App.theme_placeholder_text_color(),
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								{
									Platform.OS === 'ios' ?
										<SFSymbol
											name="waveform"
											color={App.theme_text_color()}
											size={20}
											multicolor={false}
										/>
										:
										<SvgXml
											xml={`<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M285 816V336h60v480h-60Zm165 160V176h60v800h-60ZM120 656V496h60v160h-60Zm495 160V336h60v480h-60Zm165-160V496h60v160h-60Z"/></svg>`}
											width={24}
											height={24}
											fill={App.theme_text_color()}
										/>
								}
							</View>
							:
							<FastImage
								key={upload.uri}
								source={{
									uri: upload.uri,
									priority: FastImage.priority.high
								}}
								resizeMode={FastImage.resizeMode.cover}
								style={{
									width: dimension,
									height: dimension,
									borderWidth: 2,
									borderColor: App.theme_placeholder_text_color(),
									borderRadius: 5
								}}
							/>
					}
					
					{
						upload.is_uploading &&
						<View
							style={{
								width: `${ upload.progress }%`,
								height: 5,
								backgroundColor: App.theme_accent_color(),
								position: 'absolute',
								left: 0,
								bottom: 0,
								borderBottomLeftRadius: 2,
								borderBottomRightRadius: upload.progress === 100 ? 2 : 0,
								zIndex: 2
							}}
						/>
					}
				</View>
			</MenuView>
		)
	}

}