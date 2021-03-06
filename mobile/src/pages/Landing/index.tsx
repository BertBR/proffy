import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import heartIcon from '../../assets/images/icons/heart.png'

export default function Landing() {
  const {navigate} = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    })
  },[])

  function handleNavigateToGiveClassesPage(){
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPage(){
    navigate('Study')
  }

  return (
    <View style={styles.container}>
     <Image source={landingImg} style={styles.banner}></Image>
     <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que desejar fazer?</Text>
     </Text>
     <View style={styles.buttonsContainer}>
       <RectButton 
       style={[styles.button, styles.buttonPrimary]}
       onPress={handleNavigateToStudyPage}
       >
        <Image source={studyIcon}/>
        <Text style={styles.buttonText}>Estudar</Text>
       </RectButton>

       <RectButton 
       style={[styles.button, styles.buttonSecondary]}
       onPress={handleNavigateToGiveClassesPage}
       >
        <Image source={studyIcon}/>
        <Text 
        style={styles.buttonText}>Dar aulas</Text>
       </RectButton>
     </View>

    <Text style={styles.totalConnections}>
      Total de {totalConnections} conexões já realizadas {' '}
      <Image source={heartIcon}/>
      </Text>

    </View>
    )
}