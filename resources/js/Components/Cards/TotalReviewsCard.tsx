import {
  Card, CategoryBar, Flex, Legend, Metric, Text,
} from '@tremor/react';

export default function TotalReviewsCard() {
  return (
		<Card>
			<Text>
				Total Reviews
			</Text>
			<Flex className="mt-4 space-x-2 truncate" justifyContent="start" alignItems="baseline">
				<Metric>3.6</Metric>
				<Text>from 143 reviews</Text>
			</Flex>
			<CategoryBar
				values={[9, 16, 21, 26, 28]}
				colors={['red', 'emerald', 'amber', 'rose', 'orange']}
				showLabels={false}
				className="mt-4"
			/>
			<Legend
				categories={['1.0', '2.0', '3.0', '4.0', '5.0']}
				colors={['red', 'emerald', 'amber', 'rose', 'orange']}
				className="mt-3"
			/>
		</Card>
  );
}
