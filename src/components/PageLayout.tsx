import {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({children}: Props) {
  return <div>{children}</div>;
}
