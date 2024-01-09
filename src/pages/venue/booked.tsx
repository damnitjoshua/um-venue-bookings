import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

export default function booked() {
  return (
		<div>
			<div className="py-20 text-center flex flex-col items-center space-y-4">
				<svg xmlns="http://www.w3.org/2000/svg" className="text-green-500" width="10em" height="10em" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="m10.5 13.4l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-5.6 5.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z"></path>
				</svg>
				<h1 className="text-4xl font-medium">Booking Request Sent</h1>
				<Button asChild>
					<Link href="/">Go Back</Link>
				</Button>
			</div>
		</div>
	);
}
