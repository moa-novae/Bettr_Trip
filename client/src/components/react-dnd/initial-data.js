const initialData = {
  tasks: {
    '1': {
      id: '1',
      location: 'location 1',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Car', duration: 10 },
    },
    '2': {
      id: '2',
      location: 'location 2',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Walking', duration: 10 },
    },
    3: {
      id: '3',
      location: 'location 3',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Bicycle', duration: 10 },
    },
    4: {
      id: '4',
      location: 'location 4',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Car', duration: 10 },
    },
    5: {
      id: '5',
      location: 'location 5',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Bus', duration: 10 },
    },
    6: {
      id: '6',
      location: 'location 6',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Walking', duration: 10 },
    },
    7: {
      id: '7',
      location: 'location 7',
      activity: ['This', 'That', 'Those'],
      travel: { method: 'Bicycle', duration: 10 },
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