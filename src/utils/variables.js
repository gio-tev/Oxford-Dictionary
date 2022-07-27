export const wordVariables = data => {
  const word = data.word;

  const definition = data?.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.definitions
    ? data?.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.definitions[0]
    : undefined;

  const lexicalCategory = data?.results[0]?.lexicalEntries[0]?.lexicalCategory.text;

  const etymology = data?.results[0]?.lexicalEntries[0]?.entries[0]?.etymologies
    ? data.results[0].lexicalEntries[0].entries[0].etymologies[0]
    : undefined;

  const audioUri =
    data?.results[0]?.lexicalEntries[0]?.entries[0] &&
    data?.results[0]?.lexicalEntries[0]?.entries[0]?.pronunciations
      ? data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
      : undefined;

  const dialect = data?.results[0]?.lexicalEntries[0]?.entries[0]?.pronunciations
    ? data.results[0].lexicalEntries[0].entries[0].pronunciations[0].dialects[0]
    : undefined;

  const example = data?.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.examples
    ? data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text
    : undefined;

  const phoneticSpelling = data?.results[0]?.lexicalEntries[0]?.entries[0]?.pronunciations
    ? data.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling
    : undefined;

  const synonyms = data.results[0].lexicalEntries[0].entries[0].senses
    ? data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms?.map(el => el.text)
    : undefined;

  return {
    word,
    definition,
    lexicalCategory,
    etymology,
    audioUri,
    dialect,
    example,
    phoneticSpelling,
    synonyms,
  };
};
