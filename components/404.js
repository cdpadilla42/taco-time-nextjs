import React from 'react';
import Link from 'next/link';

const FourOhFour = () => {
  return (
    <div>
      Woops! Something went wrong.
      <Link href="/">
        <a>Return Home</a>
      </Link>
    </div>
  );
};

export default FourOhFour;
