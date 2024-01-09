type Bookings = {
	id: string;
	date: Date;
	email: string;
	endTime: string;
	name: string;
	startTime: string;
	uid: string;
	usage: string;
	venueID: string;
	status: string;
};

type Venues = {
	id: string;
	image: string;
	name: string;
	category: string;
	link?: string;
};
