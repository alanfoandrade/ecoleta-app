import styled from 'styled-components/native';

export const Container = styled.ImageBackground.attrs({
  imageStyle: { width: 274, height: 368 },
})`
  flex: 1;
  padding: 48px 32px 32px;
  background: #f0f0f5;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #322153;
  font-size: 32px;
  font-family: 'Ubuntu-Bold';
  max-width: 260px;
  margin-top: 64px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin: 16px 0;
  font-family: 'Roboto-Regular';
  max-width: 260px;
  line-height: 24px;
`;
