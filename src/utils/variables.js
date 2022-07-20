export const getVariables = audio => {
  let subdirectory;
  if (audio.startsWith('bix')) subdirectory = 'bix';
  if (audio.startsWith('gg')) subdirectory = 'gg';
  if (/^\d/.test(audio)) subdirectory = 'number';
  else subdirectory = audio[0];

  const audio = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio}.mp3`;
};
