export const filters = {
  officialCoverage: {
    title: 'Official Coverage',
    selected: 'yes',
    style: 'toggle',
    options: ['yes', 'no'],
  },
  drivingSide: {
    title: 'Driving Side',
    selected: '',
    style: 'toggle',
    options: ['right', 'left'],
  },
  cameraGen: {
    title: 'Camera Generation',
    selected: '',
    options: [1, 2, 3, 4],
  },
  hemisphere: {
    title: 'Hemisphere',
    selected: '',
    options: ['north', 'south'],
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
};
