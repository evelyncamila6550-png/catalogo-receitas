import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores, espacamentos, fontes, raios, sombra } from '../data/tema';

export default function CardReceita({ receita, aoPressionar }) {
  const { nome, descricao, categoria, tempoPreparo, porcoes, emoji } = receita;
  const rotuloPorcoes = porcoes === 1 ? 'porção' : 'porções';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir a receita ${nome}`}
      onPress={aoPressionar}
      style={({ pressed }) => [estilos.card, pressed ? estilos.pressionado : null]}
    >
      <View style={estilos.blocoEmoji}>
        <Text style={estilos.emoji}>{emoji}</Text>
      </View>

      <View style={estilos.conteudo}>
        <Text style={estilos.nome} numberOfLines={1}>
          {nome}
        </Text>
        <Text style={estilos.descricao} numberOfLines={2}>
          {descricao}
        </Text>

        <View style={estilos.rodape}>
          <View style={estilos.etiqueta}>
            <Text style={estilos.textoEtiqueta}>{categoria}</Text>
          </View>
          <Text style={estilos.detalhe}>{`⏱️ ${tempoPreparo} min`}</Text>
          <Text style={estilos.detalhe}>{`🍽️ ${porcoes} ${rotuloPorcoes}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: espacamentos.medio,
    marginBottom: espacamentos.medio,
    borderRadius: raios.grande,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.card,
    ...sombra,
  },
  pressionado: {
    opacity: 0.85,
  },
  blocoEmoji: {
    width: 64,
    height: 64,
    marginRight: espacamentos.medio,
    borderRadius: raios.medio,
    backgroundColor: cores.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  conteudo: {
    flex: 1,
  },
  nome: {
    fontSize: fontes.subtitulo,
    fontWeight: '700',
    color: cores.escuro,
  },
  descricao: {
    marginTop: 4,
    fontSize: fontes.pequena,
    color: cores.textoSecundario,
  },
  rodape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: espacamentos.pequeno,
    marginTop: espacamentos.pequeno + 4,
  },
  etiqueta: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: raios.redondo,
    backgroundColor: cores.destaqueSuave,
  },
  textoEtiqueta: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.escuro,
  },
  detalhe: {
    fontSize: 13,
    color: cores.principal,
  },
});