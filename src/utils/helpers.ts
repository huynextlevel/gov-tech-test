import moment from 'moment-timezone'

export const numberWithCommas = (x: string | number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const roundToNearestHalfHour = (time: Date) =>  {
  const formatTime = moment(time)
  const minutes = formatTime.minute();
  
  if (minutes < 15) {
    formatTime.minutes(0);
  } else if (minutes < 45) {
    formatTime.minutes(30);
  } else {
    formatTime.add(1, 'hours').minutes(0);
  }

  return formatTime;
}

