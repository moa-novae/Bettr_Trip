const initialData = {
  tasks: {
    '1': {
      id: '1',
      location: 'location 1',
      activity: 'This',
      travel: { method: 'Car', duration: 2 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    '2': {
      id: '2',
      location: 'location 2',
      activity: 'those',
      travel: { method: 'Walking', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    3: {
      id: '3',
      location: 'location 3',
      activity: 'those',
      travel: { method: 'Bicycle', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    4: {
      id: '4',
      location: 'location 4',
      activity: 'those',
      travel: { method: 'Car', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    5: {
      id: '5',
      location: 'location 5',
      activity: 'those',
      travel: { method: 'Bus', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    6: {
      id: '6',
      location: 'location 6',
      activity: 'those',
      travel: { method: 'Walking', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    7: {
      id: '7',
      location: 'location 7',
      activity: 'those',
      travel: { method: 'Bicycle', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Day list',
      taskIds: [1,2,3,4,5,6,7],
    },
  },
  columnOrder: ['column-1'],
}
export default initialData;