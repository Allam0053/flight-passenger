import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ImSpinner2 } from 'react-icons/im';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { getPassenger } from '@/services/Passenger';

export default function Page() {
  const router = useRouter();
  const { query } = router;

  const { status, data } = useQuery({
    queryKey: ['passenger', query.id],
    queryFn: () => getPassenger(query.id as string),
  });

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='bg-white'>
        <section className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='w-full'>
            <article className='prose w-full'>
              {status === 'loading' && <ImSpinner2 className='animate-spin' />}
              {status === 'success' && (
                <>
                  <h5>{data.name}</h5>
                  <p>{data._id}</p>
                  <h6>{data.trips}</h6>
                  <hr />
                  <NextImage
                    useSkeleton
                    alt={`${data.airline[0].name} logo`}
                    className='w-[200px]'
                    width={200}
                    height={100}
                    src={data.airline[0].logo}
                  />
                  <h5>{data.airline[0].name}</h5>
                  <h6>{data.airline[0].country}</h6>
                  <UnderlineLink openNewTab href={data.airline[0].website}>
                    {data.airline[0].website}
                  </UnderlineLink>
                </>
              )}
            </article>
          </div>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://allam-taju.vercel.app'>
              Allam Taju Sarof
            </UnderlineLink>
          </footer>
        </section>
      </main>
    </Layout>
  );
}
