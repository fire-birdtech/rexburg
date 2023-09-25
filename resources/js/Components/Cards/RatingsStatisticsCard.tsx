import {
  Card, CategoryBar, Flex, Metric, Text,
} from '@tremor/react';
import { type Rating } from '@/types';

export default function RatingsStatisticsCard({ ratings }: { ratings: Rating[] }) {
  return (
		<Card>
			{ratings.map((rating, index) => (
				<div key={index} className={index > 0 ? 'mt-5' : ''}>
					<Text>{rating.name}</Text>
					<Flex className="mt-1 space-x-2 truncate" justifyContent="start" alignItems="baseline">
						<Metric>{rating.score}</Metric>
						<Text>from {rating.total} reviews</Text>
					</Flex>
					<div className="mt-2">
						<CategoryBar
							values={rating.data.map((item) => (item.total / rating.total) * 100)}
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
