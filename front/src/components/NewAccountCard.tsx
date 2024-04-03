import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const NewAccountCard = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center space-y-0'>
        <CardTitle>Manage account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-2 text-sm'>
          <Button className='w-full' variant='outline'>
            Export account
          </Button>
          <Button className='w-full' variant='outline'>
            Import account
          </Button>
          <Button className='w-full' variant='outline'>
            Connect hardware wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewAccountCard;
