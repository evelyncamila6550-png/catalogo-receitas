import { StyleSheet, Text, View } from 'react-native';
import { cores, espacamentos, fontes } from '../data/tema';

export default function Cabecalho({ titulo, subtitulo }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: espacamentos.medio,
  },
  titulo: {
    fontSize: fontes.destaque,
    fontWeight: '700',
    color: cores.escuro,
  },
  subtitulo: {
    marginTop: 4,
    fontSize: fontes.normal,
    color: cores.textoSecundario,
  },
});