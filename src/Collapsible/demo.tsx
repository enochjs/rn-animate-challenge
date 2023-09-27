import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Collapsible from '.';
import { useState } from 'react';

export default function Demo() {
  const [expand, setExpand] = useState(false);

  return (
    <SafeAreaView>
      <View className="w-full justify-center items-center">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setExpand(!expand)}
          className=" w-48 h-10 bg-pink-400 rounded-xl justify-center items-center text-white mb-5"
        >
          <Text>toggle expand</Text>
        </TouchableOpacity>
        <Collapsible expand={expand} style={{ width: 300, backgroundColor: 'pink' }}>
          <Text>this is a test text</Text>
          <Text>this is a test text</Text>
          <Text>this is a test text</Text>

          <Text>this is a test text</Text>
          <Text>this is a test text</Text>

          <Text>this is a test text</Text>
          <Text>this is a test text</Text>

          <Text>this is a test text</Text>
          <Text>this is a test text</Text>
          <Text>this is a test text</Text>
        </Collapsible>
      </View>
      <View>
        <Text>1233</Text>
      </View>
    </SafeAreaView>
  );
}
