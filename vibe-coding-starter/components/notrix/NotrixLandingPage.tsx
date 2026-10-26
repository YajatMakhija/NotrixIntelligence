import { NotrixDemoDialog } from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';
import { NotrixHero } from '@/components/notrix/NotrixHero';
import { NotrixHomeSections } from '@/components/notrix/NotrixHomeSections';

export function NotrixLandingPage() {
  return (
    <div className="w-full overflow-x-clip bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
        <NotrixHero />
      </div>
      <NotrixHomeSections />
      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
