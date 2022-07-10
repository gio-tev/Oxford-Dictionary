import { Pressable, Text } from 'react-native';

const Button = ({ children, pressable, text, onPress, icon }) => (
  <Pressable style={pressable} onPress={onPress}>
    {children && <Text style={text}>{children}</Text>}
    {icon && icon}
  </Pressable>
);

export default Button;
