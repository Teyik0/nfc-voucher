'use client';

const Scan = () => {
  return (
    <div className='flex flex-col justify-center'>
      <img
        src='/spinner.gif'
        alt='Your GIF'
        className='h-24 w-24 m-auto mb-4'
      />
      <h1>Waiting for a badge...</h1>
    </div>
  );
};

export default Scan;
