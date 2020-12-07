import { FlatList, RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { Provider } from './index'


interface IProviderContainerProps {
  selected: boolean
}
interface IProviderNameProps {
  selected: boolean
}
interface IHourProps {
  available: boolean;
  selected: boolean;
}
interface IHourTextProps {
  selected: boolean;
}

export const Container = styled.View`
flex: 1;
`
export const Header = styled.View`
padding: 24px;
padding-top: 28px;
background-color: #28262e;
flex-direction: row;
justify-content: space-between;
align-items: center;

`
export const HeaderTitle = styled.Text`
color: #f4ede8;
font-size: 20px;
/* font-family: 'RobotoSlab-Regular' */
margin-left: 16px;
`

export const ProfileButton = styled.TouchableOpacity`
margin-left: auto;
`
export const UserAvatar = styled.Image`
width: 56px;
height: 56px;
border-radius: 28px;

`
export const BackButton = styled.TouchableOpacity`
`

export const ProvidersListContainer = styled.View`
height: 122px;
`
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
 padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton) <IProviderContainerProps>`
background:${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
flex-direction: row;
align-items: center;
padding: 8px 12px;
margin-right: 16px;

border-radius: 10px;

`

export const ProviderName = styled.Text<IProviderNameProps>`
color:${(props) => (props.selected ? '#232129' : '#f4ede8')} ;
font-size: 16px;
/* font-family: 'RobotoSlab-Medium' */
margin-left: 8px;
`

export const ProviderAvatar = styled.Image`
width: 32px;
height: 32px;
border-radius: 16px;

`

export const Content = styled.ScrollView`

`
export const Calendar = styled.View``

export const Title = styled.Text`

/* font-family: 'RobotoSlabMedium' */
color: #f4ede8;
font-size: 24px;
margin: 0 24px 24px;
`
export const OpenDatePickerButton = styled(RectButton)`
 height: 46px;
 background-color: #ff9000;
 border-radius: 10px;
 align-items: center;
 justify-content: center;
 margin: 0 24px;
`

export const OpenDatePickerButtonText = styled.Text`

/* font-family: 'RobotoSlabMedium' */
color: #232129;
font-size: 16px;
`


export const Schedule = styled.View`
padding: 24px 0 16px;
`
export const Section = styled.View`
margin-bottom: 24px;
  `
export const SectionTitle = styled.Text`
font-size: 18px;
color: #999591;
/* font-family: 'RobotoSlabMedium' */
margin: 0 24px 12px;
    `

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``;

export const Hour = styled(RectButton) <IHourProps>`
padding: 12px;
background:${(props) => props.selected ? '#ff9000' : '#3e3b47'};
border-radius: 10px;
margin-right: 8px;

opacity: ${(props) => (props.available ? 1 : 0.3)};
`

export const HourText = styled.Text<IHourTextProps>`
color: ${(props) => props.selected ? '#232129' : '#f4ede8'};
/* font-family: 'RobotoSlabRegular'; */
font-size: 16px;
`

export const CreateAppointmentButton = styled(RectButton)`
 height: 50px;
 background-color: #ff9000;
 border-radius: 10px;
 align-items: center;
 justify-content: center;
 margin: 0 24px 24px;
`

export const CreateAppointmentButtonText = styled.Text`
/* font-family: 'RobotoSlabMedium' */
color: #232129;
font-size: 18px;
`