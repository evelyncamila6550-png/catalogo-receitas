import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/Botao';
import { cores, espacamentos, fontes, raios, sombra } from '../data/tema';

export default function Detalhes({ route, navigation }) {
  const receita = route.params?.receita;

  if (!receita) {
    return (
      <View style={estilos.centro}>
        <Text style={estilos.mensagem}>Receita não encontrada.</Text>
        <Botao titulo="Voltar ao catálogo" aoPressionar={() => navigation.goBack()} />
      </View>
    );
  }

  const {
    nome,
    emoji,
    descricao,
    categoria,
    tempoPreparo,
    porcoes,
    ingredientes = [],
    modoPreparo = [],
  } = receita;

  return (
    <ScrollView contentContainerStyle={estilos.conteudo}>
      <View style={estilos.topo}>
        <View style={estilos.blocoEmoji}>
          <Text style={estilos.emoji}>{emoji}</Text>
        </View>
        <View style={estilos.topoTexto}>
          <View style={estilos.etiqueta}>
            <Text style={estilos.textoEtiqueta}>{categoria}</Text>
          </View>
          <Text style={estilos.nome}>{nome}</Text>
        </View>
      </View>

      <Text style={estilos.descricao}>{descricao}</Text>

      <View style={estilos.infos}>
        <View style={estilos.info}>
          <Text style={estilos.infoRotulo}>Tempo de preparo</Text>
          <Text style={estilos.infoValor}>{`⏱️ ${tempoPreparo} min`}</Text>
        </View>
        <View style={estilos.info}>
          <Text style={estilos.infoRotulo}>Rendimento</Text>
          <Text style={estilos.infoValor}>
            {`🍽️ ${porcoes} ${porcoes === 1 ? 'porção' : 'porções'}`}
          </Text>
        </View>
      </View>

      <Text style={estilos.secao}>Ingredientes</Text>
      {ingredientes.map((ingrediente, indice) => (
        <View key={`${indice}-${ingrediente}`} style={estilos.linhaIngrediente}>
          <View style={estilos.marcador} />
          <Text style={estilos.textoLinha}>{ingrediente}</Text>
        </View>
      ))}

      <Text style={estilos.secao}>Modo de preparo</Text>
      {modoPreparo.map((passo, indice) => (
        <View key={`${indice}-${passo}`} style={estilos.linhaPasso}>
          <View style={estilos.numero}>
            <Text style={estilos.textoNumero}>{indice + 1}</Text>
          </View>
          <Text style={estilos.textoLinha}>{passo}</Text>
        </View>
      ))}

      <View style={estilos.acao}>
        <Botao
          titulo="Voltar ao catálogo"
          variante="secundario"
          aoPressionar={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  centro: {
    flex: 1,
    padding: espacamentos.medio,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  mensagem: {
    marginBottom: espacamentos.medio,
    fontSize: fontes.subtitulo,
    textAlign: 'center',
    color: cores.texto,
  },
  conteudo: {
    padding: espacamentos.medio,
    paddingBottom: espacamentos.grande * 2,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: espacamentos.medio,
  },
  blocoEmoji: {
    width: 84,
    height: 84,
    marginRight: espacamentos.medio,
    borderRadius: raios.grande,
    backgroundColor: cores.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  topoTexto: {
    flex: 1,
    alignItems: 'flex-start',
  },
  etiqueta: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 6,
    borderRadius: raios.redondo,
    backgroundColor: cores.destaqueSuave,
  },
  textoEtiqueta: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.escuro,
  },
  nome: {
    fontSize: fontes.titulo,
    fontWeight: '700',
    color: cores.escuro,
  },
  descricao: {
    marginBottom: espacamentos.medio,
    fontSize: fontes.normal,
    lineHeight: 22,
    color: cores.textoSecundario,
  },
  infos: {
    flexDirection: 'row',
    gap: espacamentos.pequeno + 4,
    marginBottom: espacamentos.grande,
  },
  info: {
    flex: 1,
    padding: espacamentos.medio,
    borderRadius: raios.medio,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.card,
    ...sombra,
  },
  infoRotulo: {
    fontSize: fontes.pequena,
    color: cores.textoSecundario,
  },
  infoValor: {
    marginTop: 4,
    fontSize: fontes.subtitulo,
    fontWeight: '700',
    color: cores.principal,
  },
  secao: {
    marginBottom: espacamentos.pequeno + 4,
    fontSize: fontes.titulo,
    fontWeight: '700',
    color: cores.escuro,
  },
  linhaIngrediente: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: espacamentos.pequeno,
  },
  marcador: {
    width: 8,
    height: 8,
    marginTop: 8,
    marginRight: espacamentos.pequeno + 4,
    borderRadius: raios.redondo,
    backgroundColor: cores.apoio,
  },
  linhaPasso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: espacamentos.pequeno + 4,
  },
  numero: {
    width: 28,
    height: 28,
    marginRight: espacamentos.pequeno + 4,
    borderRadius: raios.redondo,
    backgroundColor: cores.principal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoNumero: {
    fontSize: fontes.pequena,
    fontWeight: '700',
    color: cores.textoClaro,
  },
  textoLinha: {
    flex: 1,
    fontSize: fontes.normal,
    lineHeight: 22,
    color: cores.texto,
  },
  acao: {
    marginTop: espacamentos.medio,
  },
});