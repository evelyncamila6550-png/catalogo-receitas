import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/Botao';
import Cabecalho from '../components/Cabecalho';
import CampoTexto from '../components/CampoTexto';
import ChipCategoria from '../components/ChipCategoria';
import { categorias } from '../data/receitas';
import { cores, espacamentos, fontes } from '../data/tema';

const emojiPorCategoria = {
  Massas: '🍝',
  'Carnes e aves': '🍗',
  Peixes: '🐟',
  Vegetarianas: '🥗',
};

const dadosVazios = {
  nome: '',
  descricao: '',
  categoria: '',
  tempoPreparo: '',
  porcoes: '',
  ingredientes: '',
  modoPreparo: '',
};

const separarLinhas = (texto) =>
  texto
    .split('\n')
    .map((linha) => linha.trim())
    .filter((linha) => linha !== '');

const ehInteiroPositivo = (texto) => {
  const numero = Number(texto);

  return Number.isInteger(numero) && numero > 0;
};

const validar = (dados) => {
  const erros = {};

  if (dados.nome.trim().length < 3) {
    erros.nome = 'Informe o nome da receita (mínimo de 3 letras).';
  }

  if (dados.descricao.trim() === '') {
    erros.descricao = 'Escreva uma descrição curta.';
  }

  if (dados.categoria === '') {
    erros.categoria = 'Escolha uma categoria.';
  }

  if (!ehInteiroPositivo(dados.tempoPreparo)) {
    erros.tempoPreparo = 'Digite um número maior que zero.';
  }

  if (!ehInteiroPositivo(dados.porcoes)) {
    erros.porcoes = 'Digite um número maior que zero.';
  }

  if (separarLinhas(dados.ingredientes).length === 0) {
    erros.ingredientes = 'Informe pelo menos um ingrediente.';
  }

  if (separarLinhas(dados.modoPreparo).length === 0) {
    erros.modoPreparo = 'Informe pelo menos um passo do preparo.';
  }

  return erros;
};

export default function Formulario({ navigation, aoCadastrar }) {
  const [dados, setDados] = useState(dadosVazios);
  const [erros, setErros] = useState({});

  const atualizarCampo = (campo, valor) => {
    setDados((atuais) => ({ ...atuais, [campo]: valor }));
    setErros((atuais) => ({ ...atuais, [campo]: '' }));
  };

  const cadastrar = () => {
    const novosErros = validar(dados);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    aoCadastrar({
      nome: dados.nome.trim(),
      descricao: dados.descricao.trim(),
      categoria: dados.categoria,
      tempoPreparo: Number(dados.tempoPreparo),
      porcoes: Number(dados.porcoes),
      emoji: emojiPorCategoria[dados.categoria],
      ingredientes: separarLinhas(dados.ingredientes),
      modoPreparo: separarLinhas(dados.modoPreparo),
    });
    navigation.goBack();
  };

  const temErros = Object.values(erros).some((erro) => erro !== '');

  return (
    <ScrollView
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <Cabecalho
        titulo="Nova receita"
        subtitulo="Preencha os dados para cadastrar."
      />

      <CampoTexto
        rotulo="Nome da receita"
        valor={dados.nome}
        aoMudarTexto={(texto) => atualizarCampo('nome', texto)}
        placeholder="Ex.: Frango assado"
        erro={erros.nome}
      />

      <CampoTexto
        rotulo="Descrição curta"
        valor={dados.descricao}
        aoMudarTexto={(texto) => atualizarCampo('descricao', texto)}
        placeholder="Uma frase sobre a receita"
        erro={erros.descricao}
      />

      <View style={estilos.grupo}>
        <Text style={estilos.rotulo}>Categoria</Text>
        <View style={estilos.chips}>
          {categorias.map((categoria) => (
            <ChipCategoria
              key={categoria}
              rotulo={categoria}
              selecionado={dados.categoria === categoria}
              aoPressionar={() => atualizarCampo('categoria', categoria)}
            />
          ))}
        </View>
        {erros.categoria ? <Text style={estilos.erro}>{erros.categoria}</Text> : null}
      </View>

      <View style={estilos.linha}>
        <View style={estilos.coluna}>
          <CampoTexto
            rotulo="Tempo (minutos)"
            valor={dados.tempoPreparo}
            aoMudarTexto={(texto) => atualizarCampo('tempoPreparo', texto)}
            placeholder="Ex.: 45"
            tipoTeclado="number-pad"
            erro={erros.tempoPreparo}
          />
        </View>
        <View style={estilos.coluna}>
          <CampoTexto
            rotulo="Porções"
            valor={dados.porcoes}
            aoMudarTexto={(texto) => atualizarCampo('porcoes', texto)}
            placeholder="Ex.: 4"
            tipoTeclado="number-pad"
            erro={erros.porcoes}
          />
        </View>
      </View>

      <CampoTexto
        rotulo="Ingredientes (um por linha)"
        valor={dados.ingredientes}
        aoMudarTexto={(texto) => atualizarCampo('ingredientes', texto)}
        placeholder="Um ingrediente por linha"
        multilinha
        erro={erros.ingredientes}
      />

      <CampoTexto
        rotulo="Modo de preparo (um passo por linha)"
        valor={dados.modoPreparo}
        aoMudarTexto={(texto) => atualizarCampo('modoPreparo', texto)}
        placeholder="Um passo por linha"
        multilinha
        erro={erros.modoPreparo}
      />

      {temErros ? (
        <Text style={estilos.aviso}>Revise os campos destacados em vermelho.</Text>
      ) : null}

      <View style={estilos.botoes}>
        <Botao titulo="Cadastrar receita" aoPressionar={cadastrar} />
        <Botao
          titulo="Cancelar"
          variante="secundario"
          aoPressionar={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    padding: espacamentos.medio,
    paddingBottom: espacamentos.grande * 2,
  },
  grupo: {
    marginBottom: espacamentos.medio,
  },
  rotulo: {
    marginBottom: 6,
    fontSize: fontes.pequena,
    fontWeight: '600',
    color: cores.escuro,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacamentos.pequeno,
  },
  erro: {
    marginTop: 4,
    fontSize: fontes.pequena,
    color: cores.erro,
  },
  linha: {
    flexDirection: 'row',
    gap: espacamentos.medio,
  },
  coluna: {
    flex: 1,
  },
  aviso: {
    marginBottom: espacamentos.pequeno + 4,
    fontSize: fontes.pequena,
    fontWeight: '600',
    color: cores.erro,
  },
  botoes: {
    gap: espacamentos.pequeno + 4,
  },
});