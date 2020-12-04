import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
 width: 100%;
  height: 60px;
  background: #ff9800;
  border-radius: 18px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text`
  /* font-family: 'RobotoSlab-Medium'; */
  /* font-family: 'Roboto'; */
  color: #312e38;
  font-size: 18px;
`;
