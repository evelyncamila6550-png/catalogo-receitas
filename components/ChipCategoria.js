import { Pressable, StyleSheet, Text } from 'react-native';
import { cores, espacamentos, fontes, raios } from '../data/tema';

export default function ChipCategoria({ rotulo, selecionado, aoPressionar }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: selecionado }}
      hitSlop={4}
      onPress={aoPressionar}
      style={[estilos.chip, selecionado ? estilos.chipSelecionado : null]}
    >
      <Text style={selecionado ? estilos.textoSelecionado : estilos.texto}>
        {rotulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  chip: {
    paddingVertical: 12,
    paddingHorizontal: espacamentos.medio,
    borderRadius: raios.redondo,
    borderWidth: 1,
    borderColor: cores.destaqueSuave,
    backgroundColor: cores.card,
  },
  chipSelecionado: {
    backgroundColor: cores.principal,
    borderColor: cores.principal,
  },
  texto: {
    fontSize: fontes.pequena,
    fontWeight: '500',
    color: cores.principal,
  },
  textoSelecionado: {
    fontSize: fontes.pequena,
    fontWeight: '600',
    color: cores.textoClaro,
  },
});