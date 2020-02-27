import MomentAdapter from '@date-io/moment'
const Moment = new MomentAdapter();
const { moment, humanize } = Moment
export default (input, source, destination, draggableId) => {
  let modifyTime = { ...input }

  if (source && destination) {
    //if moved between columns => change date

    if (source.droppableId !== destination.droppableId) {

      const year = moment(destination.droppableid, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY')
      const month = moment(destination.droppableId, 'YYYY-MM-DD').subtract(1, 'month').format('MM')
      console.log('month', month)
      const date = moment(destination.droppableId, 'YYYY-MM-DD').format('DD')
      // console.log('manage time', modifyTime.tasks[pointId])
      modifyTime.tasks[draggableId].time.start = moment(modifyTime.tasks[draggableId].time.start, 'YYYY-MM-DD HH:mm:ss').set({ 'year': year, 'month': month, 'date': date }).format('YYYY-MM-DD HH:mm:ss')
      modifyTime.tasks[draggableId].time.end = moment(modifyTime.tasks[draggableId].time.end, 'YYYY-MM-DD HH:mm:ss').set({ 'year': year, 'month': month, 'date': date }).format('YYYY-MM-DD HH:mm:ss')
      console.log('weird icre', modifyTime.tasks[draggableId].time)
    }
  }
  // console.log('taskid', modifyTime.columns['column-1'].taskIds)
  for (let columnId of modifyTime.columnOrder) {

    modifyTime.columns[columnId].taskIds.map((pointId, index) => {
      //if subsequent overlaps
      const prevPointId = modifyTime.columns[columnId].taskIds[index - 1]
      if (prevPointId) {
        let startMoment = moment(modifyTime.tasks[pointId].time.start, 'YYYY-MM-DD HH:mm:ss')
        let endMoment = moment(modifyTime.tasks[pointId].time.end, 'YYYY-MM-DD HH:mm:ss')

        // console.log('endMoment', endMoment.format('YYYY-MM-DD HH:mm:ss'))

        const prevEndMoment = moment(modifyTime.tasks[prevPointId].time.end, 'YYYY-MM-DD HH:mm:ss')
        if (startMoment.isBefore(prevEndMoment)) {
          const duration = moment.duration(endMoment.diff(startMoment))
          startMoment = prevEndMoment.clone().add(10, 'minute')
          endMoment = startMoment.clone().add(duration)
          modifyTime.tasks[pointId].time = {
            start: startMoment.format('YYYY-MM-DD HH:mm:ss'),
            end: endMoment.format('YYYY-MM-DD HH:mm:ss')
          }
        }
      }
    })
  }
  return modifyTime
}