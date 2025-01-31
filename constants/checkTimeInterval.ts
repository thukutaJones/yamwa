export function checkTimeInterval(interval: string, day: number): { status: string; color: string } | null {
  const currentTime = new Date();

  if (!interval.includes('-')) {
    return null;
  }

  const [start, end] = interval.split('-').map(time => time.trim().toUpperCase());

  if(day !== new Date().getDay()) {
    return { status: 'pending', color: 'orange' };
  }

  function parseTime(timeString: string): Date | null {
    const date = new Date();
    const period = timeString.slice(-2).toUpperCase();
    const timeParts = timeString.slice(0, -2).split(':');

    if (timeParts.length !== 2 || (period !== 'AM' && period !== 'PM')) {
      return null;
    }

    let [hours, minutes] = timeParts.map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      return null;
    }

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  const startTime = parseTime(start);
  const endTime = parseTime(end);

  if (!startTime || !endTime) {
    return null;
  }

  if (currentTime >= startTime && currentTime <= endTime) {
    return { status: 'in progress', color: 'yellow' };
  } else if (currentTime < startTime) {
    return { status: 'pending', color: 'orange' };
  } else {
    return { status: 'completed', color: 'green' };
  }
}
