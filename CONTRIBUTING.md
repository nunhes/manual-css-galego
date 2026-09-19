# Guía de contribución

Obrigado por interesarte en contribuír ao Manual de CSS Moderno en Galego!

## Como contribuír

### Informar de erros ou suxerir melloras

Se atopas un erro, queres engadir un exemplo ou suxerir unha mellora:

1. Abre unha incidencia en [GitHub Issues](https://github.com/nunhes/manual-css-galego/issues)
2. Usa as plantillas de incidencia dispoñibles para estruturar a túa petición
3. Proporciona toda a información relevante:
   - Para erros: descripción clara, pasos para reproducir, comportamento esperado vs real
   - Para suxestións: motivación, casos de uso, exemplos se procede

### Facer cambios no contido

1. Fai un fork do repositorio
2. Crea unha rama para o teu cambio (`git checkout -b feature/mi-mellora`)
3. Fai os teus cambios seguindo as convencións do manual
4. Executa as validacións:
   ```bash
   node check-utf8.cjs
   node lint-css-examples.cjs
   ```
5. Fai commit dos teus cambios con mensaxes claros
6. Envía un pull request ao repositorio principal

## Convencións de estilo

### Lingua e terminoloxía

- Todo o contido debe estar en galego estándar (normativa RAG/ILG)
- Usa a terminoloxía do glosario do manual
- Consulta o glosario xeral inglés-galego para termos técnicos
- Evita castelanismos e anglicismos innecesarios
- Se un termo non ten tradución asentada, ofréceno en cursiva cunha alternativa razoada

### Formato

- Usa tuteo directo («Vas ver...», «Podes probar...»)
- Emprega linguaxe inclusiva («alumnado», «persoas programadoras»)
- Código comentado en galego, identificadores segundo convención da linguaxe
- Explicación antes do código: nunca un bloque de código sen parágrafo explicativo
- Usa «aniñamento», «aniñar», «aniñado» (non «anidación», «anidar», «anidado»)

### Metadatos

Cada capítulo debe ter metadatos YAML completos:

```yaml
---
title: "Título do capítulo"
bloque: 0-7
capitulo: número_secuencial
nivel: introductorio|basico|intermedio|avanzado|referencia
ultima_revision: "AAAA-MM-DD"
estado: borrador_para_validacion|validado|actualizado
compatibilidade: universal|baseline_XXXX|non_aplicable|experimental
palabras_chave:
  - termo1
  - termo2
---
```

## Valacións

O proxecto inclúe validacións automáticas que se executan antes de cada commit:

- **Verificación UTF-8**: asegura que todos os arquivos están en codificación UTF-8 válida
- **Linting CSS**: valida a sintaxe dos exemplos CSS con Stylelint
- **Verificación de ligazóns**: comproba que as ligazóns markdown son válidas

## Prioridades

As melloras priorítanse seguindo este criterio:

1. **Correccións de erros** en contido existente
2. **Actualizacións** por cambios en CSS ou novas características
3. **Meloras de claridade** nas explicacións
4. **Novos exemplos** que ilustren conceptos existentes
5. **Novos contidos** que amplíen o manual

## Contacto

Para dúbidas ou consultas sobre como contribuír, abre unha incidencia coa etiqueta `question`.

---

O manual é un documento vivo que se vai actualizando coa evolución de CSS e co feedback de quen o usa. Grazas por contribuír!
