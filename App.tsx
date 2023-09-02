import { View } from 'react-native';
import { TarotCards } from '@/TarotCards';

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-slate-400">
      <TarotCards />
    </View>
  );
}
