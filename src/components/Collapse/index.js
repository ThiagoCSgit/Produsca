import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ({ visible, children, setVisible }) {

    return (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                maxWidth: 300,

            }}>
                <View style={styles.lineStyle} />
                {
                    visible ?
                        <Icon name="down" size={16} /> :
                        <Icon name="right" size={16} />
                }
            </View>

            {visible && children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
        width: 300,

    }
});