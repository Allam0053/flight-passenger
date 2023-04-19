import UnderlineLink from '@/components/links/UnderlineLink';

export default function LayoutFooter() {
  return (
    <footer className='pb-2 pt-12 text-gray-700'>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://allam-taju.vercel.app'>
        Allam Taju Sarof
      </UnderlineLink>
    </footer>
  );
}
