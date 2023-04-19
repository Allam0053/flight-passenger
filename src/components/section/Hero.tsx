import clsxm from '@/lib/clsxm';
import useIsMounted from '@/hooks/useIsMounted';

import ArrowLink from '@/components/links/ArrowLink';

type HeroSectionProps = {
  links: { name: string; href: string }[];
  stats: { name: string; value: string | number }[];
};

export default function HomeSectionHero({ links, stats }: HeroSectionProps) {
  const isMounted = useIsMounted(100);
  return (
    <div
      className={clsxm(
        'min:h-screen relative isolate flex h-full flex-col items-start justify-start overflow-hidden bg-gray-900 py-16 sm:h-screen sm:justify-center',
        isMounted && 'fade-in-start'
      )}
    >
      <div
        className='min:h-screen absolute top-0 -z-10 h-full w-full bg-cover bg-center sm:h-screen'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80')",
        }}
      >
        <span
          id='blackOverlay'
          className='absolute h-full w-full bg-black opacity-80'
        ></span>
      </div>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]'
      >
        <path
          fill='url(#10724532-9d81-43d2-bb94-866e98dd6e42)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='10724532-9d81-43d2-bb94-866e98dd6e42'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox='0 0 1097 845'
        aria-hidden='true'
        className='absolute -top-52 left-1/2 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0'
      >
        <path
          fill='url(#8ddc7edb-8983-4cd7-bccb-79ad21097d70)'
          fillOpacity='.2'
          d='M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z'
        />
        <defs>
          <linearGradient
            id='8ddc7edb-8983-4cd7-bccb-79ad21097d70'
            x1='1097.04'
            x2='-141.165'
            y1='.22'
            y2='363.075'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#776FFF' />
            <stop offset={1} stopColor='#FF4694' />
          </linearGradient>
        </defs>
      </svg>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2
            className='text-4xl font-bold tracking-tight text-white sm:text-6xl'
            data-fade='1'
          >
            Welcome Passengers Admin
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-300' data-fade='2'>
            Welcome to our Flight Passenger Dashboard website! As an admin, you
            play a crucial role in ensuring a seamless and efficient experience
            for our valued passengers. With your expertise and dedication, we
            can provide the highest level of service and support to our
            customers. Your contributions will help us enhance our offerings and
            improve the overall travel experience for everyone. We are thrilled
            to have you on board and look forward to working with you to achieve
            our goals. Thank you for joining our team!
          </p>
        </div>
        <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
          <div
            className='grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'
            data-fade='3'
          >
            {links.map((link) => (
              <ArrowLink key={link.name} href={link.href}>
                {link.name}
              </ArrowLink>
            ))}
          </div>
          <dl className='mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.name}
                className='flex flex-col-reverse'
                data-fade='4'
              >
                <dt className='text-base leading-7 text-gray-300'>
                  {stat.name}
                </dt>
                <dd className='text-2xl font-bold leading-9 tracking-tight text-white'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
