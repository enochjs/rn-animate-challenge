import { View, Text, Keyboard, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useEffect, useState } from 'react';

const TextInputMultiWithKeyboardView = () => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  function onKeyboardWillShow() {
    setIsScrollEnabled(false);
  }

  function onKeyboardDidShow() {
    setIsScrollEnabled(true);
  }

  useEffect(() => {
    const subKWS = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    const subKDS = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);

    return () => {
      subKWS.remove();
      subKDS.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: '#F5F6FA' }}>
      <ScrollView>
        <View className="h-[800px] justify-center items-center">
          <Text>this. is a fill</Text>
        </View>
        <View className="flex-1 flex-row  w-full text-left  justify-start relative">
          <TextInput
            multiline
            numberOfLines={4} // 设置显示的行数
            scrollEnabled={isScrollEnabled}
            className="bg-pink-400 w-full"
          />
          <View className="absolute right-2 bottom-2">
            <Text className="text-xs text-standard-4">
              {0}/{200}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TextInputMultiWithKeyboardView;
