import { useInfiniteQuery } from '@tanstack/react-query';
import _ from 'lodash';
import * as React from 'react';
import {
  BsChevronDoubleRight,
  BsFillLightningChargeFill,
} from 'react-icons/bs';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { InView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import ButtonGroup from '@/components/buttons/ButtonGroup';
import IconButton from '@/components/buttons/IconButton';
import StyledInput from '@/components/form/StyledInput';
// import Table from '@/components/table/Table';
import Layout from '@/components/layout/Layout';
import LayoutFooter from '@/components/layout/LayoutFooter';
import HomeSectionHero from '@/components/section/Hero';
import HomeSectionTableWrapper from '@/components/section/HomeSectionTableWrapper';
import Seo from '@/components/Seo';
import PassengerTable from '@/components/table/PassengerTable';

import {
  DEFAULT_PASSENGER_LIST_RESPONSE,
  getPassengerPaginated,
} from '@/services/Passenger';

import { Page, Passenger, UseQueryPagination } from '@/types/response';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  // const isMounted = useIsMounted(500);
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['passenger', 'infinite'],
    getNextPageParam: (prevData: UseQueryPagination) => {
      // console.log('prevData', prevData);
      return prevData.nextPage;
    },
    queryFn: ({ pageParam = 0 }) => getPassengerPaginated(pageParam, 100),
  });

  const [searchMethod, setSearchMethod] = React.useState<
    'fast' | 'detail' | 'exact'
  >('fast');

  // React.useEffect(() => {
  //   console.log('data', data);
  // }, [data]);

  const passengers = React.useMemo(() => {
    const pass = (
      _.get(data, 'pages', [DEFAULT_PASSENGER_LIST_RESPONSE]) as Page[]
    )
      .flatMap((paginationItem) => paginationItem.passengerResponse)
      .flatMap((response) => response.data);
    // const pass = _.get(data, 'pages', [DEFAULT_PASSENGER_LIST_RESPONSE]);
    // const paginationResponses = [...pass];

    // const passengers: Passenger[] = paginationResponses.flatMap(
    //   (paginationResponse) => paginationResponse.data
    // );
    // console.log('pass', pass);
    return pass;
  }, [data]);

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo
        templateTitle='Welcome Passenger Admin'
        description={`Welcome to our Flight Passenger Dashboard website! As an admin, you
            play a crucial role in ensuring a seamless and efficient experience
            for our valued passengers. With your expertise and dedication, we
            can provide the highest level of service and support to our
            customers. Your contributions will help us enhance our offerings and
            improve the overall travel experience for everyone. We are thrilled
            to have you on board and look forward to working with you to achieve
            our goals. Thank you for joining our team!`}
        date={new Date('05/03/2023').toISOString()}
      />
      <main className='flex h-full w-full flex-col items-center'>
        <section id='hero-section' className='w-full'>
          <HomeSectionHero
            stats={[
              {
                name: 'Passenger Data',
                value: _.get(
                  data,
                  'pages[0].passengerResponse.totalPassengers',
                  0
                ),
              },
            ]}
            links={[{ name: 'Search Passenger', href: '#search-passenger' }]}
          />
        </section>
        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              className={clsxm(
                'layout flex flex-col bg-white py-12',
                inView && 'fade-in-start'
              )}
              id='search-ingredients'
              ref={ref}
            >
              <HomeSectionTableWrapper>
                <div className='container relative mx-auto flex flex-col items-center xl:flex-row xl:flex-wrap'>
                  <div
                    className={clsxm(
                      'relative w-full px-4',
                      inView ? 'fade-in-start' : ''
                    )}
                  >
                    <div
                      className={clsxm(
                        '-z-10',
                        'lg:[40vw] absolute -left-8 -top-8 h-[2px] w-[80vw] md:w-[30vw]',
                        'bg-[linear-gradient(90deg,rgb(56,189,248)_10%,rgb(129,140,248)_30%,rgb(249,115,22)_80%)]',
                        '[mask-image:radial-gradient(80%_80%_at_left,white,transparent)]',
                        inView && 'moveleft-start'
                      )}
                      data-moveleft
                    />
                    <div
                      className={clsxm(
                        '-z-10',
                        'absolute -left-4 -top-12 h-[80vh] w-[2px] md:h-[30vh]',
                        'bg-[linear-gradient(0deg,rgb(249,115,22)_10%,rgb(129,140,248)_30%,rgb(56,189,248)_50%)]',
                        '[mask-image:radial-gradient(80%_90%_at_top,white,transparent)]',
                        inView && 'moveup-start'
                      )}
                      data-moveup
                    />
                  </div>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className='flex flex-col gap-4 lg:flex-row'
                  >
                    <StyledInput type='text' placeholder='Elon Musk' />
                    <ButtonGroup
                      className={clsxm(
                        'flex items-center justify-center rounded-md p-0',
                        'bg-gradient-to-r',
                        searchMethod === 'fast' &&
                          'from-purple-500 to-indigo-500 active:bg-purple-500',
                        searchMethod === 'detail' &&
                          'from-orange-400 to-pink-600 active:bg-orange-400',
                        searchMethod === 'exact' &&
                          'from-green-400 to-cyan-500 active:bg-green-400'
                      )}
                    >
                      <Button
                        className='h-[36px] w-full rounded-r-none border border-gray-200 bg-transparent text-white sm:h-full'
                        type='submit'
                      >
                        Search
                      </Button>
                      <IconButton
                        className='h-[36px] rounded-l-none border border-gray-200 bg-transparent text-white active:bg-transparent sm:h-full'
                        icon={
                          searchMethod === 'fast'
                            ? BsFillLightningChargeFill
                            : searchMethod === 'detail'
                            ? HiMagnifyingGlass
                            : HiOutlineSearchCircle
                        }
                        iconClassName='h-4 w-4'
                        onClick={() =>
                          setSearchMethod((prev) =>
                            prev === 'fast'
                              ? 'detail'
                              : prev === 'detail'
                              ? 'exact'
                              : 'fast'
                          )
                        }
                      />
                    </ButtonGroup>
                  </form>
                  {passengers && passengers.length && (
                    <div className='-mx-4 -my-2 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                      <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden ring-1 ring-black ring-opacity-5 dark:ring-gray-800 md:rounded-lg'>
                          <PassengerTable
                            passengers={passengers as Passenger[]}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {hasNextPage && (
                    <Button
                      onClick={() => fetchNextPage()}
                      className='from-purple-500 to-indigo-500 active:bg-purple-500'
                      rightIcon={BsChevronDoubleRight}
                    >
                      {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                  )}
                </div>
              </HomeSectionTableWrapper>
            </section>
          )}
        </InView>
        <LayoutFooter />
      </main>
    </Layout>
  );
}
