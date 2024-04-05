import { CheckCircleIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';

const ClaimCard = () => {
  return (
    <Card className='w-full flex flex-col justify-between'>
      <CardHeader>
        <CardTitle>Claim</CardTitle>
        <CardDescription className='mt-1'>
          Click the button below to ask for claim and get your reward
        </CardDescription>
      </CardHeader>
      {/* <CardContent className='flex items-center p-4'>
        <CheckCircleIcon className='w-6 h-6 mr-2' />
        <p>Click the b</p>
      </CardContent> */}
      <CardFooter>
        <Button>Ask for Claim</Button>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
