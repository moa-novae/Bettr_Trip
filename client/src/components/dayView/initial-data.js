const initialData = {
  tasks: {
    '1': {
      trip_id:1,
      id: '1',
      latitude: 14,
      longitude: 10,
      name: 'name 1',
      activity: 'This',
      travel: { method: 'Car', duration: 2 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    '2': {
      trip_id:1,
      id: '2',
      latitude: 14,
      longitude: 10,
      name: 'name 2',
      activity: 'those',
      travel: { method: 'Walking', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    3: {
      trip_id:1,
      id: '3',
      latitude: 14,
      longitude: 10,
      name: 'name 3',
      activity: 'those',
      travel: { method: 'Bicycle', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    4: {
      trip_id:1,
      id: '4',
      latitude: 14,
      longitude: 10,
      name: 'name 4',
      activity: 'those',
      travel: { method: 'Car', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    5: {
      trip_id:1,
      id: '5',
      latitude: 14,
      longitude: 10,
      name: 'name 5',
      activity: 'those',
      travel: { method: 'Bus', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    6: {
      trip_id:1,
      id: '6',
      latitude: 14,
      longitude: 10,
      name: 'name 6',
      activity: 'those',
      travel: { method: 'Walking', duration: 10 },
      time: {start: '2007-11-19 08:37:48', end: '2007-11-19 08:37:48'}
    },
    7: {
      trip_id:1,
      id: '7',
      latitude: 14,
      longitude: 10,
      name: 'name 7',
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