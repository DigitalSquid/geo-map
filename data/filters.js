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
    options: ['left', 'right'],
  },
  hemisphere: {
    title: 'Hemisphere',
    selected: '',
    style: 'toggle',
    options: ['north', 'south'],
  },
  cameraGen: {
    title: 'Camera Generation',
    selected: '',
    options: [1, 2, 3, 4],
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
