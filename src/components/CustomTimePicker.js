import React from "react";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function CustomTimePicker({
    time,
    onClose
}) {
    let newTime = new Date(moment().set({minutes: time[1].replace("AM","").replace("PM",""), hours: time[0]}).toLocaleString())
    return <DateTimePickerModal
        isVisible={true}
        mode="time"
        headerTextIOS={"Pick a Time"}
        date={newTime}
        onConfirm={(value) => {
            let selectedTime = moment(value).format("HH:mm").split(":");
            onClose(selectedTime);
        }}
        onCancel={() => {
            onClose();
        }}
    />;
}

export default CustomTimePicker;