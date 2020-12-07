import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns'
import { useAuth } from '../../hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker'

import {
  Container, Header, HeaderTitle, ProfileButton, UserAvatar, BackButton, ProvidersListContainer,
  ProvidersList, ProviderContainer, ProviderName, ProviderAvatar, Calendar, Title,
  OpenDatePickerButtonText, OpenDatePickerButton,
  Schedule,
  Section,
  SectionTitle,
  Hour,
  HourText,
  SectionContent,
  Content,
  CreateAppointmentButton,
  CreateAppointmentButtonText
} from './styles'
import api from '../../services/api';
import { Alert, Platform } from 'react-native';

interface RouteParams {
  provider_id: string
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface Availability {
  hour: number;
  available: boolean
}

const CreateAppointment: React.FC = () => {

  const { user } = useAuth()
  const route = useRoute()
  const { navigate, goBack } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.provider_id)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedHour, setSelectedHour] = useState(0)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [availability, setAvailability] = useState<Availability[]>([])


  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data)
    })
  }, [])


  useEffect(() => {
    api.get(`/providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider])


  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [goBack])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }
    if (date) {
      setSelectedDate(date)
    }
  }, [])

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, [])

  const handleCreateAppointment = useCallback(async () => {

    try {

      const date = new Date(selectedDate)
      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      })

      navigate('AppointmentCreated', { date: date.getTime() })
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao criar agendamento',
        'Ocorreu um erro ao tentar agendar um agendamento, tente novamente')
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider])

  const morningAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour < 12)
      .map(({ available, hour }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour >= 12)
      .map(({ available, hour }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name='chevron-left' color='#999591' size={24} />
        </BackButton>
        <HeaderTitle>
          Cabeleireiros
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <Content>

        <ProvidersListContainer>

          <ProvidersList
            data={providers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer selected={provider.id === selectedProvider}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }}></ProviderAvatar>
                <ProviderName selected={provider.id === selectedProvider}> {provider.name}</ProviderName>
              </ProviderContainer>
            )}
          >

          </ProvidersList>
        </ProvidersListContainer>

        <Calendar>

          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker &&
            <DateTimePicker
              value={selectedDate}
              mode='date'
              display='calendar'
              textColor="#f4ede8"
              onChange={handleDateChanged}
            // style={{ color: "#f4ede8" }}
            />
          }
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>
          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, available, hour }) => (
                <Hour
                  enabled={available}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                  selected={hour === selectedHour}
                >
                  <HourText selected={hour === selectedHour}>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, available, hour }) => (
                <Hour key={hourFormatted} available={available}
                  onPress={() => handleSelectHour(hour)}
                  selected={hour === selectedHour}
                  enabled={available}
                >
                  <HourText selected={hour === selectedHour}>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>
            Agendar
</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
