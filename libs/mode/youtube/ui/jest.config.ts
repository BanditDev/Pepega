module.exports = {
  displayName: 'mode-youtube-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mode/youtube/ui',
  preset: '../../../../jest.preset.ts',
};
