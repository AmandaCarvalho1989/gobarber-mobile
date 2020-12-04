import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Profile from '../Profile';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProvidersList,
  ProviderContainer, ProviderName, ProviderInfo, ProviderMeta, ProviderMetaText, ProviderAvatar,ProvidersListTitle
} from './styles'

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {

  const { user } = useAuth()
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    // navigate('Profile')
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_ul }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => { }}>
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name='calendar' size={14} color='#ff9000' />
                <ProviderMetaText>Segunda a sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name='clock' size={14} color='#ff9000' />
                <ProviderMetaText>8h às 18h </ProviderMetaText>
              </ProviderMeta>

            </ProviderInfo>
          </ProviderContainer>
        )}
      />

    </Container>
  );
};

export default Dashboard;
