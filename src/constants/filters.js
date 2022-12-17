export const filters = {
  officialCoverage: {
    title: 'Official Coverage',
    selected: 'yes',
    options: ['yes', 'no'],
  },
  drivingSide: {
    title: 'Driving Side',
    selected: '',
    options: ['right', 'left'],
  },
  roadLines: {
    title: 'Road Lines',
    selected: '',
    style: 'icons',
    options: [
      'white-white',
      'white-yellow',
      'yellow-yellow',
      'yellow-white',
      'yellow_white-white',
    ],
  },
  cameraGen: {
    title: 'Camera Generation',
    selected: '',
    options: [1, 2, 3, 4],
  },
};
