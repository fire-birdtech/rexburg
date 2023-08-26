import {
  Card, CategoryBar, Flex, Metric, Text,
} from '@tremor/react';

interface ReviewData {
	rating: number;
	total: number;
}

interface Review {
	data: ReviewData[];
	name: string;
	score: string;
	total: number;
}

export default function ReviewsStatisticsCard({ reviews }: { reviews: Review[] }) {
  return (
		<Card>
			{reviews.map((review, index) => (
				<div key={index} className={index > 0 ? 'mt-5' : ''}>
					<Text>{review.name}</Text>
					<Flex className="mt-1 space-x-2 truncate" justifyContent="start" alignItems="baseline">
						<Metric>{review.score}</Metric>
						<Text>from {review.total} reviews</Text>
					</Flex>
					<div className="mt-2">
						<CategoryBar
							values={review.data.map((item) => (item.total / review.total) * 100)}
							colors={['blue', 'rose', 'sky', 'purple', 'cyan']}
							showLabels={false}
							className="mt-1"
						/>
					</div>
				</div>
			))}
		</Card>
  );
}
