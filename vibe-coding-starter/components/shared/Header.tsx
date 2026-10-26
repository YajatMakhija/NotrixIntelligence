import { LandingHeader, LandingHeaderMenuItem } from '@/components/landing';
import Image from 'next/image';

export const Header = ({ className }: { className?: string }) => {
  return (
    <LandingHeader
      className={className}
      fixed
      withBackground
      variant="primary"
      logoComponent={
        <div className="flex items-center text-primary-500 dark:text-primary-500 gap-3">
          <Image
            src="/static/images/notrix-logo.png"
            alt="Notrix logo"
            width={200}
            height={200}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="font-bold text-lg">Notrix</span>
        </div>
      }
    >
      <LandingHeaderMenuItem href="/notrix">{'Product'}</LandingHeaderMenuItem>
      <LandingHeaderMenuItem href="/notrix#activity">
        {'How it works'}
      </LandingHeaderMenuItem>
      <LandingHeaderMenuItem href="/security">
        {'Security'}
      </LandingHeaderMenuItem>
      <LandingHeaderMenuItem href="/notrix/editor">
        {'Editor'}
      </LandingHeaderMenuItem>
      <LandingHeaderMenuItem href="https://calendly.com/yajatmakhijaofficial/30min">
        Book a demo
      </LandingHeaderMenuItem>
    </LandingHeader>
  );
};

export default Header;
