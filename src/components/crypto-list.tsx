import * as React from "react";

export const CryptoList = (props: React.PropsWithChildren) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
        <th>#</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24H Change</th>
        </tr>
      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  );
};
