import { StyleSheet, Text, TextInput, View } from 'react-native';
import { cores, espacamentos, fontes, raios, tamanhos } from '../data/tema';

export default function CampoTexto({
  rotulo,
  valor,
  aoMudarTexto,
  placeholder,
  erro,
  multilinha = false,
  tipoTeclado = 'default',
}) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        value={valor}
        onChangeText={aoMudarTexto}
        placeholder={placeholder}
        placeholderTextColor={cores.textoSecundario}
        multiline={multilinha}
        keyboardType={tipoTeclado}
        textAlignVertical={multilinha ? 'top' : 'center'}
        style={[
          estilos.campo,
          multilinha ? estilos.campoMultilinha : null,
          erro ? estilos.campoComErro : null,
        ]}
      />
      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: espacamentos.medio,
  },
  rotulo: {
    marginBottom: 6,
    fontSize: fontes.pequena,
    fontWeight: '600',
    color: cores.escuro,
  },
  campo: {
    minHeight: tamanhos.toqueMinimo,
    paddingHorizontal: espacamentos.medio,
    borderWidth: 1,
    borderColor: cores.destaqueSuave,
    borderRadius: raios.medio,
    backgroundColor: cores.card,
    fontSize: fontes.normal,
    color: cores.texto,
  },
  campoMultilinha: {
    minHeight: 120,
    paddingTop: 12,
  },
  campoComErro: {
    borderColor: cores.erro,
  },
  erro: {
    marginTop: 4,
    fontSize: fontes.pequena,
    color: cores.erro,
  },
});