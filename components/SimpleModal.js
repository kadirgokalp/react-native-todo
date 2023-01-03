import React from "react"
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
} from "react-native"

const WIDTH = Dimensions.get("window").width
const HEIGHT_MODAL = 150

const SimpleModal = (props) => {
	// const closeModal = (bool, data) =>{
	//     props.changeModalVisible(bool)
	//     props.setData(data)

	return (
		<TouchableOpacity disabled={true} style={styles.container}>
			<View style={styles.modal}>
				<View>
					<Text></Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modal: {
		height: HEIGHT_MODAL,
		width: WIDTH - 80,
		paddingTop: 10,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "red",
	},
})

export default SimpleModal
