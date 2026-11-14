import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/Botao';
import Cabecalho from '../components/Cabecalho';
import CampoTexto from '../components/CampoTexto';
import CardReceita from '../components/CardReceita';
import ChipCategoria from '../components/ChipCategoria';
import { categorias } from '../data/receitas';
import { cores, espacamentos, fontes } from '../data/tema';

const opcoesCategoria = ['Todas', ...categorias];

const normalizarTexto = (texto) =>
  texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function Home({ navigation, receitas }) {
  const [busca, setBusca] = useState('');
  const [buscaAplicada, setBuscaAplicada] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setBuscaAplicada(normalizarTexto(busca));
    }, 300);

    return () => clearTimeout(temporizador);
  }, [busca]);

  const receitasFiltradas = receitas.filter((receita) => {
    const combinaCategoria =
      categoriaSelecionada === 'Todas' || receita.categoria === categoriaSelecionada;
    const combinaNome = normalizarTexto(receita.nome).includes(buscaAplicada);

    return combinaCategoria && combinaNome;
  });

  const buscando = normalizarTexto(busca) !== buscaAplicada;
  const subtitulo = buscando
    ? 'Buscando...'
    : `Mostrando ${receitasFiltradas.length} de ${receitas.length} receitas`;

  const cabecalhoDaLista = (
    <View>
      <Cabecalho titulo="Catálogo" subtitulo={subtitulo} />

      <CampoTexto
        rotulo="Buscar receita"
        valor={busca}
        aoMudarTexto={setBusca}
        placeholder="Digite o nome da receita"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={estilos.chips}
      >
        {opcoesCategoria.map((categoria) => (
          <ChipCategoria
            key={categoria}
            rotulo={categoria}
            selecionado={categoria === categoriaSelecionada}
            aoPressionar={() => setCategoriaSelecionada(categoria)}
          />
        ))}
      </ScrollView>

      <View style={estilos.acao}>
        <Botao
          titulo="Nova receita"
          aoPressionar={() => navigation.navigate('Formulario')}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={receitasFiltradas}
      keyExtractor={(receita) => String(receita.id)}
      renderItem={({ item }) => (
        <CardReceita
          receita={item}
          aoPressionar={() => navigation.navigate('Detalhes', { receita: item })}
        />
      )}
      ListHeaderComponent={cabecalhoDaLista}
      ListEmptyComponent={
        <View style={estilos.vazio}>
          <Text style={estilos.textoVazio}>Nenhuma receita encontrada.</Text>
          <Text style={estilos.dicaVazio}>
            Tente outro nome ou escolha outra categoria.
          </Text>
        </View>
      }
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    padding: espacamentos.medio,
    paddingBottom: espacamentos.grande * 2,
  },
  chips: {
    gap: espacamentos.pequeno,
    paddingBottom: espacamentos.medio,
  },
  acao: {
    marginBottom: espacamentos.medio,
  },
  vazio: {
    alignItems: 'center',
    paddingVertical: espacamentos.grande,
  },
  textoVazio: {
    fontSize: fontes.subtitulo,
    fontWeight: '700',
    color: cores.escuro,
  },
  dicaVazio: {
    marginTop: 4,
    fontSize: fontes.pequena,
    color: cores.textoSecundario,
    textAlign: 'center',
  },
});