import React from 'react';
import LineItem from './line-item';

export default function Project() {
  return (
    <>
      <LineItem onChange={console.log} />
      <input type="submit" value="Submit" />
    </>
  );
}
