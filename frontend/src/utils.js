function timeDifference(current, previous) {
	const milliSecondsPerMinute = 60 * 1000;
	const milliSecondsPerHour = milliSecondsPerMinute * 60;
	const milliSecondsPerDay = milliSecondsPerHour * 24;
	const milliSecondsPerMonth = milliSecondsPerDay * 30;
	const milliSecondsPerYear = milliSecondsPerMonth * 365;

	const timeElapsed = current - previous;

	if (timeElapsed < milliSecondsPerMinute / 3) return "just now";

	if (timeElapsed < milliSecondsPerMinute) return "less than 1 minute";

	if (timeElapsed < milliSecondsPerHour) {
		return `${Math.round(timeElapsed / milliSecondsPerMinute)} mins ago`;
	}

	if (timeElapsed < milliSecondsPerDay) {
		return `${Math.round(timeElapsed / milliSecondsPerHour)} hrs ago`;
	}

	if (timeElapsed < milliSecondsPerMonth) {
		return `${Math.round(timeElapsed / milliSecondsPerDay)} days ago`;
	}

	if (timeElapsed < milliSecondsPerYear) {
		return `${Math.round(timeElapsed / milliSecondsPerMonth)} mo ago`;
	}

	return `${Math.round(timeElapsed / milliSecondsPerYear)} yrs ago`;
}

export default function timeDifferenceForDate(date) {
	const now = new Date().getTime();
	const updated = new Date(date).getTime();

	return timeDifference(now, updated);
}