import { Pressable, StyleSheet, Text } from 'react-native';
import { cores, espacamentos, fontes, raios, tamanhos } from '../data/tema';

export default function Botao({ titulo, aoPressionar, variante = 'primario' }) {
  const ehSecundario = variante === 'secundario';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={aoPressionar}
      style={({ pressed }) => [
        estilos.base,
        ehSecundario ? estilos.secundario : estilos.primario,
        pressed ? estilos.pressionado : null,
      ]}
    >
      <Text style={ehSecundario ? estilos.textoSecundario : estilos.textoPrimario}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    minHeight: tamanhos.toqueMinimo,
    paddingHorizontal: espacamentos.grande,
    borderRadius: raios.medio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primario: {
    backgroundColor: cores.principal,
  },
  secundario: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: cores.principal,
  },
  pressionado: {
    opacity: 0.75,
  },
  textoPrimario: {
    fontSize: fontes.normal,
    fontWeight: '600',
    color: cores.textoClaro,
  },
  textoSecundario: {
    fontSize: fontes.normal,
    fontWeight: '600',
    color: cores.principal,
  },
});