import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, ImageBackground, Modal } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [jogador, setJogador] = useState(0)
    const [computador, setComputador] = useState(0)
    const [placarJogador, setPlacarJogador] = useState(0)
    const [placarComputador, setPlacarComputador] = useState(computador)

    function mudarImagem(valor){
    if(valor==1){
      return <Image style={styles.imagem} source={require('./assets/jokenpo/pedra.png')}></Image>
    }
    if(valor==2){
      return <Image style={styles.imagem} source={require('./assets/jokenpo/papel.png')}></Image>
    }
    if(valor==3){
      return <Image style={styles.imagem} source={require('./assets/jokenpo/tesoura.png')}></Image>
    }
    if(valor == 0){
      return <Image style={styles.imagem} source={require('./assets/jokenpo/caixa.png')}></Image>
    }
  }

  function reinicia(){
    setPlacarComputador(0);
    setPlacarJogador(0);
    setModalVisible(false);
    setModalVisible2(false)
    
  }

  function jogar(valor) {

    let maquina;


    maquina = Math.floor(Math.random() * 3) + 1;
    setJogador(valor);
    setComputador(maquina);

    if (valor == 1 && maquina == 2 || valor == 3 && maquina == 1 || valor == 2 && maquina == 3) {

      setPlacarComputador(placarComputador + 1)
    }
    if (valor == 2 && maquina == 1 || valor == 1 && maquina == 3 || valor == 3 && maquina == 2) {
      setPlacarJogador(placarJogador + 1)
    }
  }

  function resultado(){

    console.log(placarComputador)
    if(placarComputador==5){
      
      return <Text style={styles.modalText}>Você perdeu!!!!</Text>
    
      }
      if(placarJogador==5){
      return <Text style={styles.modalText}>Você Ganhou!!!!</Text>
      }
    }

  useEffect(() => {
    if((placarJogador==5) || (placarComputador == 5)){
      setModalVisible(true);
    }else{
      setModalVisible(false);
    }
    
  });

  return (
    <View style={styles.container}>

      <ImageBackground source={require('./assets/jokenpo/vivid-abstract-colors-gradient.jpg')} 
      style={{width: '100%', height: '100%', justifyContent: 'center', resizeMode: 'cover', flex: 1}}>

      <View style={styles.titulo}>
        <Image source={require('./assets/jokenpo/titulo.png')} />
      </View>

      <View style={styles.placar}>
        <Text style={styles.texto}>PLACAR</Text>
      </View>

      <View style={styles.placar2}>
        <Text style={styles.texto}>{placarJogador}</Text>
        <Text style={styles.texto}>{placarComputador}</Text>
      </View>

      <View style={styles.vs}>
        {mudarImagem(jogador)}
        <Image source={require('./assets/jokenpo/vs.png')} style={styles.imagem}/>
        {mudarImagem(computador)}
      </View>

      <View style={styles.novaPartida}>
        <Pressable style={styles.botao} onPress={() => setModalVisible2(true)}>
          <Text style={{fontWeight: 'bold'}}>NOVA PARTIDA</Text>
        </Pressable>
      </View>

      <View style={styles.jokenpo}>
        <Pressable onPress={()=> jogar(1)}>
          <Image source={require('./assets/jokenpo/pedra.png')} style={styles.imagem}/>
        </Pressable>
        <Pressable onPress={()=> jogar(2)}>
          <Image source={require('./assets/jokenpo/papel.png')} style={styles.imagem}/>
        </Pressable>
        <Pressable onPress={()=> jogar(3)}>
          <Image source={require('./assets/jokenpo/tesoura.png')} style={styles.imagem}/>
        </Pressable>
      </View>

      <Modal transparent={true} animationType='fade' visible={modalVisible2}>
        <View style={styles.modal}>
          <View style={styles.modalPrincipal}>
          <Text style = {styles.textFinal}>Deseja reiniciar a partida?</Text>
              <Pressable style={styles.buttonNP}  onPress={()=>setModalVisible2(false)}>
                <Text>Não</Text>
              </Pressable>
              <Pressable style={styles.buttonNP}  onPress={()=>reinicia()}>
                <Text>Sim</Text>
              </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style = {styles.boxModal}>
            <Text style = {styles.textFinal}>{resultado()}</Text>
            <Pressable style={styles.buttonNP}  onPress={()=>reinicia()}>
              <Text>Jogar novamente</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto"/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titulo: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vs: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  placar: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placar2: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  novaPartida: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    height: 50,
    width: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 3,
    marginVertical: 15
  },
  jokenpo: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagem: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  texto: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  modal: {
    flex: 1,
    backgroundColor: '#00000070',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalPrincipal: {
    width: '70%',
    height: '50%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonNP:{
    backgroundColor: 'white',
    width: 200,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 2,
    borderColor: 'gold',
    color: 'gold',
    fontSize: '18pt',
    borderRadius: 15,
    marginBottom: 5
  },
  textFinal: {
    fontSize: 24,
    color: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxModal: {
    flex: 0.33,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'gold',
    backgroundColor: 'white',
    padding: 10
  },
});
