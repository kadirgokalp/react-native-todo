import React from "react"
import { CheckBox } from "@rneui/themed"

const TodoCheckBox = ({ title, isChecked, onPress }) => {
	return (
		<CheckBox
			title={title}
			checked={isChecked}
			onPress={onPress}
			textStyle={{ color: "#ffffff" }}
			checkedColor="#ffffff"
			uncheckedColor="#ffffff"
			center
			containerStyle={{
				backgroundColor: "#1ca96a",
				marginLeft: 1,
				width: 112,
			}}
		/>
	)
}

export default TodoCheckBox
