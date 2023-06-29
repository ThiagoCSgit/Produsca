import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ({ content }) {
  console.log('content:', content)
  return (
    <TouchableOpacity onPress={() => { }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: 300,

      }}>
        <Text>{content.title}</Text>
        {
          content.isExpanded ?
            <Icon name="right" size={16} /> :
            <Icon name="down" size={16} />
        }
      </View>

      {/* {content.isExpanded && */}
      <View>
        {/* {content.product.map(item => { */}
        {/* return ( */}
        <Text>{content.product.name}</Text>
        {/* ) */}
        {/* })} */}
      </View>
      {/* } */}
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